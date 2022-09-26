package service

import (
	"context"

	"github.com/RaiNeOnMe/tpaWebb/graph/model"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func GetExperienceUser(db *gorm.DB, ctx context.Context, obj *model.User) ([]*model.Experience, error) {
	var modelExperiences []*model.Experience
	return modelExperiences, db.Where("user_id = ?", obj.ID).Find(&modelExperiences).Error
}

func AddExperience(db *gorm.DB, ctx context.Context, input model.NewExperience) (*model.Experience, error) {
	var endYear string
	if input.Active {
		endYear = "Present"
	} else {
		endYear = input.EndYear
	}
	modelExperience := &model.Experience{
		ID:             uuid.NewString(),
		Title:          input.Title,
		UserID:         input.UserID,
		EmploymentType: input.EmploymentType,
		CompanyName:    input.CompanyName,
		Active:         input.Active,
		Industry:       input.Industry,
		StartYear:      input.StartYear,
		EndYear:        endYear,
		Description:    input.Description,
	}

	return modelExperience, db.Save(modelExperience).Error
}

func UpdateExperience(db *gorm.DB, ctx context.Context, id string, input model.NewExperience) (*model.Experience, error) {
	var endYear string
	if input.Active {
		endYear = "Present"
	} else {
		endYear = input.EndYear
	}
	modelExperience := new(model.Experience)

	if err := db.First(modelExperience, "id = ?", id).Error; err != nil {
		return nil, err
	}

	modelExperience.Title = input.Title
	modelExperience.EmploymentType = input.EmploymentType
	modelExperience.CompanyName = input.CompanyName
	modelExperience.Active = input.Active
	modelExperience.Industry = input.Industry
	modelExperience.StartYear = input.StartYear
	modelExperience.EndYear = endYear
	modelExperience.Description = input.Description

	return modelExperience, db.Save(modelExperience).Error
}

func DeleteExperience(db *gorm.DB, ctx context.Context, id string) (*model.Experience, error) {
	modelExperience := new(model.Experience)

	if err := db.First(modelExperience, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return modelExperience, db.Delete(modelExperience).Error
}

func Experiences(db *gorm.DB, ctx context.Context) ([]*model.Experience, error) {
	var modelExperiences []*model.Experience
	return modelExperiences, db.Find(&modelExperiences).Error
}