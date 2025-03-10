import { createHashRouter, Navigate } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { LoginPage } from "./pages/LoginPage";
import { PatientsPage } from "./pages/PatientsPage";
import { PatientCreatePage } from "./pages/PatientCreatePage";
import { PatientEditPage } from "./pages/PatientEditPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

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
    ],
  },
]);
