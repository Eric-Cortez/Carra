package controllers

import (
	"net/http"
	"os"
	"time"
	"fmt"

	"github.com/Eric-Cortez/Carra/initializers"
	"github.com/Eric-Cortez/Carra/models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func Signup(c *gin.Context) {

	var body struct {
		Username string
		Email    string
		Password string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to parse body",
		})
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to hash password",
		})
		return
	}

	user := models.User{Username: body.Username, Email: body.Email, HashedPassword: string(hash)}
	result := initializers.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to create user",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"success": "User Created",
	})
}

func Login(c *gin.Context) {
	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request body",
		})
		return
	}

	var user models.User
	if result := initializers.DB.First(&user, "email = ?", body.Email); result.Error != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid email or password",
		})
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.HashedPassword), []byte(body.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid email or password",
		})
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 8).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create token",
		})
		return
	}

	c.SetCookie("token", tokenString, 3600*8, "/", "", true, true)

	c.JSON(http.StatusOK, gin.H{
		"user": gin.H{
			"id":        user.ID,
			"username":  user.Username,
			"email":     user.Email,
			"createdAt": user.CreatedAt,
		},
	})
}

func GetAllUsers(c *gin.Context) {
	var users []models.User

	result := initializers.DB.Select("id, created_at, username, email").Find(&users)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to fetch users",
		})
		return
	}

	var userList []gin.H
	for _, user := range users {
		userList = append(userList, gin.H{
			"id":        user.ID,
			"username":  user.Username,
			"email":     user.Email,
			"createdAt": user.CreatedAt,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"users": userList,
	})
}

func GetUserById(c *gin.Context) {
	userId := c.Param("userId")
	fmt.Printf("Looking for questions for user ID: %s\n", userId)

	var user models.User
	result := initializers.DB.Select("id, created_at, username, email").First(&user, "id = ?", userId)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "User not found",
		})
		return
	}

	var questions []models.Question
	questionsResult := initializers.DB.Debug(). // Added Debug() to see the SQL query
		Select("id, title, content, created_at, user_id").  // Added user_id to verify it's being selected
		Where("user_id = ?", userId).
		Find(&questions)

	fmt.Printf("Number of questions found: %d\n", len(questions))
	fmt.Printf("Query error if any: %v\n", questionsResult.Error)

	if questionsResult.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Error fetching questions",
		})
		return
	}

	questionsList := make([]gin.H, len(questions))
	for i, question := range questions {
		fmt.Printf("Question %d: ID=%v, UserID=%v\n", i, question.ID, question.UserID)
		questionsList[i] = gin.H{
			"id":        question.ID,
			"title":     question.Title,
			"content":   question.Content,
			"createdAt": question.CreatedAt,
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"user": gin.H{
			"id":        user.ID,
			"username":  user.Username,
			"email":     user.Email,
			"createdAt": user.CreatedAt,
			"questions": questionsList,
		},
	})
}

func Logout(c *gin.Context) {
	c.SetCookie("token", "", -1, "/", "", true, true)
	c.JSON(http.StatusOK, gin.H{"message": "Logged out successfully"})
}
