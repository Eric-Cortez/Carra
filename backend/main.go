package main

import (
	"github.com/Eric-Cortez/Carra/controllers"
	"github.com/Eric-Cortez/Carra/initializers"
	"github.com/Eric-Cortez/Carra/middleware"
	websocket "github.com/Eric-Cortez/Carra/websockets"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
	initializers.SyncDatabase()
	initializers.SeedDatabase()
}

func main() {
	corsConfig := cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: true,
	}
	r := gin.Default()
	wsHandler := websocket.NewWebSocketHandler()
	r.Use(cors.New(corsConfig))
	r.Use(static.Serve("/", static.LocalFile("../frontend/dist", true)))

	r.NoRoute(func(c *gin.Context) {
		c.File("../frontend/dist/index.html")
	})

	r.POST("/signup", controllers.Signup)
	r.POST("/login", controllers.Login)
	r.POST("/logout", controllers.Logout)
	r.GET("/users", middleware.RequireAuth, controllers.GetAllUsers)
	r.GET("/users/:userId", middleware.RequireAuth, controllers.GetUserById)
	r.GET("/topics", middleware.RequireAuth, controllers.GetAllTopics)
	r.POST("/topics/create", middleware.RequireAuth, controllers.CreateTopic)
	r.PUT("/topics/update", middleware.RequireAuth, controllers.UpdateTopic)
	r.DELETE("/topics/delete/:id", middleware.RequireAuth, controllers.DeleteQuestion)
	r.GET("/questions", middleware.RequireAuth, controllers.GetAllQuestions)
	r.POST("/questions/create", middleware.RequireAuth, controllers.CreateQuestion)
	r.PUT("/questions/update", middleware.RequireAuth, controllers.UpdateQuestion)
	r.DELETE("/questions/delete/:id", middleware.RequireAuth, controllers.DeleteQuestion)
	r.GET("/ws", middleware.RequireAuth, func(c *gin.Context) { wsHandler.HandleConnection(c.Writer, c.Request) })
	r.Run()
}
