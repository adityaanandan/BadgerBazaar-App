import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, Router, RouterProvider} from 'react-router-dom'
import AppLayout from './layouts/AppLayout';
import HomePage  from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';
import ItemsPage from './pages/ItemsPage';

const router = createBrowserRouter(
  createRoutesFromElements(


    <Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignupPage />} />


      
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/browse" element={<ItemsPage />} />
      </Route>
      


    </Route>
    
    
  )
);

const App = () => {
  return <RouterProvider router = {router} />;

}

export default App