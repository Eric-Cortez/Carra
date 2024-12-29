package main

import (
	"fmt" // this package prints lines

	"net/http"
	"github.com/gin-gonic/gin" // framework similar to express
)

func main() {
	fmt.Println("Server Starting")
	r := gin.Default()

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	r.Run(":8080")
}
