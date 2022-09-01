package service

import (
	"context"

	"github.com/RaiNeOnMe/tpaWebb/config"
	"github.com/RaiNeOnMe/tpaWebb/graph/model"
	"github.com/google/uuid"
)

func ActivationLinkCreate(ctx context.Context, input string) (string, error){
	db := config.GetDB()
	link := model.ActivationLink{
		ID:     uuid.NewString(),
		UserID: input,
	}
	err := db.Model(link).Create(&link).Error
	if err != nil {
		return "", err
	}
	return "http://127.0.0.1:5173/activate/" + link.ID, nil
}

func ResetPassLinkCreate(ctx context.Context, email string) (string, error){
	db := config.GetDB()
	user, err := GetUserByEmail(ctx, email)
	if err != nil {
		return "", err
	}
	link := model.ActivationLink{
		ID:     uuid.NewString(),
		UserID: user.ID,
	}
	err = db.Model(link).Create(&link).Error
	if err != nil {
		return "", err
	}
	sendForgetLink(email, "http://127.0.0.1:5173/resetPass/"+link.ID)
	return "http://127.0.0.1:5173/resetPass/"+link.ID, nil
}
