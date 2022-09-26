package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/RaiNeOnMe/tpaWebb/graph/generated"
	"github.com/RaiNeOnMe/tpaWebb/graph/model"
	"github.com/RaiNeOnMe/tpaWebb/service"
)

// AddNotification is the resolver for the addNotification field.
func (r *mutationResolver) AddNotification(ctx context.Context, toUserID string, fromUserID string, message string) (*model.Notification, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.AddNotification(r.DB, ctx, toUserID, fromUserID, message)
}

// FromUser is the resolver for the fromUser field.
func (r *notificationResolver) FromUser(ctx context.Context, obj *model.Notification) (*model.User, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.GetUserFromNotif(r.DB, ctx, obj)
}

// ToUser is the resolver for the toUser field.
func (r *notificationResolver) ToUser(ctx context.Context, obj *model.Notification) (*model.User, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.GetToUserNotification(r.DB, ctx, obj)
}

// UserNotification is the resolver for the userNotification field.
func (r *queryResolver) UserNotification(ctx context.Context, toUserID string) ([]*model.Notification, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.GetUserNotif(r.DB, ctx, toUserID)
}

// Notification returns generated.NotificationResolver implementation.
func (r *Resolver) Notification() generated.NotificationResolver { return &notificationResolver{r} }

type notificationResolver struct{ *Resolver }
