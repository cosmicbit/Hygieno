import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Home from './Home';
import CollectorHome from './pages/CollectorHome';
import DisposerHome from './pages/DisposerHome';
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import About from './pages/About'

const router = createBrowserRouter(
  [
    {
      path:"/",
      element: <Home/>
    },
    {
      path:"/login",
      element: <Login/>
    },{
      path:"/about",
      element: <About/>
    },
    {
      path:"/signup",
      element:<SignUp/>
    },
    {
      path:"/pages/collectorHome",
      element: <CollectorHome/>
    },
    {
      path:"/pages/disposerHome",
      element:<DisposerHome />
    }
  ]
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);


