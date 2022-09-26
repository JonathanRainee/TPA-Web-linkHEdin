package service

import (
	"context"

	"github.com/RaiNeOnMe/tpaWebb/graph/model"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func AddNotification(db *gorm.DB, ctx context.Context, toUserID string, fromUserID string, message string) (*model.Notification, error) {
	notif := &model.Notification{
		ID:         uuid.NewString(),
		FromUserID: fromUserID,
		ToUserID:   toUserID,
		Message:    message,
	}

	return notif, db.Create(notif).Error
}

func GetUserFromNotif(db *gorm.DB, ctx context.Context, obj *model.Notification) (*model.User, error) {
	return GetUserById(ctx, obj.FromUserID)
}

func GetToUserNotification(db *gorm.DB, ctx context.Context, obj *model.Notification) (*model.User, error) {
	return GetUserById(ctx, obj.ToUserID)
}

func GetUserNotif(db *gorm.DB, ctx context.Context, toUserID string) ([]*model.Notification, error) {
	var notif []*model.Notification

	if err := db.Find(&notif, "to_user_id = ?", toUserID).Error; err != nil {
		return nil, err
	}

	return notif, nil
}