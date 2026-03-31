import { createSignal, createMemo, type Component, For, Show, createTrackedEffect } from "solid-js";
import { useNavigate, useParams } from "../router";
import {
  ArrowLeft,
  BarChart3,
  ChevronDown,
  ChevronUp,
  FileText,
  CheckCircle2,
} from "../components/Icons";
import BottomNav from "../components/BottomNav";

const CoursePage: Component = () => {
  const navigate = useNavigate();
  const params = createMemo(() => useParams());
  const [subject, setSubject] = createSignal<any>(null);
  const [expandedUnits, setExpandedUnits] = createSignal<Record<string, boolean>>({});
  const [progress, setProgress] = createSignal<{
    readLessons: any[];
    quizScores: Record<string, any>;
  }>({
    readLessons: [],
    quizScores: {},
  });

  const currentSubject = createMemo(() => subject());
  const unitList = createMemo(() => currentSubject()?.courseData?.units || []);
  const readLessons = createMemo(() => progress().readLessons || []);

  createTrackedEffect(() => {
    const subjectId = params().subjectId;
    const stored = JSON.parse(localStorage.getItem("edutrack_subjects") || "[]");
    const found = stored.find((s: any) => s.id === subjectId);
    if (found) {
      setSubject(found);
      // Expand first unit by default
      if (found.courseData?.units?.[0]) {
        setExpandedUnits({ [found.courseData.units[0].id]: true });
      }
    }
    const prog = JSON.parse(localStorage.getItem("edutrack_progress") || "{}");
    if (prog[subjectId]) setProgress(prog[subjectId]);
  });

  const toggleUnit = (unitId: string | number) => {
    setExpandedUnits((prev) => ({ ...prev, [unitId]: !prev[unitId] }));
  };

  const isRead = (lessonId: any) => readLessons().includes(lessonId);

  const getUnitProgress = (unit: any) => {
    const readCount = unit.lessons.filter((l: any) => isRead(l.id)).length;
    return { read: readCount, total: unit.lessons.length };
  };

  return (
    <div class="pb-20 sm:pb-24 md:pb-28 bg-background min-h-screen">
      {/* Header */}
      <div class="bg-card px-3 sm:px-5 md:px-8 pt-4 sm:pt-6 pb-4 shadow-sm border-b border-border">
        <div class="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            aria-label="Go back"
            class="p-2 -ml-1.5 hover:bg-muted rounded-xl transition-all active:scale-90"
          >
            <ArrowLeft size={20} class="text-foreground sm:w-5 sm:h-5" />
          </button>
          <h1 class="text-base sm:text-lg md:text-xl font-extrabold text-foreground truncate px-2 tracking-tight">
            {currentSubject()?.name || "Loading..."}
          </h1>
          <button
            onClick={() => navigate(`/stats/${params().subjectId}`)}
            aria-label="View statistics"
            class="p-2 -mr-1.5 hover:bg-muted rounded-xl transition-all active:scale-90"
          >
            <BarChart3 size={20} class="text-brand sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      <Show
        when={currentSubject()}
        fallback={
          <div class="flex justify-center pt-16 text-muted-foreground text-sm font-medium">
            Loading course...
          </div>
        }
      >
        <div class="max-w-3xl mx-auto px-3 sm:px-5 md:px-8 mt-4 md:mt-6 space-y-3">
          <For each={unitList()}>
            {(unit) => {
              const unitProg = () => getUnitProgress(unit());
              const isExpanded = () => expandedUnits()[unit().id];

              return (
                <div class="bg-card rounded-xl sm:rounded-2xl shadow-card border border-border overflow-hidden transition-all duration-200 hover:shadow-card-hover hover:border-brand/20">
                  <button
                    onClick={() => toggleUnit(unit().id)}
                    class="w-full px-3.5 sm:px-4 py-3.5 sm:py-4 flex items-center gap-3 text-left hover:bg-muted/50 transition-colors active:bg-muted"
                  >
                    <div class="w-9 h-9 sm:w-10 sm:h-10 bg-muted rounded-xl flex items-center justify-center text-lg sm:text-xl shadow-inner border border-border shrink-0">
                      {unit().icon}
                    </div>
                    <div class="flex-1 min-w-0">
                      <h3 class="font-bold text-foreground text-sm tracking-tight">
                        {unit().name}
                      </h3>
                      <p class="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-0.5">
                        UNIT {unit().id} • {unit().lessons.length} LESSONS
                        <Show when={unitProg().read > 0}>
                          <span class="text-success ml-1">
                            ({unitProg().read}/{unitProg().total} DONE)
                          </span>
                        </Show>
                      </p>
                    </div>
                    <Show
                      when={isExpanded()}
                      fallback={<ChevronDown size={18} class="text-muted-foreground shrink-0" />}
                    >
                      <ChevronUp size={18} class="text-muted-foreground shrink-0" />
                    </Show>
                  </button>

                  <Show when={isExpanded()}>
                    <div class="border-t border-border bg-card/50">
                      <For each={unit().lessons}>
                        {(lesson, idx) => {
                          const read = () => isRead(lesson().id);
                          const isPractice = () => lesson().type === "practice";

                          return (
                            <button
                              onClick={() =>
                                navigate(
                                  isPractice()
                                    ? `/quiz/${params().subjectId}/${lesson().id}`
                                    : `/lesson/${params().subjectId}/${lesson().id}`,
                                )
                              }
                              class="w-full px-4 sm:px-5 py-3 sm:py-3.5 flex items-center gap-3 text-left hover:bg-muted/80 transition-all border-t border-border first:border-t-0 active:bg-muted group"
                            >
                              <Show
                                when={read()}
                                fallback={
                                  <Show
                                    when={isPractice()}
                                    fallback={
                                      <div
                                        class={{
                                          "w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-black transition-all group-hover:scale-110 shadow-sm border": true,
                                          "bg-brand text-brand-foreground border-brand": !read(),
                                          "bg-muted text-muted-foreground border-border": read(),
                                        }}
                                      >
                                        {idx() + 1}
                                      </div>
                                    }
                                  >
                                    <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                      <FileText
                                        size={14}
                                        class="text-muted-foreground sm:w-4 sm:h-4"
                                      />
                                    </div>
                                  </Show>
                                }
                              >
                                <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-success border border-success/80 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                  <CheckCircle2
                                    size={16}
                                    class="text-success-foreground sm:w-4 sm:h-4"
                                  />
                                </div>
                              </Show>

                              <div class="flex-1 min-w-0">
                                <p
                                  class={{
                                    "text-xs sm:text-sm font-bold tracking-tight transition-colors": true,
                                    "text-muted-foreground": read(),
                                    "text-foreground group-hover:text-brand": !read(),
                                  }}
                                >
                                  {lesson().title}
                                </p>
                              </div>

                              <span class="text-[10px] font-black text-muted-foreground uppercase tracking-tighter shrink-0">
                                {isPractice() ? `${lesson().mcqs} Qs` : lesson().duration}
                              </span>
                            </button>
                          );
                        }}
                      </For>
                    </div>
                  </Show>
                </div>
              );
            }}
          </For>
        </div>
      </Show>

      <BottomNav active="learn" />
    </div>
  );
};

export default CoursePage;
