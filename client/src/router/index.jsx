import { createBrowserRouter } from "react-router-dom";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import ProtectedRoute from "@/components/ProtectedRoute";
import GuestRoute from "@/components/GuestRoute";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import HomePage from "@/pages/home/HomePage";
import JobsPage from "@/pages/job/JobsPage";
import JobDetailsPage from "@/pages/job/JobDetailsPage";
import PostJobPage from "@/pages/job/PostJobPage";
import MyJobsPage from "@/pages/job/MyJobsPage";
import ApplyPage from "@/pages/application/ApplyPage";
import MyApplicationsPage from "@/pages/application/MyApplicationsPage";
import NotFoundPage from "@/pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWrapper />,
    children: [
      { path: "login", element: <GuestRoute><LoginPage /></GuestRoute> },
      { path: "register", element: <GuestRoute><RegisterPage /></GuestRoute> },
      { path: "", element: <ProtectedRoute><HomePage /></ProtectedRoute> },
      { path: "job/getall", element: <ProtectedRoute><JobsPage /></ProtectedRoute> },
      { path: "job/post", element: <ProtectedRoute><PostJobPage /></ProtectedRoute> },
      { path: "job/me", element: <ProtectedRoute><MyJobsPage /></ProtectedRoute> },
      { path: "job/:id", element: <ProtectedRoute><JobDetailsPage /></ProtectedRoute> },
      { path: "application/:id", element: <ProtectedRoute><ApplyPage /></ProtectedRoute> },
      { path: "applications/me", element: <ProtectedRoute><MyApplicationsPage /></ProtectedRoute> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
