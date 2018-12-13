package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/jinzhu/gorm/dialects/sqlite" // If you want to use mysql or any other db, replace this line
)

type Questions struct {
	ID       uint   `json:"id"`
	Name     string `json:"name"`
	Quizname string `json:"quizname"`
	Aoption  string `json:"aoption"`
	Aanswer  bool   `json:"aanswer"`
	Boption  string `json:"boption"`
	Banswer  bool   `json:"banswer"`
	Coption  string `json:"coption"`
	Canswer  bool   `json:"canswer"`
	Doption  string `json:"doption"`
	Danswer  bool   `json:"danswer"`
}

func DeleteQuestion(c *gin.Context) {
	id := c.Params.ByName("id")
	name := c.Params.ByName("name")
	var question Questions
	d := db.Where("id = ? And quizname = ?", id, name).Delete(&question)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func UpdateQuestion(c *gin.Context) {
	var question Questions
	name := c.Params.ByName("name")
	if err := db.Where("name = ?", name).First(&question).Error; err != nil {
		fmt.Println(err)
		c.JSON(401, question)
	}
	c.BindJSON(&question)
	db.Save(&question)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, question)
}

func CreateQuestion(c *gin.Context) {
	var question Questions
	fmt.Println(question)
	c.BindJSON(&question)
	if err := db.Create(&question).Error; err != nil {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(401, question)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, question)
		fmt.Println(question)
	}
}

func GetQuestions(c *gin.Context) {
	name := c.Params.ByName("name")
	var questions []Questions
	if err := db.Where("quizname = ?", name).Find(&questions).Error; err != nil {
		//c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		fmt.Println(questions)
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, questions)
	}
}

func GetAllQuestions(c *gin.Context) {
	var questions []Questions
	if err := db.Find(&questions).Error; err != nil {
		//c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		fmt.Println(questions)
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, questions)
	}
}
