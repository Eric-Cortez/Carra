package controllers

import (
	"net/http"

	"github.com/Eric-Cortez/Carra/initializers"
	"github.com/Eric-Cortez/Carra/models"
	"github.com/gin-gonic/gin"
)

func CreateTopic(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}
	u := user.(models.User)
	var body struct {
		Name   string
		UserId uint
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to parse body",
		})
		return
	}

	topic := models.Topic{Name: body.Name, UserID: u.ID}
	result := initializers.DB.Create(&topic)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to create topic",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"success": "Topic Created",
	})

}
