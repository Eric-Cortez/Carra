package models

import "gorm.io/gorm"

type Comment struct {
	gorm.Model
	Content   string `gorm:"not null"`
	UserID    uint   `gorm:"not null"`
	AnswerID  uint   `gorm:"not null"`
	User      User   `gorm:"foreignKey:UserID;references:ID"`
	Answer    Answer `gorm:"foreignKey:AnswerID;references:ID"`
}
