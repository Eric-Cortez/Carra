package controllers

import (
	"net/http"

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
			"id":     topic.ID,
			"name":   topic.Name,
			"userId": topic.UserID,
			"createdAt": topic.CreatedAt,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"topics": topicList,
	})
}

func CreateTopic(c *gin.Context) {
	var body struct {
		Name   string `json:"name" binding:"required"`
		UserID uint   `json:"userId" binding:"required"`
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

	if body.UserID != u.ID {
		c.JSON(http.StatusForbidden, gin.H{"error": "Unable to create topic for another user"})
		return
	}

	topic := models.Topic{
		Name:   body.Name,
		UserID: body.UserID,
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
