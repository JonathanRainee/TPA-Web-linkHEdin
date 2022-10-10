package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/RaiNeOnMe/tpaWebb/graph/generated"
	"github.com/RaiNeOnMe/tpaWebb/graph/model"
	"github.com/RaiNeOnMe/tpaWebb/service"
)

// Search is the resolver for the Search field.
func (r *queryResolver) Search(ctx context.Context, keyword string, userID string) (*model.Search, error) {
	// panic(fmt.Errorf("not implemented"))
	// return service.Search(r.DB, ctx, keyword, limit, offset)
	search := new(model.Search)
	var modelUsers []*model.User
	var modelPosts []*model.Post

	if err := r.DB.Not("id = ?", userID).Find(&modelUsers, "name like ?", "%"+keyword+"%").Error; err != nil {
		return nil, err
	}
	if err := r.DB.Find(&modelPosts, "text like ?", "%"+keyword+"%").Error; err != nil {
		return nil, err
	}
	search.Users = modelUsers
	search.Posts = modelPosts
	return search, nil
}

// SearchHastag is the resolver for the SearchHastag field.
func (r *queryResolver) SearchHastag(ctx context.Context, keyword string, limit int, offset int) (*model.Search, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.SearchHashtag(r.DB, ctx, keyword, limit, offset)
}

// SearchPost is the resolver for the SearchPost field.
func (r *queryResolver) SearchPost(ctx context.Context, keyword string, limit int, offset int) (*model.Search, error) {
	// panic(fmt.Errorf("not implemented"))
	search := new(model.Search)
	var modelPosts []*model.Post

	if err := r.DB.Limit(limit).Offset(offset).Find(&modelPosts, "text like ?", "%"+keyword+"%").Error; err != nil {
		return nil, err
	}
	search.Posts = modelPosts
	return search, nil
}

// SearchUser is the resolver for the SearchUser field.
func (r *queryResolver) SearchUser(ctx context.Context, keyword string, limit int, offset int, userID string) (*model.Search, error) {
	// panic(fmt.Errorf("not implemented"))
	search := new(model.Search)
	var modelUsers []*model.User
	if err := r.DB.Limit(limit).Offset(offset).Not("id = ?", userID).Find(&modelUsers, "name like ?", "%"+keyword+"%").Error; err != nil {
		return nil, err
	}
	search.Users = modelUsers
	return search, nil
}

// Users is the resolver for the Users field.
func (r *searchResolver) Users(ctx context.Context, obj *model.Search) ([]*model.User, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.GetUserSearch(r.DB, ctx, obj)
}

// Posts is the resolver for the Posts field.
func (r *searchResolver) Posts(ctx context.Context, obj *model.Search) ([]*model.Post, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.SearchPost(r.DB, ctx, obj)
}

// Search returns generated.SearchResolver implementation.
func (r *Resolver) Search() generated.SearchResolver { return &searchResolver{r} }

type searchResolver struct{ *Resolver }
