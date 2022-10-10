package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/RaiNeOnMe/tpaWebb/graph/model"
	"github.com/RaiNeOnMe/tpaWebb/service"
)

// AddHashtag is the resolver for the addHashtag field.
func (r *mutationResolver) AddHashtag(ctx context.Context, hashtag string) (*model.Hashtag, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.AddHashtag(r.DB, ctx, hashtag)
}

// Hashtags is the resolver for the Hashtags field.
func (r *queryResolver) Hashtags(ctx context.Context) ([]*model.Hashtag, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.GetHashtag(r.DB, ctx)
}
