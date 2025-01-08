package models

import "gorm.io/gorm"

type Question struct {
	gorm.Model
	Title   string `gorm:"not null"`
	Content string `gorm:"not null"`
	UserID  uint   `gorm:"not null"`
	TopicID uint   `gorm:"not null"`
	User    User   `gorm:"foreignKey:UserID;references:ID"`
	Topic   Topic  `gorm:"foreignKey:TopicID;references:ID"`
}
