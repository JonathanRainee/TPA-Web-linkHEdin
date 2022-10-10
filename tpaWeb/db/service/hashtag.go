package service

import (
	"context"
	"github.com/RaiNeOnMe/tpaWebb/graph/model"
	"github.com/google/uuid"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"gorm.io/gorm"
)

func AddHashtag(db *gorm.DB, ctx context.Context, hashtag string) (*model.Hashtag, error) {
	modelHashtag := new(model.Hashtag)
	modelInput := &model.Hashtag{
		ID:      uuid.NewString(),
		Hashtag: hashtag,
	}
	if err := db.Find(modelHashtag, "hashtag = ?", hashtag).Error; err != nil {
		return nil ,err
	}

	if modelHashtag.ID != "" {
		return nil, gqlerror.Errorf("Hashtag already exist")
	}

	return modelInput, db.Create(modelInput).Error
}

func GetHashtag(db *gorm.DB, ctx context.Context) ([]*model.Hashtag, error){
	var hashtags []*model.Hashtag
	return hashtags, db.Find(&hashtags).Error
}