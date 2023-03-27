import { createBrowserRouter } from 'react-router-dom';
import {
  ConsolidatedMonthDetail,
  ConsolidatedMonths,
  CreateMonthData,
  Home
} from '../views';
import { PublicLayout } from '../layouts';

export const appRouter = createBrowserRouter([ {
  path: '/',
  element: <PublicLayout />,
  children: [
    {
      index: true,
      element: <Home />
    },
    {
      path: 'create',
      element: <CreateMonthData />
    },
    {
      path: 'consolidated/:year',
      element: <ConsolidatedMonths />
    },
    {
      path: 'consolidated/:year/:month',
      element: <ConsolidatedMonthDetail />
    }
  ]
} ]);