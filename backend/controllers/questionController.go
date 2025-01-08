package controllers

import (
	"net/http"

	"github.com/Eric-Cortez/Carra/initializers"
	"github.com/Eric-Cortez/Carra/models"
	"github.com/gin-gonic/gin"
)

func GetAllQuestions(c *gin.Context) {
    var questions []models.Question

    result := initializers.DB.Find(&questions)
    if result.Error != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "error": "Failed to fetch questions",
        })
        return
    }

    var questionList []gin.H
    for _, question := range questions {
        questionList = append(questionList, gin.H{
            "id":      question.ID,
            "title":   question.Title,
            "content": question.Content,
            "userId":  question.UserID,
            "topicId": question.TopicID,
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
            "id":       question.ID,
            "title":    question.Title,
            "content":  question.Content,
            "userId":   question.UserID,
            "topicId":  question.TopicID,
            "createdAt": question.CreatedAt,
        },
    })
}
