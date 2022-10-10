package service

import (
	"context"
	"github.com/RaiNeOnMe/tpaWebb/graph/model"
	"gorm.io/gorm"
)

func AddBlock(db *gorm.DB, ctx context.Context, userID string, blockID string) (*model.Block, error){
	block := &model.Block{
		UserID:  userID,
		BlockID: blockID,
	}

	return block, db.Table("user_blocks").Create(block).Error
}

func DeleteBlock(db *gorm.DB, ctx context.Context, userID string, blockID string) (*model.Block, error) {
	block := new(model.Block)
	return block, db.Table("user_blocks").Delete(block, "user_id = ? AND block_id = ?", userID, blockID).Error
}