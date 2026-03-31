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
    <div class="min-h-screen bg-white pb-28">
      {/* Progress Bar */}
      <div class="fixed top-0 left-0 right-0 h-1.5 bg-gray-100 z-50">
        <div
          class="h-full bg-green-500 transition-all duration-150 rounded-r-full"
          style={{ width: `${scrollProgress()}%` }}
        />
      </div>

      {/* Header */}
      <div class="sticky top-1.5 bg-white/95 backdrop-blur-sm px-5 pt-5 pb-3 border-b border-gray-100 z-40">
        <div class="max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            class="p-2 -ml-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ArrowLeft size={22} class="text-gray-700" />
          </button>
          <div class="flex-1 min-w-0">
            <h1 class="text-base font-bold text-gray-900 truncate">
              {currentLesson()?.title || "Loading..."}
            </h1>
            <p class="text-xs text-gray-500">{currentLesson()?.duration || ""} read</p>
          </div>
          <Show when={isRead()}>
            <span class="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">
              Completed
            </span>
          </Show>
        </div>
      </div>

      {/* Content */}
      <div class="max-w-2xl mx-auto px-5 mt-6">
        <div class="flex items-center gap-2 mb-6">
          <BookOpen size={18} class="text-blue-500" />
          <span class="text-sm text-gray-500">
            Estimated read time: {currentLesson()?.duration}
          </span>
        </div>

        <div class="prose prose-gray max-w-none">
          <For each={lessonParagraphs()}>
            {(para) => <p class="text-gray-700 leading-relaxed mb-4 text-[15px]">{para()}</p>}
          </For>
        </div>
      </div>

      {/* Bottom Action */}
      <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-40">
        <div class="max-w-2xl mx-auto">
          <Show
            when={isPracticeLesson()}
            fallback={
              <>
                <button
                  onClick={() => navigate(`/quiz/${params().subjectId}/${params().lessonId}`)}
                  class={{
                    "w-full py-3.5 rounded-xl font-semibold bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 active:scale-95": true,
                    "animate-pulse ring-2 ring-blue-300 ring-offset-2": atBottom(),
                  }}
                >
                  Take Quiz →
                </button>
                <Show when={!isRead()}>
                  <p class="text-[10px] text-gray-400 text-center mt-2">
                    Score 70% or above to complete this lesson
                  </p>
                </Show>
              </>
            }
          >
            <button
              onClick={markAsDone}
              class={{
                "w-full py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2": true,
                "bg-gray-200 text-gray-500 cursor-default": isRead(),
                "bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/25 active:scale-95":
                  !isRead(),
                "animate-pulse ring-2 ring-green-300 ring-offset-2": !isRead() && atBottom(),
              }}
              disabled={isRead()}
            >
              <Show when={isRead()} fallback="Mark as Done">
                <CheckCircle size={18} /> Done
              </Show>
            </button>
          </Show>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
