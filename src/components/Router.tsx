import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import RoomsPage from '@/components/pages/RoomsPage';
import AmenitiesPage from '@/components/pages/AmenitiesPage';
import DiningPage from '@/components/pages/DiningPage';
import AttractionsPage from '@/components/pages/AttractionsPage';
import OffersPage from '@/components/pages/OffersPage';
import PoliciesPage from '@/components/pages/PoliciesPage';
import RatingsPage from '@/components/pages/RatingsPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "rooms",
        element: <RoomsPage />,
      },
      {
        path: "amenities",
        element: <AmenitiesPage />,
      },
      {
        path: "dining",
        element: <DiningPage />,
      },
      {
        path: "attractions",
        element: <AttractionsPage />,
      },
      {
        path: "offers",
        element: <OffersPage />,
      },
      {
        path: "policies",
        element: <PoliciesPage />,
      },
      {
        path: "ratings",
        element: <RatingsPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
