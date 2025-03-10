import { createHashRouter, Navigate } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { PatientsPage } from "./pages/PatientsPage";
import { PatientCreatePage } from "./pages/PatientCreatePage";
import { PatientEditPage } from "./pages/PatientEditPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UsersPage } from "./pages/UsersPage";
import { UserRole } from "./store/api/users";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const userRole = useSelector((state: RootState) => state.auth.user?.role);

  if (userRole !== UserRole.ADMIN) {
    return <Navigate to="/patients" replace />;
  }

  return <>{children}</>;
};

export const router = createHashRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/patients" replace />,
      },
      {
        path: "patients",
        element: <PatientsPage />,
      },
      {
        path: "patients/create",
        element: <PatientCreatePage />,
      },
      {
        path: "patients/:id/edit",
        element: <PatientEditPage />,
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <UsersPage />
          </AdminRoute>
        ),
      },
    ],
  },
]);
