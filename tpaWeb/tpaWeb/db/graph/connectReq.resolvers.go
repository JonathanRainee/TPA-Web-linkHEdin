package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/RaiNeOnMe/tpaWebb/graph/generated"
	"github.com/RaiNeOnMe/tpaWebb/graph/model"
	"github.com/RaiNeOnMe/tpaWebb/service"
)

// FromUser is the resolver for the fromUser field.
func (r *connectRequestResolver) FromUser(ctx context.Context, obj *model.ConnectRequest) (*model.User, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.FromUser(r.DB, ctx, obj)
}

// ToUser is the resolver for the toUser field.
func (r *connectRequestResolver) ToUser(ctx context.Context, obj *model.ConnectRequest) (*model.User, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.ToUser(r.DB, ctx, obj)
}

// AddConnectRequest is the resolver for the addConnectRequest field.
func (r *mutationResolver) AddConnectRequest(ctx context.Context, fromUserID string, toUserID string, message string) (*model.ConnectRequest, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.AddConnectReq(r.DB, ctx, fromUserID, toUserID, message)
}

// DeleteConnectRequest is the resolver for the deleteConnectRequest field.
func (r *mutationResolver) DeleteConnectRequest(ctx context.Context, fromUserID string, toUserID string) (*model.ConnectRequest, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.DeleteConenctReq(r.DB, ctx, fromUserID, toUserID)
}

// ConnectRequest returns generated.ConnectRequestResolver implementation.
func (r *Resolver) ConnectRequest() generated.ConnectRequestResolver {
	return &connectRequestResolver{r}
}

type connectRequestResolver struct{ *Resolver }
