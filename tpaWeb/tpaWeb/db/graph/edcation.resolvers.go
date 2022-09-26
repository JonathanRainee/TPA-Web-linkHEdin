package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/RaiNeOnMe/tpaWebb/graph/model"
	"github.com/RaiNeOnMe/tpaWebb/service"
)

// CreateEducation is the resolver for the createEducation field.
func (r *mutationResolver) CreateEducation(ctx context.Context, input model.NewEducation) (*model.Education, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.AddEducation(r.DB, ctx, input)
}

// UpdateEducation is the resolver for the updateEducation field.
func (r *mutationResolver) UpdateEducation(ctx context.Context, id string, input model.NewEducation) (*model.Education, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.UpdateEducation(r.DB, ctx, id, input)
}

// DeleteEducation is the resolver for the deleteEducation field.
func (r *mutationResolver) DeleteEducation(ctx context.Context, id string) (*model.Education, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.DeleteEducation(r.DB, ctx, id)
}

// UserEducation is the resolver for the userEducation field.
func (r *queryResolver) UserEducation(ctx context.Context, userID string) ([]*model.Education, error) {
	// panic(fmt.Errorf("not implemented"))
	var model []*model.Education
	return model, r.DB.Where("user_id = ?", userID).Find(&model).Error
}

// MyEducation is the resolver for the myEducation field.
func (r *queryResolver) MyEducation(ctx context.Context) ([]*model.Education, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.Educations(r.DB, ctx)
}
