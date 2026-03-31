import { type Component, createTrackedEffect } from "solid-js";
import { SimpleRouter, SimpleRoute } from "./router";
import { SplashScreen } from "@capacitor/splash-screen";

import HomePage from "./pages/HomePage";
import LearnPage from "./pages/LearnPage";
import CoursePage from "./pages/CoursePage";
import LessonPage from "./pages/LessonPage";
import StatsPage from "./pages/StatsPage";
import ProgressPage from "./pages/ProgressPage";

const App: Component = () => {
  createTrackedEffect(() => {
    // Hide splash screen after app mounts
    void SplashScreen.hide();
  });

  return (
    <SimpleRouter>
      <div class="min-h-screen bg-background font-sans transition-colors duration-300">
        <SimpleRoute path="/" component={() => <HomePage />} />
        <SimpleRoute path="/learn" component={() => <LearnPage />} />
        <SimpleRoute path="/course/:subjectId" component={() => <CoursePage />} />
        <SimpleRoute path="/lesson/:subjectId/:lessonId" component={() => <LessonPage />} />
        <SimpleRoute path="/quiz/:subjectId/:lessonId" component={() => <div>Quiz Page</div>} />
        <SimpleRoute path="/stats/:subjectId" component={() => <StatsPage />} />
        <SimpleRoute path="/progress" component={() => <ProgressPage />} />
      </div>
    </SimpleRouter>
  );
};

export default App;
