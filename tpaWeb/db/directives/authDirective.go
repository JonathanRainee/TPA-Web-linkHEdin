package directives

import (
	"context"

	"github.com/99designs/gqlgen/graphql"
	"github.com/RaiNeOnMe/tpaWebb/middleware"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

func Auth(ctx context.Context, onj interface{}, next graphql.Resolver) (interface{}, error) {
	token := middleware.CTxValue(ctx)
	if token == nil {
		return nil, &gqlerror.Error{
			Message:    "Access denied",
		}
	}
	return next(ctx)
}