import { createSignal, createMemo, type Component, For, Show, createTrackedEffect } from "solid-js";
import { useNavigate } from "../router";
import { Plus, Search, ChevronRight, X, Flame, Target, BookOpen } from "../components/Icons";
import BottomNav from "../components/BottomNav";

const subjectEmojis: Record<string, string> = {
  ancient: "🏛️",
  history: "📜",
  medieval: "⚔️",
  modern: "🏗️",
  science: "🔬",
  physics: "⚛️",
  chemistry: "🧪",
  biology: "🧬",
  math: "🔢",
  language: "🗣️",
  music: "🎵",
  art: "🎨",
  tech: "💻",
  coding: "⚡",
};

const getSubjectEmoji = (name: string) => {
  const n = name.toLowerCase();
  for (const [key, emoji] of Object.entries(subjectEmojis)) {
    if (n.includes(key)) return emoji;
  }
  return "📚";
};

const getDailyQuote = () => {
  const quotes = [
    "Learning is a treasure that will follow its owner everywhere.",
    "The beautiful thing about learning is that no one can take it away from you.",
    "Education is the most powerful weapon which you can use to change the world.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "Procrastination is the thief of time.",
  ];
  return quotes[new Date().getDate() % quotes.length];
};

const HomePage: Component = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = createSignal("");
  const [subjects, setSubjects] = createSignal<any[]>([]);
  const [progress, setProgress] = createSignal<any>({});

  createTrackedEffect(() => {
    const stored = localStorage.getItem("edutrack_subjects");
    if (stored) setSubjects(JSON.parse(stored));

    const prog = localStorage.getItem("edutrack_progress");
    if (prog) setProgress(JSON.parse(prog));
  });

  const getSubjectProgress = (subject: any) => {
    const subProg = progress()[subject.id] || {};
    const readLessons = subProg.readLessons || [];
    const totalLessons = subject.courseData.units.reduce(
      (sum: number, u: any) => sum + u.lessons.length,
      0,
    );
    return {
      read: readLessons.length,
      total: totalLessons,
      pct: totalLessons > 0 ? Math.round((readLessons.length / totalLessons) * 100) : 0,
    };
  };

  const globalStats = createMemo(() => {
    let totalLessons = 0,
      totalRead = 0;
    subjects().forEach((s) => {
      const p = getSubjectProgress(s);
      totalLessons += p.total;
      totalRead += p.read;
    });
    const pct = totalLessons > 0 ? Math.round((totalRead / totalLessons) * 100) : 0;
    return { subjects: subjects().length, totalLessons, totalRead, pct };
  });

  const filteredSubjects = createMemo(() => {
    const query = searchQuery().toLowerCase();
    if (!query) return subjects();
    return subjects().filter((s) => s.name.toLowerCase().includes(query));
  });

  return (
    <div class="max-w-screen-xl mx-auto px-3 sm:px-5 md:px-8 lg:px-10 py-4 md:py-6 lg:py-8 pb-20 md:pb-24 space-y-4 md:space-y-6">
      <header class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
        <div class="flex-1">
          <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            EduTrack
          </h1>
          <p class="text-muted-foreground text-xs sm:text-sm italic mt-1 max-w-md">
            {getDailyQuote()}
          </p>
        </div>
        <div class="flex items-center space-x-1.5 bg-warning/10 px-3 py-1.5 rounded-full border border-warning/20 shadow-sm shrink-0">
          <Flame size={18} class="text-warning fill-warning sm:w-5 sm:h-5" />
          <span class="font-bold text-warning text-sm">3</span>
        </div>
      </header>

      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
        <div class="bg-card p-4 lg:p-5 rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-200">
          <div class="flex items-center space-x-2 text-brand mb-1.5">
            <Target size={16} />
            <span class="text-xs font-bold uppercase tracking-widest">Your Progress</span>
          </div>
          <div class="flex items-end space-x-2">
            <span class="text-2xl lg:text-3xl font-black text-foreground">
              {globalStats().pct}%
            </span>
          </div>
          <div class="w-full bg-muted h-2 rounded-full mt-3 overflow-hidden">
            <div
              class="bg-brand h-full rounded-full transition-all duration-500"
              style={{ width: `${globalStats().pct}%` }}
            ></div>
          </div>
        </div>
        <div class="bg-card p-4 lg:p-5 rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-200">
          <div class="flex items-center space-x-2 text-brand mb-1.5">
            <BookOpen size={16} />
            <span class="text-xs font-bold uppercase tracking-widest">Daily Goal</span>
          </div>
          <div class="flex items-end space-x-2">
            <span class="text-2xl lg:text-3xl font-black text-foreground">1/2</span>
            <span class="text-xs sm:text-sm text-muted-foreground mb-0.5 font-semibold tracking-tight">
              lessons
            </span>
          </div>
          <div class="w-full bg-muted h-2 rounded-full mt-3 overflow-hidden">
            <div
              class="bg-brand h-full rounded-full transition-all duration-500"
              style="width: 50%"
            ></div>
          </div>
        </div>

        <div class="bg-brand rounded-2xl p-4 lg:p-5 text-brand-foreground shadow-card-hover relative overflow-hidden sm:col-span-2 lg:col-span-1">
          <div class="relative z-10 h-full flex flex-col justify-between">
            <div>
              <h3 class="text-lg lg:text-xl font-bold mb-1 capitalize">Level 4: Explorer</h3>
              <p class="text-brand-foreground/75 text-xs sm:text-sm mb-3">
                Complete 5 more lessons to reach Level 5.
              </p>
            </div>
            <div>
              <div class="flex items-center justify-between text-xs font-bold mb-2">
                <span class="text-brand-foreground/90">1,250 XP</span>
                <span class="text-brand-foreground/55">2,000 XP</span>
              </div>
              <div class="w-full bg-brand-foreground/20 h-2 rounded-full overflow-hidden">
                <div class="bg-brand-foreground h-full w-3/5 rounded-full transition-all duration-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 class="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
            Your Subjects
          </h2>
          <button
            onClick={() => navigate("/upload")}
            aria-label="Add new subject"
            class="flex items-center justify-center gap-2 px-4 py-2.5 bg-brand text-brand-foreground rounded-xl shadow-lg shadow-brand/20 active:scale-95 hover:brightness-110 transition-all focus:ring-2 focus:ring-brand focus:ring-offset-2 font-bold"
          >
            <Plus size={18} strokeWidth={2.5} />
            <span class="hidden sm:inline text-sm">Add Subject</span>
          </button>
        </div>

        <div class="relative group max-w-2xl">
          <label for="subject-search" class="sr-only">
            Search subjects
          </label>
          <Search
            class="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-brand transition-colors"
            size={18}
          />
          <input
            id="subject-search"
            type="text"
            placeholder="Search subjects..."
            onInput={(e) => setSearchQuery(e.currentTarget.value)}
            class="w-full bg-card border border-border rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-foreground placeholder:text-muted-foreground text-sm shadow-sm"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          <For each={filteredSubjects()}>
            {(subject) => {
              const p = () => getSubjectProgress(subject());
              return (
                <button
                  onClick={() => navigate(`/course/${subject().id}`)}
                  class="bg-card p-4 rounded-xl border border-border shadow-card hover:shadow-card-hover hover:border-brand/30 transition-all duration-200 text-left flex items-center justify-between group"
                >
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-xl flex items-center justify-center text-xl sm:text-2xl group-hover:scale-110 transition-transform">
                      {getSubjectEmoji(subject().name)}
                    </div>
                    <div>
                      <h3 class="font-bold text-foreground text-sm sm:text-base tracking-tight group-hover:text-brand transition-colors">
                        {subject().name}
                      </h3>
                      <p class="text-muted-foreground text-xs sm:text-sm font-medium">
                        {p().read} / {p().total} Lessons • {p().pct}%
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    class="text-muted-foreground group-hover:text-brand group-hover:translate-x-1 transition-all"
                  />
                </button>
              );
            }}
          </For>
        </div>
      </section>

      <BottomNav active="home" />
    </div>
  );
};

export default HomePage;
