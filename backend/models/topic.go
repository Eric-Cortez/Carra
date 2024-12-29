package models

import "gorm.io/gorm"

type Topic struct {
	gorm.Model
	Name    string `gorm:"not null"`
	UserID  uint   `gorm:"not null"`
	User    User   `gorm:"foreignKey:UserID;references:ID"`
}
