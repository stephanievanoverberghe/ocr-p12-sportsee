/**
 * Configuration des routes de l'application avec React Router.
 *
 * @file
 */

import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Profile from './pages/Profile/index';
import Error from './pages/ErrorPage';

/**
 * Routeur de l'application.
 *
 * @constant {Object} router
 */
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
