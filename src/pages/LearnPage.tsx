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
    <div class="pb-20 bg-gray-50 min-h-screen">
      <div class="bg-white px-5 pt-6 pb-4 shadow-sm">
        <div class="max-w-lg mx-auto">
          <h1 class="text-xl font-bold text-gray-900">My Subjects</h1>
          <p class="text-xs text-gray-500 mt-1">{subjects().length} subjects enrolled</p>
        </div>
      </div>

      <div class="max-w-lg mx-auto px-5 mt-4">
        <Show
          when={subjects().length > 0}
          fallback={
            <div class="text-center py-16">
              <div class="text-5xl mb-4">📚</div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">No subjects yet</h3>
              <p class="text-sm text-gray-500 mb-6">Upload a PDF to create your first course</p>
              <button
                onClick={() => navigate("/upload")}
                class="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all active:scale-95"
              >
                <Plus size={18} class="inline mr-2" /> Upload Subject
              </button>
            </div>
          }
        >
          <div class="space-y-3">
            <For each={subjects()}>
              {(subject) => {
                const p = () => getProgress(subject());
                return (
                  <button
                    onClick={() => navigate(`/course/${subject().id}`)}
                    class="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-left hover:shadow-md transition-all active:scale-[0.98]"
                  >
                    <div class="flex items-center gap-3">
                      <span class="text-3xl">{getSubjectEmoji(subject().name)}</span>
                      <div class="flex-1 min-w-0">
                        <h3 class="font-semibold text-gray-900">{subject().name}</h3>
                        <p class="text-xs text-gray-500 mt-0.5">
                          {subject().courseData.units.length} Units · {p().total} Lessons
                        </p>
                        <div class="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            class="h-full bg-blue-500 rounded-full transition-all"
                            style={{ width: `${p().pct}%` }}
                          />
                        </div>
                        <p class="text-[10px] text-gray-400 mt-1">
                          {p().read} of {p().total} complete · {p().pct}%
                        </p>
                      </div>
                      <ChevronRight size={18} class="text-gray-400" />
                    </div>
                  </button>
                );
              }}
            </For>

            <button
              onClick={() => navigate("/upload")}
              class="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-2xl p-4 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98]"
            >
              <Plus size={20} />
              <span class="font-semibold">Upload New Subject</span>
            </button>
          </div>
        </Show>
      </div>

      <BottomNav active="learn" />
    </div>
  );
};

export default LearnPage;
