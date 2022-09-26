package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/RaiNeOnMe/tpaWebb/graph/generated"
	"github.com/RaiNeOnMe/tpaWebb/graph/model"
	"github.com/RaiNeOnMe/tpaWebb/service"
)

// CreatePost is the resolver for the CreatePost field.
func (r *mutationResolver) CreatePost(ctx context.Context, input model.InputPost) (*model.Post, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.CreatePost(r.DB, ctx, input)
}

// LikePost is the resolver for the LikePost field.
func (r *mutationResolver) LikePost(ctx context.Context, postID string, userID string) (*model.LikePosts, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.LikePost(r.DB, ctx, postID, userID)
}

// UnLikePost is the resolver for the UnLikePost field.
func (r *mutationResolver) UnLikePost(ctx context.Context, postID string, userID string) (*model.LikePosts, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.UnlikePost(r.DB, ctx, postID, userID)
}

// Sender is the resolver for the Sender field.
func (r *postResolver) Sender(ctx context.Context, obj *model.Post) (*model.User, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.GetUserById(ctx, obj.SenderId)
}

// Likes is the resolver for the Likes field.
func (r *postResolver) Likes(ctx context.Context, obj *model.Post) ([]*model.LikePosts, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.GetLikes(r.DB, ctx, obj)
}

// Comments is the resolver for the Comments field.
func (r *postResolver) Comments(ctx context.Context, obj *model.Post) ([]*model.Comment, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.GetComments(r.DB, ctx, obj)
}

// Posts is the resolver for the Posts field.
func (r *queryResolver) Posts(ctx context.Context, limit int, offset int, userID string) ([]*model.Post, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.GetPosts(r.DB, ctx, limit, offset, userID)
}

// Post returns generated.PostResolver implementation.
func (r *Resolver) Post() generated.PostResolver { return &postResolver{r} }

type postResolver struct{ *Resolver }
