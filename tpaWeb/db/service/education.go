package service

import (
	"context"

	"github.com/RaiNeOnMe/tpaWebb/graph/model"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func GetEducations(db *gorm.DB, ctx context.Context, obj *model.User) ([]*model.Education, error) {
	var modelEducations []*model.Education

	return modelEducations, db.Where("user_id = ? ", obj.ID).Find(&modelEducations).Error
}

func AddEducation(db *gorm.DB, ctx context.Context, input model.NewEducation) (*model.Education, error) {
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
	}

	return model, db.Save(model).Error
}

func UpdateEducation(db *gorm.DB, ctx context.Context, id string, input model.NewEducation) (*model.Education, error) {
	modelEducation := new(model.Education)

	if err := db.First(modelEducation, "id = ?", id).Error; err != nil {
		return nil, err
	}

	modelEducation.School = input.School
	modelEducation.Degree = input.Degree
	modelEducation.FieldOfStudy = input.FieldOfStudy
	modelEducation.StartDate = input.StartDate
	modelEducation.EndDate = input.EndDate
	modelEducation.Grade = input.Grade
	modelEducation.Activites = input.Activites

	return modelEducation, db.Save(modelEducation).Error
}

func DeleteEducation(db *gorm.DB, ctx context.Context, id string) (*model.Education, error) {
	modelEducation := new(model.Education)

	if err := db.First(modelEducation, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return modelEducation, db.Delete(modelEducation).Error
}

func Educations(db *gorm.DB, ctx context.Context) ([]*model.Education, error) {
	var modelEducations []*model.Education
	return modelEducations, db.Find(&modelEducations).Error
}