package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/RaiNeOnMe/tpaWebb/graph/generated"
	"github.com/RaiNeOnMe/tpaWebb/graph/model"
	"github.com/RaiNeOnMe/tpaWebb/service"
	"github.com/samber/lo"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

// Login is the resolver for the Login field.
func (r *mutationResolver) Login(ctx context.Context, email string, password string) (interface{}, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.UserLogin(ctx, email, password)
}

// LoginWOPass is the resolver for the LoginWOPass field.
func (r *mutationResolver) LoginWOPass(ctx context.Context, email string) (interface{}, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.LoginWOPass(ctx, email)
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

// UploadBannerPicture is the resolver for the UploadBannerPicture field.
func (r *mutationResolver) UploadBannerPicture(ctx context.Context, id string, newBanner string) (string, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.UploadBgPicture(ctx, id, newBanner)
}

// AcceptReqConnect is the resolver for the AcceptReqConnect field.
func (r *mutationResolver) AcceptReqConnect(ctx context.Context, id string, senderID string) (string, error) {
	panic(fmt.Errorf("not implemented"))
	// recipient := new(model.User)
	// sender := new(model.User)

	// if err := r.DB.First(recipient, "id = ?", id).Error; err != nil {
	// 	return "no user", err
	// }

	// if err := r.DB.First(sender, "id = ?", senderID).Error; err != nil {
	// 	return "no user", err
	// }
	// fmt.Println(recipient.ID)
	// fmt.Println(len(recipient.ConnectRequest))
	// newArray := make([]string, (len(recipient.ConnectRequest) - 1))
	// flag := false
	// counter := 0

	// for i := 0; i < (len(recipient.ConnectRequest) - 1); {
	// 	fmt.Println(recipient.ConnectRequest[i])
	// 	if recipient.ConnectRequest[i] != senderID {
	// 		newArray[i] = recipient.ConnectRequest[counter]
	// 		counter++
	// 		i++
	// 	} else {
	// 		flag = true
	// 		counter++
	// 	}
	// }

	// if !flag {
	// 	recipient.ConnectRequest = newArray
	// 	sender.ConnectedUser = append(sender.ConnectedUser, id)
	// 	recipient.ConnectedUser = append(recipient.ConnectedUser, senderID)

	// 	if err := r.DB.Save(recipient).Error; err != nil {
	// 		return "failed to connect", err
	// 	}

	// 	if err := r.DB.Save(sender).Error; err != nil {
	// 		return "failed to connect", err
	// 	}

	// 	return "Success", nil
	// } else {
	// 	return "There are currently no request", nil
	// }
}

// ReqConnect is the resolver for the ReqConnect field.
func (r *mutationResolver) ReqConnect(ctx context.Context, id string, recipientID string) (string, error) {
	panic(fmt.Errorf("not implemented"))
	// user := new(model.User)
	// err := r.DB.First(user, "id = ?", recipientID).Error

	// if err != nil {
	// 	return "there are no such user", err
	// }

	// user.ConnectRequest = append(user.ConnectRequest, id)
	// return "connect request sent", r.DB.Save(user).Error
}

// IgnoreConnect is the resolver for the IgnoreConnect field.
func (r *mutationResolver) IgnoreConnect(ctx context.Context, id string, senderID string) (string, error) {
	panic(fmt.Errorf("not implemented"))
	// recipient := new(model.User)

	// if err := r.DB.First(recipient, "id = ?", id).Error; err != nil {
	// 	return "Failed to connect", err
	// }

	// newArr := make([]string, (len(recipient.ConnectRequest) - 1))
	// k := 0

	// for i := 0; i < (len(recipient.ConnectRequest) - 1); {
	// 	if recipient.ConnectRequest[i] != senderID {
	// 		newArr[i] = recipient.ConnectRequest[k]
	// 		k++
	// 		i++
	// 	} else {
	// 		k++
	// 	}
	// }
	// recipient.ConnectRequest = newArr
	// if err := r.DB.Save(recipient).Error; err != nil {
	// 	return "Failed to connect", err
	// }
	// return "Success", nil
}

// Follow is the resolver for the Follow field.
func (r *mutationResolver) Follow(ctx context.Context, id1 string, id2 string) (interface{}, error) {
	// panic(fmt.Errorf("not implemented"))
	// user := new(model.User)

	// if err := r.DB.First(user, "id = ?", id).Error; err != nil {
	// 	return "Failed to connect", err
	// }

	// user.FollowedUser = append(user.FollowedUser, follow)

	// if err := r.DB.Save(user).Error; err != nil {
	// 	return "Failed to connect", err
	// }
	// return "Success", nil
	return service.FollowUser(r.DB, ctx, id1, id2)
}

// Unfollow is the resolver for the Unfollow field.
func (r *mutationResolver) Unfollow(ctx context.Context, id1 string, id2 string) (interface{}, error) {
	// panic(fmt.Errorf("not implemented"))
	// user := new(model.User)

	// if err := r.DB.First(user, "id = ?", id).Error; err != nil {
	// 	return "Failed to connect", err
	// }

	// newArr := make([]string, (len(user.FollowedUser) - 1))

	// k := 0

	// for i := 0; i < (len(user.FollowedUser) - 1); {
	// 	if user.FollowedUser[i] != unfollow {
	// 		newArr[i] = user.FollowedUser[k]
	// 		k++
	// 		i++
	// 	} else {
	// 		k++
	// 	}
	// }

	// user.FollowedUser = newArr
	// if err := r.DB.Save(user).Error; err != nil {
	// 	return "Failed to connect", err
	// }
	// return "Success", nil
	return service.UnfollowUser(r.DB, ctx, id1, id2)
}

// UpdateUsername is the resolver for the UpdateUsername field.
func (r *mutationResolver) UpdateUsername(ctx context.Context, id string, newUsername string) (string, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.UpdateUsername(ctx, id, newUsername)
}

// VisitUser is the resolver for the VisitUser field.
func (r *mutationResolver) VisitUser(ctx context.Context, id1 string, id2 string) (interface{}, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.VisisUser(r.DB, ctx, id1, id2)
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

// GetUserByEmail is the resolver for the getUserByEmail field.
func (r *queryResolver) GetUserByEmail(ctx context.Context, email string) (*model.User, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.GetUserByEmail(ctx, email)
}

// UserSuggestion is the resolver for the userSuggestion field.
func (r *queryResolver) UserSuggestion(ctx context.Context, userID string) ([]*model.User, error) {
	// panic(fmt.Errorf("not implemented"))
	var users []*model.User
	var userIdList []string
	var userSuggestionId []string

	var connections1 []*model.Connection
	var connections2 []*model.Connection

	if err := r.DB.Find(&connections1, "user1_id", userID).Error; err != nil {
		return nil, err
	}

	if err := r.DB.Find(&connections2, "user2_id", userID).Error; err != nil {
		return nil, err
	}

	connetions1Ids := lo.Map(connections1, func(connectionData *model.Connection, _ int) string {
		return connectionData.User2ID
	})

	connetions2Ids := lo.Map(connections2, func(connectionData *model.Connection, _ int) string {
		return connectionData.User1ID
	})

	userIdList = append(userIdList, connetions1Ids...)
	userIdList = append(userIdList, connetions2Ids...)
	userIdList = lo.Uniq(userIdList)

	var friendConnection1 []*model.Connection
	var friendConnection2 []*model.Connection

	if err := r.DB.Where("user1_id IN ?", userIdList).Not("user2_id = ?", userID).Find(&friendConnection1).Error; err != nil {
		return nil, err
	}

	if err := r.DB.Where("user2_id IN ?", userIdList).Not("user1_id = ?", userID).Find(&friendConnection2).Error; err != nil {
		return nil, err
	}

	fmt.Println(userIdList)

	userSuggestion1Ids := lo.Map(friendConnection1, func(connectionData *model.Connection, _ int) string {
		return connectionData.User2ID
	})

	userSuggestion2Ids := lo.Map(friendConnection2, func(connectionData *model.Connection, _ int) string {
		return connectionData.User1ID
	})

	userSuggestionId = append(userSuggestionId, userSuggestion1Ids...)
	userSuggestionId = append(userSuggestionId, userSuggestion2Ids...)
	userSuggestionId = lo.Uniq(userSuggestionId)
	fmt.Println(userSuggestionId)

	var finalUserSuggestionId []string
	for _, suggestionIdUser := range userSuggestionId {
		checkSame := false
		for _, userConnectionId := range userIdList {
			if suggestionIdUser == userConnectionId {
				checkSame = true
			}
		}

		if !checkSame {
			finalUserSuggestionId = append(finalUserSuggestionId, suggestionIdUser)
		}
	}

	fmt.Println(finalUserSuggestionId)

	if len(finalUserSuggestionId) == 0 {
		return nil, gqlerror.Errorf("No Connection User Data")
	}

	if err := r.DB.Find(&users, finalUserSuggestionId).Error; err != nil {
		return nil, err
	}

	return users, nil
}

// Visits is the resolver for the Visits field.
func (r *userResolver) Visits(ctx context.Context, obj *model.User) ([]*model.Visit, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.GetVisit(r.DB, ctx, obj)
}

// Follows is the resolver for the Follows field.
func (r *userResolver) Follows(ctx context.Context, obj *model.User) ([]*model.Follow, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.GetFollows(r.DB, ctx, obj)
}

// Blocks is the resolver for the Blocks field.
func (r *userResolver) Blocks(ctx context.Context, obj *model.User) ([]*model.Block, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.GetBlocks(r.DB, ctx, obj)
}

// Connections is the resolver for the Connections field.
func (r *userResolver) Connections(ctx context.Context, obj *model.User) ([]*model.Connection, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.GetConnections(r.DB, ctx, obj)
}

// ConnectRequests is the resolver for the ConnectRequests field.
func (r *userResolver) ConnectRequests(ctx context.Context, obj *model.User) ([]*model.ConnectRequest, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.GetConnectRequests(r.DB, ctx, obj)
}

// Experiences is the resolver for the Experiences field.
func (r *userResolver) Experiences(ctx context.Context, obj *model.User) ([]*model.Experience, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.GetExperienceUser(r.DB, ctx, obj)
}

// Educations is the resolver for the Educations field.
func (r *userResolver) Educations(ctx context.Context, obj *model.User) ([]*model.Education, error) {
	// panic(fmt.Errorf("not implemented"))
	return service.GetEducations(r.DB, ctx, obj)
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

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//  - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//    it when you're done.
//  - You have helper methods in this file. Move them out to keep these resolver files clean.
func (r *userResolver) ConnectRequest(ctx context.Context, obj *model.User) ([]string, error) {
	panic(fmt.Errorf("not implemented"))
	// return obj.ConnectRequest, nil
	// return service.GetConnectRequests(r.DB, ctx, obj)
}
