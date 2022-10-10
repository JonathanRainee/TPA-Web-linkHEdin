package service

import (
	"context"

	"github.com/RaiNeOnMe/tpaWebb/config"
	"github.com/RaiNeOnMe/tpaWebb/graph/model"
	"github.com/RaiNeOnMe/tpaWebb/tools"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func UserCreate(ctx context.Context, input model.NewUser) (*model.User, error) {
	db := config.GetDB()

	input.Password = tools.HashPassword(input.Password)

	user := model.User{
		ID:                uuid.NewString(),
		Name:              input.Name,
		Email:             input.Email,
		Password:          input.Password,
		Verified:          false,
		ProfilePicture:    "",
		Backgroundpicture: "",
	}

	err := db.Model(user).Create(&user).Error

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func GetUserByEmail(ctx context.Context, email string) (*model.User, error) {
	db := config.GetDB()
	var user model.User
	err := db.Model(user).Where("email LIKE ?", email).Take(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func GetUserById(ctx context.Context, id string) (*model.User, error) {
	db := config.GetDB()
	var user model.User
	err := db.Model(user).Where("id LIKE ?", id).Take(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func UploadProfilePicture(ctx context.Context, id string, newProfilePicture string) (string, error) {
	db := config.GetDB()
	user, err := GetUserById(ctx, id)
	if err != nil {
		return "", err
	}
	user.ProfilePicture = (newProfilePicture)
	db.Save(&user)
	return "Profile Picture Updated successfuly", nil
}

func UploadBgPicture(ctx context.Context, id string, newBanner string) (string, error) {
	db := config.GetDB()
	user, err := GetUserById(ctx, id)
	if err != nil {
		return "", err
	}
	user.Backgroundpicture = (newBanner)
	db.Save(&user)
	return "Background picture Updated successfuly", nil
}

func UpdateUsername(ctx context.Context, id string, newUsername string) (string, error){
	user, err := GetUserById(ctx, id)
	db := config.GetDB()

	if err != nil {
		return "Update Failed", err
	}

	user.Name = newUsername
	db.Save(&user)
	return "User Updated Sucessfully", nil
}

func FollowUser(db *gorm.DB, ctx context.Context, id1 string, id2 string) (interface{}, error) {
	follow := new(model.Follow)

	follow.UserID = id1
	follow.FollowID = id2
	db.Table("user_follows").Create(follow)

	var follows []*model.Follow
	db.Table("user_follows").Find(&follows, "follow_id = ?", id2)

	return map[string]interface{}{
		"length": len(follows),
	}, nil

}

func UnfollowUser(db *gorm.DB, ctx context.Context, id1 string, id2 string) (interface{}, error) {
	follow := new(model.Follow)

	if err := db.Table("user_follows").First(&follow, "user_id = ? AND follow_id = ?", id1, id2).Error; err != nil {
		return nil, err
	}
	if follow.UserID == "" {
		var modelFollows []*model.Follow
		db.Table("user_follows").Find(&modelFollows, "follow_id = ?", id2)
		return map[string]interface{}{
			"length": len(modelFollows),
		}, nil
	}else{
		db.Table("user_follows").Delete(&follow, "user_id = ? AND follow_id = ?", id1, id2)
		var modelFollows []*model.Follow
		db.Table("user_follows").Find(&modelFollows, "follow_id = ?", id2)
		return map[string]interface{}{
			"length": len(modelFollows),
		}, nil
	}
}

func GetConnections(db *gorm.DB, ctx context.Context, obj *model.User) ([]*model.Connection, error) {
	var connections []*model.Connection

	if err := db.Where("user1_id = ?", obj.ID).Or("user2_id = ?", obj.ID).Find(&connections).Error; err != nil {
		return nil, err
	}

	return connections, nil
}

func GetConnectRequests(db *gorm.DB, ctx context.Context, obj *model.User) ([]*model.ConnectRequest, error) {
	var ConnectionReq []*model.ConnectRequest

	if err := db.Find(&ConnectionReq, "to_user_id = ?", obj.ID).Error; err != nil {
		return nil, err
	}

	return ConnectionReq, nil
}

func GetBlocks(db *gorm.DB, ctx context.Context, obj *model.User) ([]*model.Block, error) {
	var blocks []*model.Block

	if err := db.Table("user_blocks").Find(&blocks, "user_id = ?", obj.ID).Error; err != nil {
		return nil, err
	}

	return blocks, nil
}

func GetFollows(db *gorm.DB, ctx context.Context, obj *model.User) ([]*model.Follow, error) {
	var modelFollow []*model.Follow

	return modelFollow, db.Table("user_follows").Find(&modelFollow, "user_id = ? ", obj.ID).Error
}

func GetVisit(db *gorm.DB, ctx context.Context, obj *model.User) ([]*model.Visit, error) {
	var visits []*model.Visit
	return visits, db.Table("user_visits").Find(&visits, "visit_id = ?", obj.ID).Error
}

func VisisUser(db *gorm.DB, ctx context.Context, id1 string, id2 string) (interface{}, error) {
	visit := new(model.Visit)
	db.Table("user_visits").First(&visit, "user_id = ? AND visit_id = ?", id1, id2)

	if visit.UserID != "" {
		var modelVisits []*model.Visit
		db.Table("user_visits").Find(&modelVisits, "visit_id = ?", id2)

		return map[string]interface{}{
			"length": len(modelVisits),
		}, nil
	} else {

		visit.UserID = id1
		visit.VisitID = id2

		if err := db.Table("user_visits").Create(visit).Error; err == nil {
			AddNotification(db, ctx, id2, id1, "Visit Your Profile")
		}

		var modelVisits []*model.Visit
		db.Table("user_visits").Find(&modelVisits, "visit_id = ?", id2)

		return map[string]interface{}{
			"length": len(modelVisits),
		}, nil
	}
}