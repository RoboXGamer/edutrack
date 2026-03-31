import { createSignal, createMemo, For, Show, createTrackedEffect } from "solid-js";
import { useNavigate, useParams } from "../router";
import { ArrowLeft, BookOpen, CheckCircle } from "../components/Icons";

const LessonPage = () => {
  const navigate = useNavigate();
  const params = createMemo(() => useParams());
  const [lesson, setLesson] = createSignal<any>(null);
  const [isRead, setIsRead] = createSignal(false);
  const [scrollProgress, setScrollProgress] = createSignal(0);
  const [atBottom, setAtBottom] = createSignal(false);

  const currentLesson = createMemo(() => lesson());
  const lessonParagraphs = createMemo(() => {
    const current = currentLesson();
    if (!current?.content) return [];
    return current.content.split("\n").filter((p: string) => p.trim());
  });
  const isPracticeLesson = createMemo(() => {
    const current = currentLesson();
    return (
      current?.type === "practice" || current?.title?.toLowerCase().includes("practice") || false
    );
  });

  const nextLesson = createMemo(() => {
    const subjectId = params().subjectId;
    const lessonId = parseInt(params().lessonId);
    const stored = JSON.parse(localStorage.getItem("edutrack_subjects") || "[]");
    const found = stored.find((s: any) => s.id === subjectId);
    if (!found) return null;

    const allLessons: any[] = [];
    for (const u of found.courseData.units) {
      for (const l of u.lessons) {
        allLessons.push({ ...l, unitId: u.id });
      }
    }

    const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
    if (currentIndex === -1 || currentIndex >= allLessons.length - 1) return null;

    return allLessons[currentIndex + 1];
  });

  const nextIsQuiz = createMemo(() => {
    const next = nextLesson();
    if (!next) return false;
    return next.type === "practice" || next.title?.toLowerCase().includes("practice");
  });

  createTrackedEffect(() => {
    const subjectId = params().subjectId;
    const lessonIdStr = params().lessonId;
    const lessonId = parseInt(lessonIdStr);

    const stored = JSON.parse(localStorage.getItem("edutrack_subjects") || "[]");
    const found = stored.find((s: any) => s.id === subjectId);
    if (found) {
      for (const u of found.courseData.units) {
        const l = u.lessons.find((l: any) => l.id === lessonId);
        if (l) {
          setLesson(l);
          break;
        }
      }
    }

    const prog = JSON.parse(localStorage.getItem("edutrack_progress") || "{}");
    const subProg = prog[subjectId] || {};
    setIsRead((subProg.readLessons || []).includes(lessonId));

    // Track recently viewed
    const recent = JSON.parse(localStorage.getItem("edutrack_recent") || "[]");
    const filtered = recent.filter(
      (r: any) => !(r.subjectId === subjectId && r.lessonId === lessonId),
    );
    filtered.unshift({
      subjectId,
      lessonId,
      viewedAt: new Date().toISOString(),
    });
    localStorage.setItem("edutrack_recent", JSON.stringify(filtered.slice(0, 5)));

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 100;
      setScrollProgress(pct);
      setAtBottom(pct >= 95);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const markAsDone = () => {
    if (isRead()) return;
    const subjectId = params().subjectId;
    const lessonId = parseInt(params().lessonId);

    const prog = JSON.parse(localStorage.getItem("edutrack_progress") || "{}");
    if (!prog[subjectId]) {
      prog[subjectId] = { readLessons: [], quizScores: {}, lastAccessed: null };
    }

    if (!prog[subjectId].readLessons.includes(lessonId)) {
      prog[subjectId].readLessons.push(lessonId);

      // Update daily goal
      const today = new Date().toISOString().split("T")[0];
      const dailyJSON = localStorage.getItem("edutrack_daily");
      let daily = dailyJSON ? JSON.parse(dailyJSON) : { date: today, done: 0 };

      if (daily.date !== today) {
        daily = { date: today, done: 1 };
      } else {
        daily.done = (daily.done || 0) + 1;
      }
      localStorage.setItem("edutrack_daily", JSON.stringify(daily));
    }

    prog[subjectId].lastAccessed = new Date().toISOString();
    localStorage.setItem("edutrack_progress", JSON.stringify(prog));
    setIsRead(true);
  };

  return (
    <div class="min-h-screen bg-background pb-24 md:pb-28 lg:pb-32">
      {/* Progress Bar */}
      <div class="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
        <div
          class="h-full bg-success transition-all duration-150 rounded-r-full"
          style={{ width: `${scrollProgress()}%` }}
        />
      </div>

      {/* Header */}
      <div class="sticky top-0 bg-card/95 backdrop-blur-md px-3 sm:px-5 md:px-8 pt-3 sm:pt-4 pb-2.5 sm:pb-3 border-b border-border z-40 shadow-sm">
        <div class="max-w-3xl mx-auto flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => navigate(`/course/${params().subjectId}`)}
            aria-label="Go back"
            class="p-1.5 -ml-1 hover:bg-muted rounded-lg transition-all active:scale-90 shrink-0"
          >
            <ArrowLeft size={20} class="text-foreground sm:w-5 sm:h-5" />
          </button>
          <div class="flex-1 min-w-0">
            <h1 class="text-xs sm:text-sm md:text-base font-extrabold text-foreground truncate tracking-tight">
              {currentLesson()?.title || "Loading..."}
            </h1>
            <p class="text-[9px] sm:text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-0.5">
              {currentLesson()?.duration || ""} READ
            </p>
          </div>
          <Show when={isRead()}>
            <div class="flex items-center gap-1 bg-success/10 text-success px-2 sm:px-2.5 py-1 rounded-full border border-success/20 shadow-sm shrink-0">
              <CheckCircle size={12} fill="currentColor" class="opacity-20" />
              <span class="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">Done</span>
            </div>
          </Show>
        </div>
      </div>

      {/* Content Container */}
      <div class="max-w-3xl mx-auto px-3 sm:px-5 md:px-8 mt-4 sm:mt-6 md:mt-8">
        <div class="flex items-center gap-2 mb-4 sm:mb-6 bg-brand/10 p-2.5 rounded-xl border border-brand/20 w-fit">
          <BookOpen size={16} class="text-brand sm:w-4 sm:h-4" />
          <span class="text-xs sm:text-sm font-semibold text-brand">
            Read time: {currentLesson()?.duration}
          </span>
        </div>

        <article class="space-y-3 sm:space-y-4">
          <For each={lessonParagraphs()}>
            {(para) => (
              <p class="text-foreground/90 leading-relaxed text-sm sm:text-base tracking-normal font-normal">
                {para()}
              </p>
            )}
          </For>
        </article>
      </div>

      {/* Bottom Action */}
      <div class="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-lg border-t border-border p-3 sm:p-4 z-40 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        <div class="max-w-3xl mx-auto">
          <Show
            when={isPracticeLesson()}
            fallback={
              <Show
                when={nextIsQuiz()}
                fallback={
                  <button
                    onClick={() => {
                      markAsDone();
                      const next = nextLesson();
                      if (next) {
                        navigate(`/lesson/${params().subjectId}/${next.id}`);
                      }
                    }}
                    class="w-full py-2.5 sm:py-3 rounded-xl font-semibold bg-brand text-brand-foreground hover:brightness-110 shadow-lg shadow-brand/20 transition-all flex items-center justify-center gap-2 active:scale-95 text-sm"
                  >
                    Continue →
                  </button>
                }
              >
                <button
                  onClick={() => {
                    markAsDone();
                    const next = nextLesson();
                    if (next) {
                      navigate(`/quiz/${params().subjectId}/${next.id}`);
                    }
                  }}
                  class={{
                    "w-full py-2.5 sm:py-3 rounded-xl font-semibold bg-brand text-brand-foreground hover:brightness-110 shadow-lg shadow-brand/20 transition-all flex items-center justify-center gap-2 active:scale-95 text-sm": true,
                    "animate-pulse ring-2 ring-brand/30 ring-offset-2 ring-offset-background":
                      atBottom(),
                  }}
                >
                  Take Quiz →
                </button>
                <Show when={!isRead()}>
                  <p class="text-[10px] text-muted-foreground text-center mt-1.5">
                    Score 70% or above to complete this lesson
                  </p>
                </Show>
              </Show>
            }
          >
            <button
              onClick={markAsDone}
              class={{
                "w-full py-2.5 sm:py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-sm": true,
                "bg-muted text-muted-foreground cursor-default": isRead(),
                "bg-success text-success-foreground hover:brightness-110 shadow-lg shadow-success/20 active:scale-95":
                  !isRead(),
                "animate-pulse ring-2 ring-success/30 ring-offset-2 ring-offset-background":
                  !isRead() && atBottom(),
              }}
              disabled={isRead()}
            >
              <Show when={isRead()} fallback="Mark as Done">
                <CheckCircle size={16} /> Done
              </Show>
            </button>
          </Show>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
