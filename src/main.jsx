import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './Router/Router';
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './providers/AuthProviders';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
    </QueryClientProvider>
  </AuthProvider>
)
