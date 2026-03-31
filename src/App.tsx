import { type Component, createTrackedEffect } from "solid-js";
import { SimpleRouter, SimpleRoute } from "./router";
import { SplashScreen } from "@capacitor/splash-screen";
import { sampleData } from "./data/sampleData";

import HomePage from "./pages/HomePage";
import LearnPage from "./pages/LearnPage";
import CoursePage from "./pages/CoursePage";
import LessonPage from "./pages/LessonPage";
import StatsPage from "./pages/StatsPage";
import ProgressPage from "./pages/ProgressPage";
import UploadPage from "./pages/UploadPage";
import QuizPage from "./pages/QuizPage";

const seedData = () => {
  localStorage.clear();
  const subjects = [{ ...sampleData, id: "1" }];
  localStorage.setItem("edutrack_subjects", JSON.stringify(subjects));
};

seedData();

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
        <SimpleRoute path="/quiz/:subjectId/:lessonId" component={() => <QuizPage />} />
        <SimpleRoute path="/stats/:subjectId" component={() => <StatsPage />} />
        <SimpleRoute path="/progress" component={() => <ProgressPage />} />
        <SimpleRoute path="/upload" component={() => <UploadPage />} />
      </div>
    </SimpleRouter>
  );
};

export default App;
