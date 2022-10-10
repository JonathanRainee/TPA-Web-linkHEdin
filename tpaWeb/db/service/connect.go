package service

import (
	"context"

	"github.com/RaiNeOnMe/tpaWebb/graph/model"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func User1(db *gorm.DB, ctx context.Context, obj *model.Connection) (*model.User, error){
	user, err := GetUserById(ctx, obj.User1ID)

	if err != nil {
		return nil, err
	}

	return user, nil
}

func User2 (db *gorm.DB, ctx context.Context, obj *model.Connection) (*model.User, error){
	user, err := GetUserById(ctx, obj.User2ID)

	if err != nil {
		return nil, err
	}
	return user, nil
}

func FromUser(db *gorm.DB, ctx context.Context, obj *model.ConnectRequest) (*model.User, error) {
	user, err := GetUserById(ctx, obj.FromUserID)

	if err != nil {
		return nil, err
	}

	return user, nil
}

func ToUser(db *gorm.DB, ctx context.Context, obj *model.ConnectRequest) (*model.User, error) {
	user, err := GetUserById(ctx, obj.ToUserID)

	if err != nil {
		return nil, err
	}
	return user, nil
}

func AddConnection(db *gorm.DB, ctx context.Context, user1id string, user2id string) (*model.Connection, error) {
	connect := &model.Connection{
		ID:      uuid.NewString(),
		User1ID: user1id,
		User2ID: user2id,
	}
	return connect, db.Create(connect).Error
}

func AddConnectReq(db *gorm.DB, ctx context.Context, fromUserID string, toUserID string, message string) (*model.ConnectRequest, error) {
	connectReq := &model.ConnectRequest{
		ID:         uuid.NewString(),
		FromUserID: fromUserID,
		ToUserID:   toUserID,
		Message:    message,
	}
	return connectReq, db.Create(connectReq).Error
}

func DeleteConenctReq(db *gorm.DB, ctx context.Context, fromUserID string, toUserID string) (*model.ConnectRequest, error) {
	connecReq := new(model.ConnectRequest)

	if err := db.Find(&connecReq, "from_user_id = ? AND to_user_id = ?", fromUserID, toUserID).Error; err != nil {
		return nil, err
	}
	return connecReq, db.Delete(connecReq).Error
}