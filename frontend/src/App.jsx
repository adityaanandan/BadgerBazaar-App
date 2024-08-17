import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, Router, RouterProvider} from 'react-router-dom'
import AppLayout from './layouts/AppLayout';
import HomePage  from './pages/HomePage';
const router = createBrowserRouter(
  createRoutesFromElements(
    
    <Route index element={<HomePage />} />
    
  )
);

const App = () => {
  return <RouterProvider router = {router} />;

}

export default App