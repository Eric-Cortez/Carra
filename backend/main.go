package main

import (
	"github.com/Eric-Cortez/Carra/controllers"
	"github.com/Eric-Cortez/Carra/initializers"
	"github.com/Eric-Cortez/Carra/middleware"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
	initializers.SyncDatabase()
}

func main() {
	corsConfig := cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: true,
	}
	r := gin.Default()

	r.Use(cors.New(corsConfig))

	r.POST("/signup", controllers.Signup)
	r.POST("/login", controllers.Login)
	r.POST("/logout", controllers.Logout)
	r.GET("/users/:userId", middleware.RequireAuth, controllers.GetUserById)
	r.GET("/users", middleware.RequireAuth, controllers.GetAllUsers)
	r.GET("/topics", middleware.RequireAuth, controllers.GetAllTopics)
	r.GET("/questions", middleware.RequireAuth, controllers.GetAllQuestions)
	r.POST("/topics/create", middleware.RequireAuth, controllers.CreateTopic)
	r.POST("/questions/create", middleware.RequireAuth, controllers.CreateQuestion)

	r.Run() // automatically looks for "PORT" env variable
}
