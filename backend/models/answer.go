package models

import "gorm.io/gorm"

type Answer struct {
	gorm.Model
	Content    string   `gorm:"not null"`
	UserID     uint     `gorm:"not null"`
	QuestionID uint     `gorm:"not null"`
	User       User     `gorm:"foreignKey:UserID;references:ID"`
	Question   Question `gorm:"foreignKey:QuestionID;references:ID"`
}
