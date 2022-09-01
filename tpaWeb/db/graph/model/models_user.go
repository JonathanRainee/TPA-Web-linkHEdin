package model

import "github.com/lib/pq"

// type User struct {
// 	ID                string			`json:"id"`
// 	Name              string			`json:"name"`
// 	Email             string			`json:"email"`
// 	Password          string			`json:"password"`
// 	Verified          bool  			`json:"verified"`
// 	ProfilePicture    string			`json:"profile_picture"`
// 	Backgroundpicture string			`json:"background_photo"`
// 	FollowedUser      pq.StringArray 	`json:"followed_user" gorm:"type:text[]"`
// 	ConnectReq		  pq.StringArray	`json:"connect_req" gorm:"type:text[]"`
// 	ConnectedUser	  pq.StringArray	`json:"connected_user" gorm:"type:text[]"`
// }

type User struct {
	ID                string   `json:"id"`
	Name              string   `json:"name"`
	Email             string   `json:"email"`
	Password          string   `json:"password"`
	Verified          bool     `json:"verified"`
	ProfilePicture    string   `json:"ProfilePicture"`
	Backgroundpicture string   `json:"Backgroundpicture"`
	FollowedUser      pq.StringArray `json:"followed_user" gorm:"type:text[]"`
	ConnectedUser     pq.StringArray `json:"connected_user" gorm:"type:text[]"`
	ConnectRequest    pq.StringArray `json:"connect_request" gorm:"type:text[]"`
}