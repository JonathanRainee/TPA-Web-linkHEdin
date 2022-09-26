package service

import (
	"context"
	"time"
	"github.com/RaiNeOnMe/tpaWebb/graph/model"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func AddJob(db *gorm.DB, ctx context.Context, title string, companyName string, workplace string, city string, country string, employmentType string, description string) (*model.Job, error){
	modelJob := &model.Job{
		ID:             uuid.NewString(),
		Title:          title,
		CompanyName:    companyName,
		Workplace:      workplace,
		City:           city,
		Country:        country,
		EmploymentType: employmentType,
		Description:    description,
		CreatedAt:      time.Now(),
	}
	return modelJob, db.Create(modelJob).Error
}

func GetJobs(db *gorm.DB, ctx context.Context)([]*model.Job, error){
	var jobs []*model.Job

	if err := db.Order("created_at desc").Find(&jobs).Error; err != nil {
		return nil, err
	}
	return jobs, nil
}