package models

import "gorm.io/gorm"

type Vote struct {
	gorm.Model
	UserID     uint     `gorm:"not null;index"`
	QuestionID uint     `gorm:"not null;index"`
	User       User     `gorm:"foreignKey:UserID;references:ID"`
	Question   Question `gorm:"foreignKey:QuestionID;references:ID"`
}
