import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { SceneLearningPage } from "./pages/SceneLearningPage";
import { PronunciationPage } from "./pages/PronunciationPage";
import { CultureCardPage } from "./pages/CultureCardPage";
import { ProfilePage } from "./pages/ProfilePage";

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
    Component: ProfilePage,
  },
]);
