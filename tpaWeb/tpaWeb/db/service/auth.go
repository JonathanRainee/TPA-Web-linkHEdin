package service

import (
	"context"
	"fmt"
	// "fmt"

	"github.com/RaiNeOnMe/tpaWebb/config"
	"github.com/RaiNeOnMe/tpaWebb/graph/model"
	"github.com/RaiNeOnMe/tpaWebb/middleware"
	"github.com/RaiNeOnMe/tpaWebb/tools"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"gorm.io/gorm"
)

func RegisterUser(ctx context.Context, input model.NewUser) (interface{}, error) {
	_, err := GetUserByEmail(ctx, input.Email)
	if err == nil {
		if err != gorm.ErrRecordNotFound {
			return nil, err
		}
	}

	createdUser, err := UserCreate(ctx, input)
	if err != nil {
		return nil, err
	}
	token, err := middleware.JwtGenerate(ctx, createdUser.ID)

	link, err := ActivationLinkCreate(ctx, createdUser.ID)

	if err != nil {
		return nil, err
	}

	sendActivationMail(createdUser.Email, link)

	return map[string]interface{}{
		"token": token,
	}, nil
}

func UserLogin(ctx context.Context, email string, password string) (interface{}, error) {
	getUser, err := GetUserByEmail(ctx, email)

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, &gqlerror.Error{
				Message: "Email  Not Found",
			}
		}
		return nil, err
	}

	if !getUser.Verified{
		return nil, nil
	}

	if err := tools.ComparePassword(getUser.Password, password); err != nil {
		return nil, err
	}
	token, err := middleware.JwtGenerate(ctx, getUser.ID)
	if err != nil {
		return nil, err
	}
	if token == "" {
		fmt.Printf("gad")
	}else{
		fmt.Printf(token)
	}
	return map[string]interface{}{
		"token": token,
		"user": getUser.ID,
	}, nil
}

func ResetPass(ctx context.Context, id string, newPass string) (string, error){
	user, err := GetUserById(ctx, id)
	db := config.GetDB()
	if err != nil {
		return "", err
	}
	user.Password = tools.HashPassword(newPass)
	db.Save(&user)
	return "Password reset successful", nil
}

func LoginWOPass(ctx context.Context, email string)(interface{}, error){
	getUser, err := GetUserByEmail(ctx, email)

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, &gqlerror.Error{
				Message: "We couldn't find the email",
			}
		}
		return nil, err
	}

	if !getUser.Verified {
		return nil, nil
	}

	token, err := middleware.JwtGenerate(ctx, getUser.ID)

	if err != nil {
		return nil, err
	}

	return map[string]interface{}{
		"token": token,
		"user": getUser,
	}, nil
}