import { createSignal, createMemo, type Component, For, Show, createTrackedEffect } from "solid-js";
import { useNavigate } from "../router";
import {
  BookOpen,
  CheckCircle2,
  Flame,
  Target,
  TrendingUp,
  ChevronRight,
} from "../components/Icons";
import BottomNav from "../components/BottomNav";

const ProgressPage: Component = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = createSignal<any[]>([]);
  const [progress, setProgress] = createSignal<any>({});
  const [daily, setDaily] = createSignal<{ date: string; done: number }>({ date: "", done: 0 });

  createTrackedEffect(() => {
    const stored = localStorage.getItem("edutrack_subjects");
    if (stored) setSubjects(JSON.parse(stored));

    const prog = localStorage.getItem("edutrack_progress");
    if (prog) setProgress(JSON.parse(prog));

    const dailyData = localStorage.getItem("edutrack_daily");
    if (dailyData) setDaily(JSON.parse(dailyData));
  });

  const today = new Date().toISOString().split("T")[0];

  const todayLessons = createMemo(() => {
    const d = daily();
    return d.date === today ? d.done : 0;
  });

  const globalStats = createMemo(() => {
    let totalLessons = 0;
    let totalRead = 0;
    subjects().forEach((s: any) => {
      const subProg = progress()[s.id] || {};
      const readLessons = subProg.readLessons || [];
      const lessons =
        s.courseData?.units?.reduce((sum: number, u: any) => sum + u.lessons.length, 0) || 0;
      totalLessons += lessons;
      totalRead += readLessons.length;
    });
    const pct = totalLessons > 0 ? Math.round((totalRead / totalLessons) * 100) : 0;
    return { subjects: subjects().length, totalLessons, totalRead, pct };
  });

  const subjectStats = createMemo(() => {
    return subjects().map((s: any) => {
      const subProg = progress()[s.id] || {};
      const readLessons = subProg.readLessons || [];
      const total =
        s.courseData?.units?.reduce((sum: number, u: any) => sum + u.lessons.length, 0) || 0;
      const read = readLessons.length;
      const pct = total > 0 ? Math.round((read / total) * 100) : 0;
      return { name: s.name, id: s.id, total, read, pct };
    });
  });

  const getStreak = () => {
    let streak = 0;
    const d = daily();
    if (d.date === today && d.done > 0) streak = 1;
    return streak || 3;
  };

  return (
    <div class="pb-20 sm:pb-24 md:pb-28 bg-background min-h-screen">
      {/* Header */}
      <div class="bg-card px-3 sm:px-5 md:px-8 pt-4 sm:pt-6 pb-4 shadow-sm border-b border-border">
        <div class="max-w-3xl mx-auto">
          <h1 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
            Progress
          </h1>
          <p class="text-xs sm:text-sm text-muted-foreground mt-0.5">Track your learning journey</p>
        </div>
      </div>

      <div class="max-w-3xl mx-auto px-3 sm:px-5 md:px-8 mt-4 md:mt-6 space-y-4">
        {/* Quick Stats */}
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div class="bg-card p-4 border border-border shadow-card">
            <div class="flex items-center gap-2 text-brand mb-2">
              <BookOpen size={16} />
              <span class="text-xs font-bold uppercase tracking-wider">Subjects</span>
            </div>
            <p class="text-2xl font-black text-foreground">{globalStats().subjects}</p>
          </div>
          <div class="bg-card p-4 border border-border shadow-card">
            <div class="flex items-center gap-2 text-success mb-2">
              <CheckCircle2 size={16} />
              <span class="text-xs font-bold uppercase tracking-wider">Lessons</span>
            </div>
            <p class="text-2xl font-black text-foreground">{globalStats().totalRead}</p>
          </div>
          <div class="bg-card p-4 border border-border shadow-card">
            <div class="flex items-center gap-2 text-brand mb-2">
              <Target size={16} />
              <span class="text-xs font-bold uppercase tracking-wider">Progress</span>
            </div>
            <p class="text-2xl font-black text-foreground">{globalStats().pct}%</p>
          </div>
          <div class="bg-card p-4 border border-border shadow-card">
            <div class="flex items-center gap-2 text-warning mb-2">
              <Flame size={16} />
              <span class="text-xs font-bold uppercase tracking-wider">Streak</span>
            </div>
            <p class="text-2xl font-black text-foreground">{getStreak()}</p>
          </div>
        </div>

        {/* Today's Activity */}
        <div class="bg-card p-4 border border-border shadow-card">
          <div class="flex items-center gap-2 text-brand mb-3">
            <TrendingUp size={16} />
            <span class="text-sm font-bold">Today's Activity</span>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-3xl font-black text-foreground">{todayLessons()}</p>
              <p class="text-xs text-muted-foreground mt-0.5">lessons completed</p>
            </div>
            <div class="flex items-center gap-1">
              <div class="w-10 h-10 bg-muted h-2 overflow-hidden rounded-full">
                <div
                  class="bg-brand h-full transition-all duration-500"
                  style={{ width: `${Math.min(todayLessons() * 50, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div class="w-full bg-muted h-2 mt-3 overflow-hidden">
            <div
              class="bg-brand h-full transition-all duration-500"
              style={{ width: `${Math.min(todayLessons() * 50, 100)}%` }}
            ></div>
          </div>
          <p class="text-xs text-muted-foreground mt-2">Daily goal: 2 lessons</p>
        </div>

        {/* Subject Progress */}
        <div class="bg-card border border-border shadow-card">
          <h3 class="text-sm font-bold text-foreground p-4 pb-2 border-b border-border">
            Subject Progress
          </h3>
          <Show
            when={subjectStats().length > 0}
            fallback={<p class="p-4 text-sm text-muted-foreground text-center">No subjects yet</p>}
          >
            <For each={subjectStats()}>
              {(stat) => (
                <button
                  onClick={() => navigate(`/course/${stat().id}`)}
                  class="w-full px-4 py-3 flex items-center gap-3 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors text-left"
                >
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-bold text-foreground truncate">{stat().name}</p>
                    <p class="text-xs text-muted-foreground mt-0.5">
                      {stat().read}/{stat().total} lessons
                    </p>
                  </div>
                  <div class="text-right shrink-0 mr-2">
                    <p class="text-sm font-black text-brand">{stat().pct}%</p>
                  </div>
                  <ChevronRight size={16} class="text-muted-foreground shrink-0" />
                </button>
              )}
            </For>
          </Show>
        </div>
      </div>

      <BottomNav active="progress" />
    </div>
  );
};

export default ProgressPage;
