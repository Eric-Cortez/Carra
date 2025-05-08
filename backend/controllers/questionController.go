package controllers

import (
	"log"
	"net/http"
	"strconv"

	"github.com/Eric-Cortez/Carra/initializers"
	"github.com/Eric-Cortez/Carra/models"
	"github.com/gin-gonic/gin"
)

func GetAllQuestions(c *gin.Context) {
	var questions []models.Question

	result := initializers.DB.Order("created_at desc").Find(&questions)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to fetch questions",
		})
		return
	}

	var questionList []gin.H
	for _, question := range questions {
		questionList = append(questionList, gin.H{
			"id":        question.ID,
			"title":     question.Title,
			"content":   question.Content,
			"userId":    question.UserID,
			"topicId":   question.TopicID,
			"createdAt": question.CreatedAt,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"questions": questionList,
	})
}

func CreateQuestion(c *gin.Context) {
	var body struct {
		Title   string `json:"title" binding:"required"`
		Content string `json:"content" binding:"required"`
		UserID  uint   `json:"userId" binding:"required"`
		TopicID uint   `json:"topicId" binding:"required"`
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

	if body.UserID != u.ID {
		c.JSON(http.StatusForbidden, gin.H{"error": "Unable to create question for another user"})
		return
	}
	question := models.Question{
		Title:   body.Title,
		Content: body.Content,
		UserID:  body.UserID,
		TopicID: body.TopicID,
	}
	if err := initializers.DB.Create(&question).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to create question",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"question": gin.H{
			"id":        question.ID,
			"title":     question.Title,
			"content":   question.Content,
			"userId":    question.UserID,
			"topicId":   question.TopicID,
			"createdAt": question.CreatedAt,
		},
	})
}


func UpdateQuestion(c *gin.Context) {
	var body struct {
		ID      uint   `json:"id" binding:"required"`
		Title   string `json:"title" binding:"required"`
		Content string `json:"content" binding:"required"`
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

	var question models.Question
	if err := initializers.DB.First(&question, body.ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error":   "Question not found",
			"details": err.Error(),
		})
		return
	}

	log.Printf("Updating question with ID: %v (type: %T)", question.UserID, question.UserID)
	log.Printf("Current user ID: %v (type: %T)", u.ID, u.ID)



	if question.UserID != u.ID {
		c.JSON(http.StatusForbidden, gin.H{"error": "You can't update a question another user has asked"})
		return
	}

	question.Title = body.Title
	question.Content = body.Content

	if err := initializers.DB.Save(&question).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to update question",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"question": gin.H{
			"id":        question.ID,
			"title":     question.Title,
			"content":   question.Content,
			"userId":    question.UserID,
			"topicId":   question.TopicID,
			"updatedAt": question.UpdatedAt,
		},
	})
}

func DeleteQuestion(c *gin.Context) {
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

	var question models.Question
	if err := initializers.DB.First(&question, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error":   "Question not found",
			"details": err.Error(),
		})
		return
	}

	if question.UserID != u.ID {
		c.JSON(http.StatusForbidden, gin.H{
			"error": "You can't delete a question another user has asked",
		})
		return
	}

	tx := initializers.DB.Begin()

	if err := tx.Where("question_id = ?", question.ID).Delete(&models.Answer{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to delete associated answers",
			"details": err.Error(),
		})
		return
	}

	if err := tx.Delete(&question).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to delete question",
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
		"message": "Question successfully deleted",
		"id":      question.ID,
	})
}
