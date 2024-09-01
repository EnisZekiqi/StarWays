import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ProtectedRoute from './ProtectedRoute';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ExampleWrapper from './ExampleWrapper';
import SignIn from './SignIn';
import Main from './Main';


import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/> ,
  },
  {
    path: "/example",
    element: <ExampleWrapper /> ,
  },
  {
    path: "/signin",
    element: <SignIn /> ,
  },
  {
    path: "/main",
    element:  <ProtectedRoute>
                <Main />
            </ProtectedRoute>,
  },
  
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
