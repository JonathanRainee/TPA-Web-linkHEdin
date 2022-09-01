package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/RaiNeOnMe/tpaWebb/graph/model"
	"github.com/RaiNeOnMe/tpaWebb/service"
	"github.com/google/uuid"
)

// CreateActivationLink is the resolver for the createActivationLink field.
func (r *mutationResolver) CreateActivationLink(ctx context.Context, userID string) (*model.ActivationLink, error) {
	// panic(fmt.Errorf("not implemented"))
	link := &model.ActivationLink{
		ID:     uuid.NewString(),
		UserID: userID,
	}
	return link, nil
}

// CreateForgetLink is the resolver for the createForgetLink field.
func (r *mutationResolver) CreateForgetLink(ctx context.Context, userEmail string) (interface{}, error) {
	// panic(fmt.Errorf("not implemented"))
	service.ResetPassLinkCreate(ctx, userEmail)
	return map[string]interface{}{}, nil
}

// GetActivationLink is the resolver for the getActivationLink field.
func (r *queryResolver) GetActivationLink(ctx context.Context, id string) (*model.ActivationLink, error) {
	// panic(fmt.Errorf("not implemented"))
	model := new(model.ActivationLink)
	return model, r.DB.First(model, "id = ?", id).Error
}
