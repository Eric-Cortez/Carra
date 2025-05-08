package controllers

import (
	"net/http"
	"strconv"

	"github.com/Eric-Cortez/Carra/initializers"
	"github.com/Eric-Cortez/Carra/models"
	"github.com/gin-gonic/gin"
)

func GetAllTopics(c *gin.Context) {
	var topics []models.Topic

	result := initializers.DB.Find(&topics)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to fetch topics",
		})
		return
	}

	var topicList []gin.H
	for _, topic := range topics {
		topicList = append(topicList, gin.H{
			"id":        topic.ID,
			"name":      topic.Name,
			"userId":    topic.UserID,
			"createdAt": topic.CreatedAt,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"topics": topicList,
	})
}

func CreateTopic(c *gin.Context) {
	var body struct {
		Name string `json:"name" binding:"required"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse body", "details": err.Error()})
		return
	}

	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	u, ok := user.(models.User)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user object"})
		return
	}

	topic := models.Topic{
		Name:   body.Name,
		UserID: u.ID,
	}

	if err := initializers.DB.Create(&topic).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create topic", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"topic": gin.H{
			"id":        topic.ID,
			"name":      topic.Name,
			"userId":    topic.UserID,
			"createdAt": topic.CreatedAt,
		},
	})
}

func UpdateTopic(c *gin.Context) {
	var body struct {
		ID   uint   `json:"id" binding:"required"`
		Name string `json:"name" binding:"required"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Failed to parse body",
			"details": err.Error(),
		})
		return
	}

	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	u, ok := user.(models.User)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user object"})
		return
	}

	var topic models.Topic
	if err := initializers.DB.First(&topic, body.ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error":   "Topic not found",
			"details": err.Error(),
		})
		return
	}

	if topic.UserID != u.ID {
		c.JSON(http.StatusForbidden, gin.H{"error": "You can't update a topic created by another user"})
		return
	}

	topic.Name = body.Name

	if err := initializers.DB.Save(&topic).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to update topic",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"topic": gin.H{
			"id":        topic.ID,
			"name":      topic.Name,
			"userId":    topic.UserID,
			"updatedAt": topic.UpdatedAt,
		},
	})
}

func DeleteTopic(c *gin.Context) {
	idParam := c.Param("id")

	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid ID parameter",
		})
		return
	}

	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	u, ok := user.(models.User)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user object"})
		return
	}

	var topic models.Topic
	if err := initializers.DB.First(&topic, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error":   "Topic not found",
			"details": err.Error(),
		})
		return
	}

	if topic.UserID != u.ID {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "You can't delete a topic created by another user",
		})
		return
	}

	tx := initializers.DB.Begin()

	if err := tx.Where("topic_id = ?", topic.ID).Delete(&models.Question{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to delete associated questions",
			"details": err.Error(),
		})
		return
	}

	if err := tx.Delete(&topic).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to delete topic",
			"details": err.Error(),
		})
		return
	}

	if err := tx.Commit().Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to commit transaction",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Topic successfully deleted",
		"id":      topic.ID,
	})
}
