package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/jinzhu/gorm/dialects/sqlite" // If you want to use mysql or any other db, replace this line
)

type User struct {
	ID       uint   `json:"id"`
	Name     string `json:"name"`
	Password string `json:"password"`
	Admin    bool   `json:"admin"`
}

type UserQuizes struct {
	ID       uint   `json:"id"`
	Username string `json:"username"`
	QuizName string `json:"quizname"`
	Genre    string `json:"genre"`
	Score    int    `json:"score"`
}

func UpdateScore(c *gin.Context) {
	var userquizes UserQuizes
	name := c.Params.ByName("name")
	quizname := c.Params.ByName("quizname")
	if err := db.Where("quiz_name = ? And username = ?", quizname, name).First(&userquizes).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
	c.BindJSON(&userquizes)
	db.Save(&userquizes)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, userquizes)
}

func DeleteUser(c *gin.Context) {
	id := c.Params.ByName("id")
	var user User
	var userquizes UserQuizes
	db.Where("id = ?", id).First(&user)
	name := user.Name
	d := db.Where("id = ?", id).Delete(&user)
	db.Where("username = ?", name).Delete(&userquizes)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func CreateUser(c *gin.Context) {
	var user User
	c.BindJSON(&user)
	if err := db.Create(&user).Error; err != nil {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(401, user)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, user)
	}
}

func GetUsers(c *gin.Context) {
	var users []User
	if err := db.Find(&users).Error; err != nil {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(401, users)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, users)
	}
}

func UserAuth(c *gin.Context) {
	name := c.Params.ByName("name")
	var user User
	if err := db.Where("name = ?", name).First(&user).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, user)
	}
}

func AddUserQuiz(c *gin.Context) {
	var userquizes UserQuizes
	var userquizescheck []UserQuizes
	c.BindJSON(&userquizes)
	fmt.Println(userquizes)
	db.Where("username = ? And quiz_name = ?", userquizes.Username, userquizes.QuizName).Find(&userquizescheck)
	if len(userquizescheck) > 0 {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(401, userquizescheck)
	} else {
		db.Create(&userquizes)
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, userquizes)
	}
	/*if db.Create(&userquizes).Error != nil {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(401, userquizes)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, userquizes)
	}*/
}

func GetUserQuizes(c *gin.Context) {
	//var name string
	//c.BindJSON(&name)
	name := c.Params.ByName("name")
	var userquizes []UserQuizes
	if err := db.Where("username = ?", name).Find(&userquizes).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, userquizes)
	}
}

func GetUserLeaderboard(c *gin.Context) {
	var userquizes []UserQuizes
	if err := db.Order("score desc").Find(&userquizes).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, userquizes)
	}
}

func GetGenreLeaderboard(c *gin.Context) {
	name := c.Params.ByName("name")
	var userquizes []UserQuizes
	if err := db.Order("score desc").Where("genre = ?", name).Find(&userquizes).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, userquizes)
	}
}
