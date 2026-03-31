import { type Component, createTrackedEffect } from "solid-js";
import { SimpleRouter, SimpleRoute } from "./router";
import { SplashScreen } from "@capacitor/splash-screen";

import HomePage from "./pages/HomePage";
import LearnPage from "./pages/LearnPage";
import CoursePage from "./pages/CoursePage";
import LessonPage from "./pages/LessonPage";

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
        {/* Placeholder routes - we will add these as we port pages */}
        <SimpleRoute path="/quiz/:subjectId/:lessonId" component={() => <div>Quiz Page</div>} />
        <SimpleRoute path="/stats/:subjectId" component={() => <div>Stats Page</div>} />
        <SimpleRoute path="/progress" component={() => <div>Progress Page</div>} />
      </div>
    </SimpleRouter>
  );
};

export default App;
