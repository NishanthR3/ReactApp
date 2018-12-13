package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/jinzhu/gorm/dialects/sqlite" // If you want to use mysql or any other db, replace this line
)

type Quiz struct {
	ID    uint   `json:"id"`
	Name  string `json:"name"`
	Genre string `json:"genre"`
}

func DeleteQuiz(c *gin.Context) {
	id := c.Params.ByName("id")
	var quiz Quiz
	var userquizes UserQuizes
	var question Questions
	db.Where("id = ?", id).First(&quiz)
	name := quiz.Name
	fmt.Println(name)
	d := db.Where("id = ?", id).Delete(&quiz)
	db.Where("quiz_name = ?", name).Delete(&userquizes)
	db.Where("quizname = ?", name).Delete(&question)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func CreateQuiz(c *gin.Context) {
	var quiz Quiz
	c.BindJSON(&quiz)
	if err := db.Create(&quiz).Error; err != nil {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(401, quiz)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, quiz)
	}

}

func GetQuizes(c *gin.Context) {
	var quizes []Quiz
	if err := db.Order("name").Find(&quizes).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, quizes)
	}
}

func GetGenre(c *gin.Context) {
	var quizes []Quiz
	if err := db.Select("distinct(genre)").Find(&quizes).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, quizes)
	}
}
