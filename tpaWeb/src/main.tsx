import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, ApolloLink, createHttpLink } from '@apollo/client';
import { UserAuth } from './contexts/authContext'
import AuthContextProvider from './contexts/authContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthContextProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </AuthContextProvider>
)