package main

import (
	"fmt"
	"github.com/gin-contrib/cors" // Why do we need this package?
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite" // If you want to use mysql or any other db, replace this line
)

var db *gorm.DB // declaring the db globally
var err error

func main() {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	db.AutoMigrate(&User{})
	db.AutoMigrate(&Quiz{})
	db.AutoMigrate(&UserQuizes{})
	db.AutoMigrate(&Questions{})
	db.Model(&User{}).AddUniqueIndex("idx_user_name", "name")
	db.Model(&Quiz{}).AddUniqueIndex("idx_quiz_name", "name")
	db.Model(&Questions{}).AddUniqueIndex("idx_question_name", "name")
	//db.Model(&UserQuizes{}).AddUniqueIndex("idx_userquiz_name", "username", "quizname")
	r := gin.Default()
	r.GET("/users/", GetUsers)                 // Creating routes for each functionality
	r.GET("/userquizes/:name", GetUserQuizes)  // Creating routes for each functionality
	r.GET("/userquizes/", GetUserLeaderboard)  // Creating routes for each functionality
	r.GET("/genre/:name", GetGenreLeaderboard) // Creating routes for each functionality
	r.GET("/user/:name", UserAuth)
	r.POST("/users", CreateUser)
	r.POST("/userquizes", AddUserQuiz)
	r.DELETE("/users/:id", DeleteUser)
	r.GET("/quizes/", GetQuizes) // Creating routes for each functionality
	r.GET("/genre/", GetGenre)   // Creating routes for each functionality
	r.POST("/quizes", CreateQuiz)
	r.DELETE("/quizes/:id", DeleteQuiz)
	r.PUT("/score/:quizname/:name", UpdateScore)
	r.POST("/question", CreateQuestion)
	r.PUT("/question/:name", UpdateQuestion)
	r.GET("/questions/:name", GetQuestions)
	r.GET("/questionsall/", GetAllQuestions)
	r.DELETE("/questions/:id/:name", DeleteQuestion)
	r.Use((cors.Default()))
	r.Run(":8080") // Run on port 8080
}
