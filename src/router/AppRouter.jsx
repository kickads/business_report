import { createBrowserRouter } from 'react-router-dom';
import {
  ConsolidatedDetail,
  ConsolidatedMonths,
  CreateMonthData,
  Home
} from '../views';

export const appRouter = createBrowserRouter([ {
  path: '/',
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
      element: <ConsolidatedDetail />
    }
  ]
} ]);