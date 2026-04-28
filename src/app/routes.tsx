import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { SceneLearningPage } from "./pages/SceneLearningPage";
import { PronunciationPage } from "./pages/PronunciationPage";
import { CultureCardPage } from "./pages/CultureCardPage";
import { ProfilePage } from "./pages/ProfilePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/scene-learning",
    Component: SceneLearningPage,
  },
  {
    path: "/pronunciation",
    Component: PronunciationPage,
  },
  {
    path: "/culture-card",
    Component: CultureCardPage,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
]);
