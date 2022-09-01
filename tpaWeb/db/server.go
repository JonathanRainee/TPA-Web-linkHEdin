package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/RaiNeOnMe/tpaWebb/config"
	"github.com/RaiNeOnMe/tpaWebb/graph"
	"github.com/RaiNeOnMe/tpaWebb/graph/generated"
	"github.com/RaiNeOnMe/tpaWebb/graph/model"
	"github.com/gorilla/mux"
	// "github.com/RaiNeOnMe/tpaWebb/graph/model"
	// "gorm.io/driver/postgres"
	// "gorm.io/gorm"
)

const defaultPort = "4444"

func MyCors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Add("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization, Token")
		w.Header().Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("content-type", "application/json;charset=UTF-8")
		if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusNoContent)
		return
		}
		next.ServeHTTP(w, r)
		})
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}
	// dsn := "host=localhost user=postgres password=Thyphopobia351 dbname=tpaWeb port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	// db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	
	db := config.GetDB()
	db.AutoMigrate(&model.User{})
	db.AutoMigrate(&model.ActivationLink{})
	db.AutoMigrate(&model.Education{})
	db.AutoMigrate(&model.Experience{})

	// if err != nil {
	// 	panic(err)
	// }

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{
		DB: db,
	}}))

	router := mux.NewRouter()
	router.Use(MyCors)
	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
