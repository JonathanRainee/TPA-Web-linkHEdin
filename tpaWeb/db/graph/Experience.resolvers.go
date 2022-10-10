package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/RaiNeOnMe/tpaWebb/graph/model"
	"github.com/RaiNeOnMe/tpaWebb/service"
)

// CreateExperience is the resolver for the createExperience field.
func (r *mutationResolver) CreateExperience(ctx context.Context, input model.NewExperience) (*model.Experience, error) {
	return service.AddExperience(r.DB, ctx, input)
	// panic(fmt.Errorf("not implemented"))
}

// UpdateExperience is the resolver for the updateExperience field.
func (r *mutationResolver) UpdateExperience(ctx context.Context, id string, input model.NewExperience) (*model.Experience, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.UpdateExperience(r.DB, ctx, id, input)
}

// DeleteExperience is the resolver for the deleteExperience field.
func (r *mutationResolver) DeleteExperience(ctx context.Context, id string) (*model.Experience, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.DeleteExperience(r.DB, ctx, id)
}

// UserExperience is the resolver for the userExperience field.
func (r *queryResolver) UserExperience(ctx context.Context, userID string) ([]*model.Experience, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.Experiences(r.DB, ctx)
}
