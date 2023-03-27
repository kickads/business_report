import { RouterProvider } from 'react-router-dom';
import { appRouter } from '../router/AppRouter';

export function ReactRouterProvider({ children }) {
  return (
    <RouterProvider router={ appRouter }>
      { children }
    </RouterProvider>
  );
}