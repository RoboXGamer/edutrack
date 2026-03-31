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
    <div class="max-w-lg mx-auto p-4 space-y-6">
      <header class="flex justify-between items-center pt-2">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">EduTrack</h1>
          <p class="text-gray-500 text-sm italic mt-1">{getDailyQuote()}</p>
        </div>
        <div class="flex items-center space-x-2 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
          <Flame size={18} class="text-orange-500 fill-orange-500" />
          <span class="font-bold text-orange-600">3</span>
        </div>
      </header>

      <section class="grid grid-cols-2 gap-3">
        <div class="bg-blue-50 p-4 rounded-2xl border border-blue-100">
          <div class="flex items-center space-x-2 text-blue-600 mb-1">
            <Target size={16} />
            <span class="text-xs font-bold uppercase tracking-wider">Your Progress</span>
          </div>
          <div class="flex items-end space-x-1">
            <span class="text-2xl font-black text-blue-700">{globalStats().pct}%</span>
          </div>
          <div class="w-full bg-blue-200 h-1.5 rounded-full mt-2">
            <div
              class="bg-blue-500 h-1.5 rounded-full"
              style={{ width: `${globalStats().pct}%` }}
            ></div>
          </div>
        </div>
        <div class="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
          <div class="flex items-center space-x-2 text-indigo-600 mb-1">
            <BookOpen size={16} />
            <span class="text-xs font-bold uppercase tracking-wider">Daily Goal</span>
          </div>
          <div class="flex items-end space-x-1">
            <span class="text-2xl font-black text-indigo-700">1/2</span>
            <span class="text-xs text-indigo-500 mb-1 font-medium">lessons</span>
          </div>
          <div class="w-full bg-indigo-200 h-1.5 rounded-full mt-2">
            <div class="bg-indigo-500 h-1.5 rounded-full" style="width: 50%"></div>
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold text-gray-800">Your Subjects</h2>
          <button
            onClick={() => navigate("/upload")}
            class="p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200 active:scale-95 transition-transform"
          >
            <Plus size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div class="relative group">
          <Search
            class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search subjects..."
            onInput={(e) => setSearchQuery(e.currentTarget.value)}
            class="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all shadow-sm"
          />
          <Show when={searchQuery().length > 0}>
            <button
              onClick={() => setSearchQuery("")}
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <X size={16} />
            </button>
          </Show>
        </div>

        <div class="space-y-3">
          <For each={filteredSubjects()}>
            {(subject) => {
              const p = () => getSubjectProgress(subject());
              return (
                <div
                  onClick={() => navigate(`/course/${subject().id}`)}
                  class="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4 active:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div class="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-gray-100">
                    {getSubjectEmoji(subject().name)}
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="font-bold text-gray-900 truncate">{subject().name}</h3>
                    <div class="flex items-center space-x-2 mt-1">
                      <div class="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          class="bg-green-500 h-full rounded-full"
                          style={{ width: `${p().pct}%` }}
                        ></div>
                      </div>
                      <span class="text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                        {p().read}/{p().total}
                      </span>
                    </div>
                  </div>
                  <div class="text-gray-300">
                    <ChevronRight size={20} />
                  </div>
                </div>
              );
            }}
          </For>
        </div>
      </section>

      <section class="bg-linear-to-br from-gray-800 to-gray-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        <div class="relative z-10">
          <h3 class="text-xl font-bold mb-2 capitalize">Level 4: Explorer</h3>
          <p class="text-gray-400 text-sm mb-4">
            You're on a roll! Complete 5 more lessons to reach Level 5.
          </p>
          <div class="flex items-center justify-between text-xs font-bold mb-2">
            <span class="text-blue-400">1,250 XP</span>
            <span class="text-gray-500">2,000 XP</span>
          </div>
          <div class="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div class="bg-blue-500 h-full w-3/5 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
          </div>
        </div>
      </section>

      <BottomNav active="home" />
    </div>
  );
};

export default HomePage;
