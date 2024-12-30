package initializers

import "github.com/Eric-Cortez/Carra/models"

func SyncDatabase() {
	DB.AutoMigrate(&models.User{})
	DB.AutoMigrate(&models.Question{})
	DB.AutoMigrate(&models.Answer{})
	DB.AutoMigrate(&models.Comment{})
	DB.AutoMigrate(&models.Topic{})
	DB.AutoMigrate(&models.Vote{})
}