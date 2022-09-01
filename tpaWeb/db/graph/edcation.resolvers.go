package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/RaiNeOnMe/tpaWebb/graph/generated"
	"github.com/RaiNeOnMe/tpaWebb/graph/model"
	"github.com/RaiNeOnMe/tpaWebb/middleware"
	"github.com/google/uuid"
)

// Description is the resolver for the Description field.
func (r *educationResolver) Description(ctx context.Context, obj *model.Education) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

// CreateEducation is the resolver for the createEducation field.
func (r *mutationResolver) CreateEducation(ctx context.Context, input model.NewEducation) (string, error) {
	// panic(fmt.Errorf("not implemented"))
	model := &model.Education{
		ID:           uuid.NewString(),
		UserID:       input.UserID,
		School:       input.School,
		Degree:       input.Degree,
		FieldOfStudy: input.FieldOfStudy,
		StartDate:    input.StartDate,
		EndDate:      input.EndDate,
		Grade:        input.Grade,
		Activites:    input.Activites,
		Desctiption:  input.Description,
	}
	err := r.DB.Create(model).Error
	if err != nil {
		return "", err
	}
	return "Education Created", nil
}

// UpdateEducation is the resolver for the updateEducation field.
func (r *mutationResolver) UpdateEducation(ctx context.Context, id string, input model.NewEducation) (string, error) {
	// panic(fmt.Errorf("not implemented"))
	var model *model.Education
	if err := r.DB.First(&model, "ID = ?", id).Error; err != nil {
		return "errorrr", err
	}
	model.School = input.School
	model.Degree = input.Degree
	model.FieldOfStudy = input.FieldOfStudy
	model.StartDate = input.StartDate
	model.EndDate = input.EndDate
	model.Grade = input.Grade
	model.Activites = input.Activites
	model.Desctiption = input.Description
	return "update success", r.DB.Save(model).Error
}

// DeleteEducation is the resolver for the deleteEducation field.
func (r *mutationResolver) DeleteEducation(ctx context.Context, id string) (string, error) {
	// panic(fmt.Errorf("not implemented"))
	education := new(model.Education)
	err := r.DB.Delete(education, "ID = ?", id).Error
	if err != nil {
		return "", err
	} else {
		return "delete success", err
	}
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
	val := *middleware.CTxValue(ctx)
	var models []*model.Education
	return models, r.DB.Where("user_id = ?", val.ID).Find(&models).Error
}

// Education returns generated.EducationResolver implementation.
func (r *Resolver) Education() generated.EducationResolver { return &educationResolver{r} }

type educationResolver struct{ *Resolver }
