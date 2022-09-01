package service

import(
	"context"

	"github.com/google/uuid"
	"github.com/RaiNeOnMe/tpaWebb/config"
	"github.com/RaiNeOnMe/tpaWebb/graph/model"
	"github.com/RaiNeOnMe/tpaWebb/tools"
)

func UserCreate(ctx context.Context, input model.NewUser) (*model.User, error) {
	db := config.GetDB()

	input.Password = tools.HashPassword(input.Password)
	var emptyStringArr = []string{}

	user := model.User{
		ID:                uuid.NewString(),
		Name:              input.Name,
		Email:             input.Email,
		Password:          input.Password,
		Verified:          false,
		ProfilePicture:    "",
		Backgroundpicture: "",
		FollowedUser:      emptyStringArr,
		ConnectRequest:    emptyStringArr,
		ConnectedUser:     emptyStringArr,
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
	return "Profile Picture Update successful", nil
}
