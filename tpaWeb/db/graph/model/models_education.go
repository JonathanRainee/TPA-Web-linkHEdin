package model

type Education struct {
	ID string `json:"id"`
	UserID string `json:"userid"`
	School string `json:"school"`
	Degree string `json:"degree"`
	FieldOfStudy string `json:"field_of_study"`
	StartDate string `json:"start_date"`
	EndDate string `json:"end_date"`
	Grade float64 `json:"grade"`
	Activites string `json:"activites"`
	Desctiption string `json:"description"`
}