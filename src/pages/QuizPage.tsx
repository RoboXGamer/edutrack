import { createSignal, createMemo, type Component, For, Show, createTrackedEffect } from "solid-js";
import { useNavigate, useParams } from "../router";
import { ArrowLeft, CheckCircle2, X, RefreshCw, Trophy, TrendingUp } from "../components/Icons";

type Question = {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

type QuizState = "intro" | "playing" | "review" | "results";

const QuizPage: Component = () => {
  const navigate = useNavigate();
  const params = createMemo(() => useParams());
  const [questions, setQuestions] = createSignal<Question[]>([]);
  const [lessonTitle, setLessonTitle] = createSignal("");
  const [quizState, setQuizState] = createSignal<QuizState>("intro");
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [answers, setAnswers] = createSignal<Record<number, number>>({});
  const [selectedOption, setSelectedOption] = createSignal<number | null>(null);
  const [showExplanation, setShowExplanation] = createSignal(false);
  const [startTime, setStartTime] = createSignal(0);
  const [elapsed, setElapsed] = createSignal(0);

  const totalQuestions = createMemo(() => questions().length);
  const answeredCount = createMemo(() => Object.keys(answers()).length);
  const correctCount = createMemo(() => {
    return questions().reduce((count, q) => {
      return answers()[q.id] === q.correct ? count + 1 : count;
    }, 0);
  });
  const scorePercent = createMemo(() => {
    const total = totalQuestions();
    if (total === 0) return 0;
    return Math.round((correctCount() / total) * 100);
  });
  const currentQuestion = createMemo(() => questions()[currentIndex()]);
  const isCorrect = createMemo(() => {
    const q = currentQuestion();
    if (!q) return false;
    return answers()[q.id] === q.correct;
  });

  createTrackedEffect(() => {
    const subjectId = params().subjectId;
    const lessonId = parseInt(params().lessonId);

    const stored = JSON.parse(localStorage.getItem("edutrack_subjects") || "[]");
    const subject = stored.find((s: any) => s.id === subjectId);
    if (!subject) return;

    let foundLesson: any = null;
    for (const u of subject.courseData.units) {
      const l = u.lessons.find((l: any) => l.id === lessonId);
      if (l) {
        foundLesson = l;
        break;
      }
    }

    if (foundLesson && foundLesson.questions && foundLesson.questions.length > 0) {
      setQuestions(foundLesson.questions);
      setLessonTitle(foundLesson.title);
    } else {
      setQuestions(generateFallbackQuestions(foundLesson?.title || "Practice"));
      setLessonTitle(foundLesson?.title || "Practice");
    }

    setQuizState("intro");
    setCurrentIndex(0);
    setAnswers({});
    setSelectedOption(null);
    setShowExplanation(false);
  });

  function generateFallbackQuestions(title: string): Question[] {
    return [
      {
        id: 1,
        question: `What is the main topic of "${title}"?`,
        options: [
          "Historical events",
          "Scientific concepts",
          "Geographical facts",
          "Cultural practices",
        ],
        correct: 0,
        explanation:
          "This is a placeholder question. Add specific questions to your lesson data for accurate quizzes.",
      },
      {
        id: 2,
        question: `Which period does "${title}" cover?`,
        options: ["Ancient", "Medieval", "Modern", "Contemporary"],
        correct: 0,
        explanation: "This is a placeholder question. Add specific questions to your lesson data.",
      },
      {
        id: 3,
        question: `What is a key takeaway from "${title}"?`,
        options: [
          "Understanding historical context",
          "Memorizing dates only",
          "Ignoring primary sources",
          "Focusing on one region",
        ],
        correct: 0,
        explanation: "Understanding historical context is crucial for comprehensive learning.",
      },
      {
        id: 4,
        question: `Why is "${title}" important to study?`,
        options: [
          "It builds foundational knowledge",
          "It is not important",
          "Only for exams",
          "No practical use",
        ],
        correct: 0,
        explanation: "Every topic builds foundational knowledge that helps in advanced studies.",
      },
      {
        id: 5,
        question: `Which skill does studying "${title}" develop?`,
        options: ["Critical thinking", "Rote memorization", "Guessing", "None"],
        correct: 0,
        explanation: "Studying any topic develops critical thinking and analytical skills.",
      },
    ];
  }

  const startQuiz = () => {
    setQuizState("playing");
    setStartTime(Date.now());
  };

  const selectAnswer = (optionIdx: number) => {
    if (showExplanation()) return;
    setSelectedOption(optionIdx);
    setShowExplanation(true);

    const q = currentQuestion();
    if (q) {
      setAnswers((prev) => ({ ...prev, [q.id]: optionIdx }));
    }
  };

  const nextQuestion = () => {
    if (currentIndex() < totalQuestions() - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setElapsed(Math.round((Date.now() - startTime()) / 1000));
      setQuizState("results");
      saveResults();
    }
  };

  const prevQuestion = () => {
    if (currentIndex() > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };

  const saveResults = () => {
    const subjectId = params().subjectId;
    const lessonId = parseInt(params().lessonId);
    const prog = JSON.parse(localStorage.getItem("edutrack_progress") || "{}");
    if (!prog[subjectId]) {
      prog[subjectId] = { readLessons: [], quizScores: {}, lastAccessed: null };
    }
    prog[subjectId].quizScores = prog[subjectId].quizScores || {};
    prog[subjectId].quizScores[lessonId] = {
      score: scorePercent(),
      correct: correctCount(),
      total: totalQuestions(),
      attempts: (prog[subjectId].quizScores[lessonId]?.attempts || 0) + 1,
      bestScore: Math.max(prog[subjectId].quizScores[lessonId]?.bestScore || 0, scorePercent()),
      lastAttempt: new Date().toISOString(),
    };

    if (scorePercent() >= 70) {
      if (!prog[subjectId].readLessons.includes(lessonId)) {
        prog[subjectId].readLessons.push(lessonId);
      }
    }

    prog[subjectId].lastAccessed = new Date().toISOString();
    localStorage.setItem("edutrack_progress", JSON.stringify(prog));

    const today = new Date().toISOString().split("T")[0];
    const dailyJSON = localStorage.getItem("edutrack_daily");
    let daily = dailyJSON ? JSON.parse(dailyJSON) : { date: today, done: 0 };
    if (daily.date !== today) {
      daily = { date: today, done: 1 };
    } else {
      daily.done = (daily.done || 0) + 1;
    }
    localStorage.setItem("edutrack_daily", JSON.stringify(daily));
  };

  const retryQuiz = () => {
    setCurrentIndex(0);
    setAnswers({});
    setSelectedOption(null);
    setShowExplanation(false);
    setQuizState("playing");
    setStartTime(Date.now());
  };

  const goToLesson = () => {
    navigate(`/lesson/${params().subjectId}/${params().lessonId}`);
  };

  const goToCourse = () => {
    navigate(`/course/${params().subjectId}`);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const getGrade = () => {
    const pct = scorePercent();
    if (pct >= 90) return { label: "Excellent!", emoji: "🏆", color: "text-yellow-500" };
    if (pct >= 70) return { label: "Great Job!", emoji: "🌟", color: "text-green-500" };
    if (pct >= 50) return { label: "Good Effort!", emoji: "👍", color: "text-blue-500" };
    return { label: "Keep Trying!", emoji: "💪", color: "text-orange-500" };
  };

  return (
    <div class="min-h-screen bg-background pb-8">
      <div class="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
        <div
          class="h-full bg-brand transition-all duration-300 rounded-r-full"
          style={{
            width:
              quizState() === "playing"
                ? `${((currentIndex() + 1) / totalQuestions()) * 100}%`
                : "100%",
          }}
        />
      </div>

      <div class="sticky top-0 bg-card/95 backdrop-blur-md px-3 sm:px-5 md:px-8 pt-3 sm:pt-4 pb-2.5 sm:pb-3 border-b border-border z-40 shadow-sm">
        <div class="max-w-3xl mx-auto flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={quizState() === "results" ? goToCourse : goToLesson}
            aria-label="Go back"
            class="p-1.5 -ml-1 hover:bg-muted rounded-lg transition-all active:scale-90 shrink-0"
          >
            <ArrowLeft size={20} class="text-foreground sm:w-5 sm:h-5" />
          </button>
          <div class="flex-1 min-w-0">
            <h1 class="text-xs sm:text-sm md:text-base font-extrabold text-foreground truncate tracking-tight">
              {quizState() === "results"
                ? "Quiz Results"
                : quizState() === "intro"
                  ? "Quiz"
                  : lessonTitle()}
            </h1>
            <Show when={quizState() === "playing"}>
              <p class="text-[9px] sm:text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-0.5">
                Question {currentIndex() + 1} of {totalQuestions()}
              </p>
            </Show>
          </div>
          <Show when={quizState() === "playing"}>
            <div class="flex items-center gap-1 bg-brand/10 text-brand px-2 sm:px-2.5 py-1 rounded-full border border-brand/20 shadow-sm shrink-0">
              <span class="text-[9px] sm:text-[10px] font-bold">
                {answeredCount()}/{totalQuestions()}
              </span>
            </div>
          </Show>
        </div>
      </div>

      <div class="max-w-3xl mx-auto px-3 sm:px-5 md:px-8 mt-4 sm:mt-6 md:mt-8">
        <Show when={quizState() === "intro"}>
          <div class="bg-card rounded-2xl border border-border shadow-sm p-6 sm:p-8 text-center space-y-6">
            <div class="text-5xl sm:text-6xl">📝</div>
            <div>
              <h2 class="text-xl sm:text-2xl font-extrabold text-foreground mb-2">
                Quiz: {lessonTitle()}
              </h2>
              <p class="text-sm text-muted-foreground">
                Test your knowledge with {totalQuestions()} questions
              </p>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div class="bg-muted rounded-xl p-3">
                <p class="text-lg font-black text-foreground">{totalQuestions()}</p>
                <p class="text-[10px] font-semibold text-muted-foreground uppercase">Questions</p>
              </div>
              <div class="bg-muted rounded-xl p-3">
                <p class="text-lg font-black text-foreground">70%</p>
                <p class="text-[10px] font-semibold text-muted-foreground uppercase">Pass Score</p>
              </div>
              <div class="bg-muted rounded-xl p-3">
                <p class="text-lg font-black text-foreground">⭐</p>
                <p class="text-[10px] font-semibold text-muted-foreground uppercase">XP Reward</p>
              </div>
            </div>

            <div class="bg-brand/5 border border-brand/20 rounded-xl p-4 text-left">
              <p class="text-xs font-bold text-brand mb-1">Instructions</p>
              <ul class="text-xs text-muted-foreground space-y-1">
                <li>• Read each question carefully before answering</li>
                <li>• You can review explanations after selecting an answer</li>
                <li>• Score 70% or above to complete this lesson</li>
                <li>• You can retry the quiz to improve your score</li>
              </ul>
            </div>

            <button
              onClick={startQuiz}
              class="w-full py-3 sm:py-4 bg-brand text-brand-foreground rounded-xl font-bold text-sm sm:text-base shadow-lg shadow-brand/20 hover:brightness-110 transition-all active:scale-95"
            >
              Start Quiz
            </button>
          </div>
        </Show>

        <Show when={quizState() === "playing"}>
          <Show when={currentQuestion()}>
            {(q) => (
              <div class="space-y-4">
                <div class="bg-card rounded-2xl border border-border shadow-sm p-4 sm:p-6">
                  <div class="flex items-start gap-3 mb-4">
                    <div class="w-8 h-8 sm:w-9 sm:h-9 bg-brand text-brand-foreground rounded-xl flex items-center justify-center shrink-0 text-xs sm:text-sm font-black">
                      {currentIndex() + 1}
                    </div>
                    <h2 class="text-sm sm:text-base md:text-lg font-bold text-foreground leading-snug">
                      {q().question}
                    </h2>
                  </div>

                  <div class="space-y-2.5">
                    <For each={q().options}>
                      {(option, idx) => {
                        const isSelected = () => selectedOption() === idx();
                        const isCorrectOption = () => q().correct === idx();
                        const showResult = () => showExplanation();

                        return (
                          <button
                            onClick={() => selectAnswer(idx())}
                            disabled={showResult()}
                            class={{
                              "w-full text-left p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 text-sm sm:text-base": true,
                              "border-border bg-card hover:border-brand/50 hover:bg-brand/5":
                                !showResult(),
                              "border-success bg-success/10": showResult() && isCorrectOption(),
                              "border-red-500 bg-red-500/10":
                                showResult() && isSelected() && !isCorrectOption(),
                              "border-border bg-card opacity-60":
                                showResult() && !isSelected() && !isCorrectOption(),
                            }}
                          >
                            <div
                              class={{
                                "w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold border-2 transition-all": true,
                                "border-border text-muted-foreground": !showResult(),
                                "border-success bg-success text-success-foreground":
                                  showResult() && isCorrectOption(),
                                "border-red-500 bg-red-500 text-white":
                                  showResult() && isSelected() && !isCorrectOption(),
                                "border-border text-muted-foreground opacity-40":
                                  showResult() && !isSelected() && !isCorrectOption(),
                              }}
                            >
                              {showResult() && isCorrectOption() ? (
                                <CheckCircle2 size={16} />
                              ) : showResult() && isSelected() && !isCorrectOption() ? (
                                <X size={16} />
                              ) : (
                                String.fromCharCode(65 + idx())
                              )}
                            </div>
                            <span class="flex-1 font-medium">{option()}</span>
                          </button>
                        );
                      }}
                    </For>
                  </div>
                </div>

                <Show when={showExplanation()}>
                  <div
                    class={{
                      "rounded-xl border p-4 space-y-2 transition-all": true,
                      "bg-success/5 border-success/20": isCorrect(),
                      "bg-red-500/5 border-red-500/20": !isCorrect(),
                    }}
                  >
                    <div class="flex items-center gap-2">
                      <Show when={isCorrect()} fallback={<X size={18} class="text-red-500" />}>
                        <CheckCircle2 size={18} class="text-success" />
                      </Show>
                      <p
                        class={{
                          "text-sm font-bold": true,
                          "text-success": isCorrect(),
                          "text-red-500": !isCorrect(),
                        }}
                      >
                        {isCorrect() ? "Correct!" : "Incorrect"}
                      </p>
                    </div>
                    <p class="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {q().explanation}
                    </p>
                  </div>
                </Show>

                <Show when={showExplanation()}>
                  <div class="flex gap-3">
                    <Show when={currentIndex() > 0}>
                      <button
                        onClick={prevQuestion}
                        class="flex-1 py-3 bg-muted text-foreground rounded-xl font-semibold hover:bg-muted/80 transition-all active:scale-95 text-sm"
                      >
                        ← Previous
                      </button>
                    </Show>
                    <button
                      onClick={nextQuestion}
                      class="flex-1 py-3 bg-brand text-brand-foreground rounded-xl font-semibold shadow-lg shadow-brand/20 hover:brightness-110 transition-all active:scale-95 text-sm"
                    >
                      {currentIndex() < totalQuestions() - 1 ? "Next →" : "See Results"}
                    </button>
                  </div>
                </Show>

                <div class="flex flex-wrap gap-1.5 justify-center">
                  <For each={questions()}>
                    {(question, idx) => {
                      const answered = () => answers()[question().id] !== undefined;
                      const correct = () => answers()[question().id] === question().correct;
                      const isCurrent = () => idx() === currentIndex();

                      return (
                        <button
                          onClick={() => {
                            if (answered()) {
                              setCurrentIndex(idx());
                              setSelectedOption(answers()[question().id]);
                              setShowExplanation(true);
                            }
                          }}
                          class={{
                            "w-8 h-8 rounded-lg text-xs font-bold transition-all": true,
                            "bg-brand text-brand-foreground":
                              isCurrent() && answered() && correct(),
                            "bg-red-500 text-white": isCurrent() && answered() && !correct(),
                            "bg-muted text-muted-foreground": isCurrent() && !answered(),
                            "bg-success/20 text-success border border-success/30":
                              !isCurrent() && answered() && correct(),
                            "bg-red-500/20 text-red-500 border border-red-500/30":
                              !isCurrent() && answered() && !correct(),
                            "bg-muted/50 text-muted-foreground border border-border":
                              !isCurrent() && !answered(),
                          }}
                        >
                          {idx() + 1}
                        </button>
                      );
                    }}
                  </For>
                </div>
              </div>
            )}
          </Show>
        </Show>

        <Show when={quizState() === "results"}>
          <div class="space-y-4">
            <div class="bg-card rounded-2xl border border-border shadow-sm p-6 sm:p-8 text-center space-y-4">
              <div class="text-5xl sm:text-6xl">{getGrade().emoji}</div>
              <div>
                <h2 class={`text-xl sm:text-2xl font-extrabold mb-1 ${getGrade().color}`}>
                  {getGrade().label}
                </h2>
                <p class="text-sm text-muted-foreground">{lessonTitle()}</p>
              </div>

              <div class="flex items-center justify-center">
                <div class="relative w-32 h-32 sm:w-36 sm:h-36">
                  <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="hsl(var(--muted))"
                      stroke-width="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={scorePercent() >= 70 ? "hsl(var(--success))" : "hsl(var(--warning))"}
                      stroke-width="3"
                      stroke-dasharray={`${scorePercent()}, 100`}
                      stroke-linecap="round"
                      class="transition-all duration-1000"
                    />
                  </svg>
                  <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <span class="text-2xl sm:text-3xl font-black text-foreground">
                      {scorePercent()}%
                    </span>
                    <span class="text-[10px] font-semibold text-muted-foreground uppercase">
                      Score
                    </span>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-3">
                <div class="bg-muted rounded-xl p-3">
                  <p class="text-lg font-black text-foreground">{correctCount()}</p>
                  <p class="text-[10px] font-semibold text-muted-foreground uppercase">Correct</p>
                </div>
                <div class="bg-muted rounded-xl p-3">
                  <p class="text-lg font-black text-foreground">
                    {totalQuestions() - correctCount()}
                  </p>
                  <p class="text-[10px] font-semibold text-muted-foreground uppercase">Wrong</p>
                </div>
                <div class="bg-muted rounded-xl p-3">
                  <p class="text-lg font-black text-foreground">{formatTime(elapsed())}</p>
                  <p class="text-[10px] font-semibold text-muted-foreground uppercase">Time</p>
                </div>
              </div>

              <Show when={scorePercent() >= 70}>
                <div class="bg-success/10 border border-success/20 rounded-xl p-3 flex items-center gap-2">
                  <Trophy size={18} class="text-success shrink-0" />
                  <p class="text-xs font-bold text-success">
                    Lesson completed! Score above 70% - well done!
                  </p>
                </div>
              </Show>
              <Show when={scorePercent() < 70}>
                <div class="bg-warning/10 border border-warning/20 rounded-xl p-3 flex items-center gap-2">
                  <TrendingUp size={18} class="text-warning shrink-0" />
                  <p class="text-xs font-bold text-warning">
                    Need 70% to pass. Review the lesson and try again!
                  </p>
                </div>
              </Show>
            </div>

            <div class="flex gap-3">
              <button
                onClick={retryQuiz}
                class="flex-1 py-3 bg-muted text-foreground rounded-xl font-semibold hover:bg-muted/80 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm"
              >
                <RefreshCw size={16} /> Retry
              </button>
              <button
                onClick={goToLesson}
                class="flex-1 py-3 bg-brand text-brand-foreground rounded-xl font-semibold shadow-lg shadow-brand/20 hover:brightness-110 transition-all active:scale-95 text-sm"
              >
                Review Lesson
              </button>
            </div>

            <button
              onClick={goToCourse}
              class="w-full py-3 bg-card border border-border text-foreground rounded-xl font-semibold hover:bg-muted transition-all active:scale-95 text-sm"
            >
              Back to Course
            </button>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default QuizPage;
