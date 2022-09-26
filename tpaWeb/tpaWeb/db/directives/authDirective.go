package directives

import (
	"context"
	// "fmt"
	"log"

	"github.com/99designs/gqlgen/graphql"
	"github.com/RaiNeOnMe/tpaWebb/middleware"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

func Auth(ctx context.Context, obj interface{}, next graphql.Resolver) (interface{}, error) {
	token := middleware.CTxValue(ctx)
	// fmt.Printf(token)
	if token == nil {
		log.Print("gaad")
		return nil, &gqlerror.Error{
			Message:    "Access denied",
		}
	}else{
		log.Print("ada")		
	}
	return next(ctx)
}