package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/RaiNeOnMe/tpaWebb/graph/model"
	"github.com/google/uuid"
)

// CreateExperience is the resolver for the createExperience field.
func (r *mutationResolver) CreateExperience(ctx context.Context, input model.NewExperience) (string, error) {
	var endYear string
	if input.Active {
		endYear = "Present"
	} else {
		endYear = input.EndYear
	}

	model := &model.Experience{
		ID:             uuid.NewString(),
		UserID:         input.UserID,
		Title:          input.Title,
		EmploymentType: input.EmploymentType,
		CompanyName:    input.CompanyName,
		Location:       input.Location,
		Active:         input.Active,
		StartYear:      input.StartYear,
		EndYear:        endYear,
		Industry:       input.Industry,
		Description:    input.Description,
	}
	err := r.DB.Create(model).Error
	if err != nil {
		return "", err
	}
	return "created experience", nil
}

// UpdateExperience is the resolver for the updateExperience field.
func (r *mutationResolver) UpdateExperience(ctx context.Context, id string, input model.NewExperience) (string, error) {
	// panic(fmt.Errorf("not implemented"))
	var model *model.Experience
	if err := r.DB.First(&model, "id = ?", id).Error; err != nil {
		return "errorrr", err
	}
	model.Title = input.Title
	model.EmploymentType = input.EmploymentType
	model.CompanyName = input.CompanyName
	model.Location = input.Location
	model.Active = input.Active
	model.StartYear = input.StartYear
	model.EndYear = input.EndYear
	model.Industry = input.Industry
	model.Description = input.Description
	return "experience updated", r.DB.Save(model).Error
}

// DeleteExperience is the resolver for the deleteExperience field.
func (r *mutationResolver) DeleteExperience(ctx context.Context, id string) (string, error) {
	// panic(fmt.Errorf("not implemented"))
	experience := new(model.Experience)
	err := r.DB.Delete(experience, "id = ?", id).Error
	if err != nil {
		return "", err
	} else {
		return "delete success", err
	}
}

// UserExperience is the resolver for the userExperience field.
func (r *queryResolver) UserExperience(ctx context.Context, userID string) ([]*model.Experience, error) {
	// panic(fmt.Errorf("not implemented"))
	var model []*model.Experience
	return model, r.DB.Where("user_id = ?", userID).Find(&model).Error
}
