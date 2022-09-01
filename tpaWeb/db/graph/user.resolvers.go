package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/RaiNeOnMe/tpaWebb/graph/generated"
	"github.com/RaiNeOnMe/tpaWebb/graph/model"
	"github.com/RaiNeOnMe/tpaWebb/service"
)

// Login is the resolver for the Login field.
func (r *mutationResolver) Login(ctx context.Context, email string, password string) (interface{}, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.UserLogin(ctx, email, password)
}

// Register is the resolver for the Register field.
func (r *mutationResolver) Register(ctx context.Context, input model.NewUser) (interface{}, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.RegisterUser(ctx, input)
}

// ActivateAcount is the resolver for the ActivateAcount field.
func (r *mutationResolver) ActivateAcount(ctx context.Context, id string) (interface{}, error) {
	// panic(fmt.Errorf("not implemented"))
	user := new(model.User)
	link := new(model.ActivationLink)
	if err := r.DB.First(user, "id = ?", id).Error; err != nil {
		panic(err)
	}
	user.Verified = true
	if err := r.DB.Delete(link, "user_id = ?", id).Error; err != nil {
		panic(err)
	}
	return user, r.DB.Save(user).Error
}

// ResetPass is the resolver for the ResetPass field.
func (r *mutationResolver) ResetPass(ctx context.Context, id string, newPass string) (string, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.ResetPass(ctx, id, newPass)
}

// UpdateUser is the resolver for the UpdateUser field.
func (r *mutationResolver) UpdateUser(ctx context.Context, id string, input model.UpdateUser) (*model.User, error) {
	// panic(fmt.Errorf("not implemented"))
	var model *model.User
	if err := r.DB.First(&model, "id = ?", id).Error; err != nil {
		return nil, err
	}

	if input.Name != "" {
		model.Name = input.Name
	}

	if input.Email != "" {
		model.Email = input.Email
	}

	if input.ProfilePicture != "" {
		model.ProfilePicture = input.ProfilePicture
	}

	return model, r.DB.Save(model).Error
}

// UploadProfilePicture is the resolver for the UploadProfilePicture field.
func (r *mutationResolver) UploadProfilePicture(ctx context.Context, id string, newProfilePicture string) (string, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.UploadProfilePicture(ctx, id, newProfilePicture)
}

// AcceptReqConnect is the resolver for the AcceptReqConnect field.
func (r *mutationResolver) AcceptReqConnect(ctx context.Context, id string, senderID string) (string, error) {
	// panic(fmt.Errorf("not implemented"))
	recipient := new(model.User)
	sender := new(model.User)

	if err := r.DB.First(recipient, "id = ?", id).Error; err != nil {
		return "no user", err
	}

	if err := r.DB.First(sender, "id = ?", senderID).Error; err != nil {
		return "no user", err
	}
	fmt.Println(recipient.ID)
	fmt.Println(len(recipient.ConnectRequest))
	newArray := make([]string, (len(recipient.ConnectRequest) - 1))
	flag := false
	counter := 0

	for i := 0; i < (len(recipient.ConnectRequest) - 1); {
		fmt.Println(recipient.ConnectRequest[i])
		if recipient.ConnectRequest[i] != senderID {
			newArray[i] = recipient.ConnectRequest[counter]
			counter++
			i++
		} else {
			flag = true
			counter++
		}
	}

	if !flag {
		recipient.ConnectRequest = newArray
		sender.ConnectedUser = append(sender.ConnectedUser, id)
		recipient.ConnectedUser = append(recipient.ConnectedUser, senderID)

		if err := r.DB.Save(recipient).Error; err != nil {
			return "failed to connect", err
		}

		if err := r.DB.Save(sender).Error; err != nil {
			return "failed to connect", err
		}

		return "Success", nil
	} else {
		return "There are currently no request", nil
	}
}

// ReqConnect is the resolver for the ReqConnect field.
func (r *mutationResolver) ReqConnect(ctx context.Context, id string, recipientID string) (string, error) {
	// panic(fmt.Errorf("not implemented"))
	user := new(model.User)
	err := r.DB.First(user, "id = ?", recipientID).Error

	if err != nil {
		return "there are no such user", err
	}

	user.ConnectRequest = append(user.ConnectRequest, id)
	return "connect request sent", r.DB.Save(user).Error
}

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context, id string) (*model.User, error) {
	// panic(fmt.Errorf("not implemented"))
	var user *model.User
	return user, r.DB.First(&user, "id = ?", id).Error
}

// Users is the resolver for the users field.
func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	panic(fmt.Errorf("not implemented"))
	// return r.UsersTable, nil
}

// GetUser is the resolver for the getUser field.
func (r *queryResolver) GetUser(ctx context.Context, id string) (*model.User, error) {
	// panic(fmt.Errorf("not implemented"))
	// return service.GetUserById(ctx, id)
	x, err := service.GetUserById(ctx, id)
	return x, err
}

// FollowedUser is the resolver for the followed_user field.
func (r *userResolver) FollowedUser(ctx context.Context, obj *model.User) ([]string, error) {
	// panic(fmt.Errorf("not implemented"))
	return obj.FollowedUser, nil
}

// ConnectedUser is the resolver for the connected_user field.
func (r *userResolver) ConnectedUser(ctx context.Context, obj *model.User) ([]string, error) {
	// panic(fmt.Errorf("not implemented"))
	return obj.ConnectedUser, nil
}

// ConnectRequest is the resolver for the connect_request field.
func (r *userResolver) ConnectRequest(ctx context.Context, obj *model.User) ([]string, error) {
	// panic(fmt.Errorf("not implemented"))
	return obj.ConnectRequest, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type userResolver struct{ *Resolver }
