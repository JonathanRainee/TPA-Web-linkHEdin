package model

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
	Block             []*User        `json:"Block" gorm:"many2many:user_blocks"`
	Visits            []*User              `json:"Visit" gorm:"many2many:user_visits"`
	Follows           []*User              `json:"Follow" gorm:"many2many:user_follows"`
	Comment           []*Comment           `json:"Comment" gorm:"foreignKey:CommenterID;"`
	LikeComment       []*LikeComment       `json:"LikeComment" gorm:"foreignKey:UserID"`
	Connection        []*Connection        `json:"Connection" gorm:"foreignKey:User1ID;foreignKey:User2ID"`
	ConnectRequest    []*ConnectRequest    `json:"ConnectRequest" gorm:"foreignKey:FromUserID;foreignKey:ToUserID"`
	Notification      []*Notification      `json:"Notification" gorm:"foreignKey:FromUserID;foreignKey:ToUserID"`
}

type Follow struct {
	UserID   string `json:"userId"`
	FollowID string `json:"followId"`
}

type Connection struct {
	ID      string `json:"id"`
	User1   *User  `json:"user1"`
	User1ID string `json:"user1Id"`
	User2   *User  `json:"user2"`
	User2ID string `json:"user2Id"`
}

type Visit struct {
	UserID  string `json:"userId"`
	VisitID string `json:"visitId"`
}

type ConnectRequest struct {
	ID         string `json:"id"`
	FromUserID string `json:"fromUserId"`
	FromUser   *User  `json:"fromUser"`
	ToUser     *User  `json:"toUser"`
	ToUserID   string `json:"toUserId"`
	Message    string `json:"message"`
}