package main

import (
	"fmt"
	"net/http"

	"github.com/Eric-Cortez/Carra/controllers"
	"github.com/Eric-Cortez/Carra/initializers"
	"github.com/Eric-Cortez/Carra/middleware"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
	initializers.SyncDatabase()
}

func main() {
	fmt.Println("Server Starting")

	r := gin.Default()

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	r.POST("/signup", controllers.Signup)
	r.POST("/login", controllers.Login)
	r.GET("/validate", middleware.RequireAuth, controllers.Validate)


	r.Run() // automatically looks for "PORT" env variable
}
