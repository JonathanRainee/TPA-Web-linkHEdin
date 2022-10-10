package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/RaiNeOnMe/tpaWebb/graph/model"
	"github.com/RaiNeOnMe/tpaWebb/service"
)

// AddBlock is the resolver for the addBlock field.
func (r *mutationResolver) AddBlock(ctx context.Context, userID string, blockID string) (*model.Block, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.AddBlock(r.DB, ctx, userID, blockID)
}

// DeleteBlock is the resolver for the deleteBlock field.
func (r *mutationResolver) DeleteBlock(ctx context.Context, userID string, blockID string) (*model.Block, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.DeleteBlock(r.DB, ctx, userID, blockID)
}
