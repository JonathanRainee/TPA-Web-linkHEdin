package service

import (
	"context"
	"github.com/RaiNeOnMe/tpaWebb/graph/model"
	"github.com/RaiNeOnMe/tpaWebb/middleware"
	"github.com/samber/lo"
	"gorm.io/gorm"
)

func Search(db *gorm.DB, ctx context.Context, keyword string, limit int, offset int) (*model.Search, error) {
	search := new(model.Search)

	userID := middleware.CTxValue(ctx).ID
	var modelUsers []*model.User
	var modelPosts []*model.Post

	if err := db.Limit(limit).Offset(offset).Not("id = ?", userID).Find(&modelUsers, "concat(first_name, last_name) like ?", "%"+keyword+"%").Error; err != nil {
		return nil, err
	}

	if err := db.Limit(limit).Offset(offset).Find(&modelPosts, "text like ? ", "%"+keyword+"%").Error; err != nil {
		return nil, err
	}

	search.Users = modelUsers
	search.Posts = modelPosts

	return search, nil
}

func SearchHashtag(db *gorm.DB, ctx context.Context, keyword string, limit int, offset int) (*model.Search, error) {
	search := new(model.Search)
	
	var posts []*model.Post

	if err := db.Limit(limit).Offset(offset).Find(&posts, "text like ?", "%#"+keyword+"%").Error; err != nil {
		return nil, err
	}

	search.Posts = posts
	return search, nil
}

func SearchPost(db *gorm.DB, ctx context.Context, obj *model.Search) ([]*model.Post, error) {
	var post []*model.Post

	postIds := lo.Map(obj.Posts, func(post *model.Post, _ int) string {
		return post.ID
	})

	if len(postIds) == 0 {
		return post, nil
	}

	if err := db.Find(&post, postIds).Error; err != nil {
		return nil, err
	}

	return post, nil
}

func GetUserSearch(db *gorm.DB, ctx context.Context, obj *model.Search) ([]*model.User, error) {
	var users []*model.User

	userIds := lo.Map(obj.Users, func(user *model.User, _ int) string {
		return user.ID
	})

	if len(userIds) == 0 {
		return users, nil
	}

	if err := db.Find(&users, userIds).Error; err != nil {
		return nil, err
	}

	return users, nil
}
