import { createSignal, createMemo, type Component, For, Show, createTrackedEffect } from "solid-js";
import { useNavigate, useParams } from "../router";
import { ArrowLeft, BarChart3, CheckCircle2, Clock, Trophy, TrendingUp } from "../components/Icons";
import BottomNav from "../components/BottomNav";

const StatsPage: Component = () => {
  const navigate = useNavigate();
  const params = createMemo(() => useParams());
  const [subject, setSubject] = createSignal<any>(null);
  const [progress, setProgress] = createSignal<{
    readLessons: any[];
    quizScores: Record<string, any>;
  }>({
    readLessons: [],
    quizScores: {},
  });

  createTrackedEffect(() => {
    const subjectId = params().subjectId;
    const stored = JSON.parse(localStorage.getItem("edutrack_subjects") || "[]");
    const found = stored.find((s: any) => s.id === subjectId);
    if (found) setSubject(found);

    const prog = JSON.parse(localStorage.getItem("edutrack_progress") || "{}");
    if (prog[subjectId]) setProgress(prog[subjectId]);
  });

  const unitList = createMemo(() => subject()?.courseData?.units || []);
  const readLessons = createMemo(() => progress().readLessons || []);

  const totalLessons = createMemo(() => {
    return unitList().reduce((sum: number, u: any) => sum + u.lessons.length, 0);
  });

  const completedLessons = createMemo(() => {
    let count = 0;
    unitList().forEach((unit: any) => {
      unit.lessons.forEach((lesson: any) => {
        if (readLessons().includes(lesson.id)) count++;
      });
    });
    return count;
  });

  const completionPct = createMemo(() => {
    const total = totalLessons();
    if (total === 0) return 0;
    return Math.round((completedLessons() / total) * 100);
  });

  const avgQuizScore = createMemo(() => {
    const scores = Object.values(progress().quizScores || {});
    if (scores.length === 0) return null;
    const sum = scores.reduce((acc: number, s: any) => acc + (s.score || 0), 0);
    return Math.round(sum / scores.length);
  });

  const unitStats = createMemo(() => {
    return unitList().map((unit: any) => {
      const readCount = unit.lessons.filter((l: any) => readLessons().includes(l.id)).length;
      return {
        name: unit.name,
        icon: unit.icon,
        total: unit.lessons.length,
        read: readCount,
        pct: unit.lessons.length > 0 ? Math.round((readCount / unit.lessons.length) * 100) : 0,
      };
    });
  });

  return (
    <div class="pb-20 sm:pb-24 md:pb-28 bg-background min-h-screen">
      {/* Header */}
      <div class="bg-card px-3 sm:px-5 md:px-8 pt-4 sm:pt-6 pb-4 shadow-sm border-b border-border">
        <div class="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(`/course/${params().subjectId}`)}
            aria-label="Go back"
            class="p-2 -ml-1.5 hover:bg-muted rounded-xl transition-all active:scale-90"
          >
            <ArrowLeft size={20} class="text-foreground sm:w-5 sm:h-5" />
          </button>
          <h1 class="text-base sm:text-lg md:text-xl font-extrabold text-foreground truncate px-2 tracking-tight">
            {subject()?.name || "Loading..."}
          </h1>
          <div class="p-2 -mr-1.5">
            <BarChart3 size={20} class="text-brand sm:w-5 sm:h-5" />
          </div>
        </div>
      </div>

      <Show
        when={subject()}
        fallback={
          <div class="flex justify-center pt-16 text-muted-foreground text-sm font-medium">
            Loading stats...
          </div>
        }
      >
        <div class="max-w-3xl mx-auto px-3 sm:px-5 md:px-8 mt-4 md:mt-6 space-y-4">
          {/* Overview Cards */}
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="bg-card p-4 border border-border shadow-card">
              <div class="flex items-center gap-2 text-brand mb-2">
                <TrendingUp size={16} />
                <span class="text-xs font-bold uppercase tracking-wider">Progress</span>
              </div>
              <p class="text-2xl font-black text-foreground">{completionPct()}%</p>
            </div>
            <div class="bg-card p-4 border border-border shadow-card">
              <div class="flex items-center gap-2 text-success mb-2">
                <CheckCircle2 size={16} />
                <span class="text-xs font-bold uppercase tracking-wider">Completed</span>
              </div>
              <p class="text-2xl font-black text-foreground">
                {completedLessons()}/{totalLessons()}
              </p>
            </div>
            <div class="bg-card p-4 border border-border shadow-card">
              <div class="flex items-center gap-2 text-brand mb-2">
                <Clock size={16} />
                <span class="text-xs font-bold uppercase tracking-wider">Remaining</span>
              </div>
              <p class="text-2xl font-black text-foreground">
                {totalLessons() - completedLessons()}
              </p>
            </div>
            <div class="bg-card p-4 border border-border shadow-card">
              <div class="flex items-center gap-2 text-warning mb-2">
                <Trophy size={16} />
                <span class="text-xs font-bold uppercase tracking-wider">Avg Score</span>
              </div>
              <p class="text-2xl font-black text-foreground">{avgQuizScore() ?? "—"}</p>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div class="bg-card p-4 border border-border shadow-card">
            <h3 class="text-sm font-bold text-foreground mb-3">Overall Progress</h3>
            <div class="w-full bg-muted h-3 overflow-hidden">
              <div
                class="bg-brand h-full transition-all duration-500"
                style={{ width: `${completionPct()}%` }}
              ></div>
            </div>
          </div>

          {/* Unit Breakdown */}
          <div class="bg-card border border-border shadow-card">
            <h3 class="text-sm font-bold text-foreground p-4 pb-2 border-b border-border">
              Unit Breakdown
            </h3>
            <For each={unitStats()}>
              {(unit) => (
                <div class="px-4 py-3 flex items-center gap-3 border-b border-border last:border-b-0">
                  <div class="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-lg shrink-0">
                    {unit().icon}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-bold text-foreground truncate">{unit().name}</p>
                    <p class="text-xs text-muted-foreground mt-0.5">
                      {unit().read}/{unit().total} lessons
                    </p>
                  </div>
                  <div class="text-right shrink-0">
                    <p class="text-sm font-black text-brand">{unit().pct}%</p>
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
      </Show>

      <BottomNav active="learn" />
    </div>
  );
};

export default StatsPage;
