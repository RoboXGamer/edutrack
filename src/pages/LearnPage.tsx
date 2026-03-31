import { createSignal, type Component, For, Show, createTrackedEffect } from "solid-js";
import { useNavigate } from "../router";
import { Plus, ChevronRight } from "../components/Icons";
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
  math: "📐",
  geography: "🌍",
  economics: "📊",
  polity: "🏛️",
  environment: "🌱",
  art: "🎨",
  culture: "🎭",
  philosophy: "💭",
  literature: "📚",
  technology: "💻",
  law: "⚖️",
  sociology: "👥",
};

function getSubjectEmoji(name: string) {
  const lower = name.toLowerCase();
  for (const [key, emoji] of Object.entries(subjectEmojis)) {
    if (lower.includes(key)) return emoji;
  }
  return "📖";
}

const LearnPage: Component = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = createSignal<any[]>([]);

  createTrackedEffect(() => {
    const stored = localStorage.getItem("edutrack_subjects");
    if (stored) {
      setSubjects(JSON.parse(stored));
    }
  });

  const getProgress = (subject: any) => {
    const progress = JSON.parse(localStorage.getItem("edutrack_progress") || "{}");
    const subjectProgress = progress[subject.id] || {};
    const readLessons = subjectProgress.readLessons || [];
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

  return (
    <div class="pb-20 sm:pb-24 md:pb-28 bg-background min-h-screen">
      <div class="bg-card px-3 sm:px-5 md:px-8 pt-4 sm:pt-6 pb-4 shadow-sm border-b border-border">
        <div class="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
              My Subjects
            </h1>
            <p class="text-xs sm:text-sm font-medium text-muted-foreground mt-0.5">
              {subjects().length} subjects enrolled
            </p>
          </div>
          <button
            disabled
            class="hidden sm:flex bg-muted text-muted-foreground px-4 py-2 rounded-xl font-bold border border-border cursor-not-allowed items-center gap-2 text-sm"
          >
            <Plus size={18} />
            <span>New Subject (WIP)</span>
          </button>
        </div>
      </div>

      <div class="max-w-screen-xl mx-auto px-3 sm:px-5 md:px-8 mt-4 md:mt-6">
        <Show
          when={subjects().length > 0}
          fallback={
            <div class="text-center py-12 sm:py-16 md:py-24 bg-card rounded-2xl border-2 border-dashed border-border shadow-sm px-4 max-w-lg mx-auto">
              <div class="text-4xl sm:text-5xl md:text-6xl mb-4">📚</div>
              <h3 class="text-lg sm:text-xl font-bold text-foreground mb-1.5">No subjects yet</h3>
              <p class="text-xs sm:text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
                Upload a PDF to create your first personal learning course
              </p>
              <button
                disabled
                class="bg-muted text-muted-foreground px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold border border-border cursor-not-allowed flex items-center mx-auto text-sm md:text-base"
              >
                <Plus size={20} class="mr-1.5" /> Upload Subject (WIP)
              </button>
            </div>
          }
        >
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            <For each={subjects()}>
              {(subject) => {
                const p = () => getProgress(subject());
                return (
                  <button
                    onClick={() => navigate(`/course/${subject().id}`)}
                    class="w-full bg-card rounded-xl p-4 shadow-card border border-border text-left hover:shadow-card-hover hover:border-brand/30 transition-all duration-200 active:scale-[0.99] group h-full flex flex-col"
                  >
                    <div class="flex items-center gap-3 mb-3">
                      <div class="bg-muted p-2.5 md:p-3 rounded-xl group-hover:scale-110 transition-transform shrink-0">
                        <span class="text-xl sm:text-2xl md:text-3xl">
                          {getSubjectEmoji(subject().name)}
                        </span>
                      </div>
                      <div class="flex-1 min-w-0">
                        <h3 class="font-bold text-foreground text-sm sm:text-base md:text-lg tracking-tight group-hover:text-brand transition-colors">
                          {subject().name}
                        </h3>
                        <p class="text-xs font-medium text-muted-foreground mt-0.5">
                          {subject().courseData.units.length} Units · {p().total} Lessons
                        </p>
                      </div>
                      <ChevronRight
                        size={18}
                        class="text-muted-foreground group-hover:text-brand md:hidden transition-colors shrink-0"
                      />
                    </div>

                    <div class="mt-auto pt-1.5">
                      <div class="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          class="h-full bg-brand rounded-full transition-all duration-500"
                          style={{ width: `${p().pct}%` }}
                        />
                      </div>
                      <div class="flex justify-between items-center mt-2">
                        <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                          {p().read} / {p().total} COMPLETE
                        </p>
                        <p class="text-[10px] font-black text-brand">{p().pct}%</p>
                      </div>
                    </div>
                  </button>
                );
              }}
            </For>

            <button
              onClick={() => navigate("/upload")}
              class="w-full bg-brand/5 hover:bg-brand/10 border-2 border-dashed border-brand/20 text-brand rounded-xl py-6 px-4 flex flex-col items-center justify-center gap-2 transition-all active:scale-[0.98] h-full min-h-[120px] sm:hidden"
            >
              <Plus size={28} strokeWidth={2.5} />
              <span class="font-bold text-base">Upload New Subject</span>
            </button>
          </div>
        </Show>
      </div>

      <BottomNav active="learn" />
    </div>
  );
};

export default LearnPage;
