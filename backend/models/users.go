package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username       string `gorm:"not null"`
	Email          string `gorm:"not null;uniqueIndex"`
	HashedPassword string
}
