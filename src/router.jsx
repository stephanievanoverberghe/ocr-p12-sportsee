import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Profile from './pages/Profile/index';
import Error from './pages/ErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/user/:id',
        element: <Profile />,
      },
      {
        path: '/404',
        element: <Error />,
      },
      {
        path: '*',
        element: <Error />,
      },
    ],
  },
]);
