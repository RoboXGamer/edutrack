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
    <div class="pb-20 bg-gray-50 min-h-screen">
      {/* Header */}
      <div class="bg-white px-5 pt-6 pb-4 shadow-sm">
        <div class="max-w-lg mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            class="p-2 -ml-2 hover:bg-gray-100 rounded-xl transition-colors active:scale-95"
          >
            <ArrowLeft size={22} class="text-gray-700" />
          </button>
          <h1 class="text-lg font-bold text-gray-900 truncate px-2">
            {currentSubject()?.name || "Loading..."}
          </h1>
          <button
            onClick={() => navigate(`/stats/${params().subjectId}`)}
            class="p-2 -mr-2 hover:bg-gray-100 rounded-xl transition-colors active:scale-95"
          >
            <BarChart3 size={22} class="text-blue-500" />
          </button>
        </div>
      </div>

      <Show
        when={currentSubject()}
        fallback={<div class="flex justify-center pt-20 text-gray-400">Loading course...</div>}
      >
        <div class="max-w-lg mx-auto px-4 mt-4 space-y-3">
          <For each={unitList()}>
            {(unit) => {
              const unitProg = () => getUnitProgress(unit());
              const isExpanded = () => expandedUnits()[unit().id];

              return (
                <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => toggleUnit(unit().id)}
                    class="w-full px-4 py-4 flex items-center gap-3 text-left hover:bg-gray-50 transition-all active:bg-gray-50"
                  >
                    <span class="text-2xl">{unit().icon}</span>
                    <div class="flex-1 min-w-0">
                      <h3 class="font-semibold text-gray-900 text-sm">{unit().name}</h3>
                      <p class="text-xs text-gray-500 mt-0.5">
                        Unit {unit().id} · {unit().lessons.length} lessons
                        <Show when={unitProg().read > 0}>
                          <span class="text-green-500 ml-2">
                            ({unitProg().read}/{unitProg().total} done)
                          </span>
                        </Show>
                      </p>
                    </div>
                    <Show
                      when={isExpanded()}
                      fallback={<ChevronDown size={18} class="text-gray-400" />}
                    >
                      <ChevronUp size={18} class="text-gray-400" />
                    </Show>
                  </button>

                  <Show when={isExpanded()}>
                    <div class="border-t border-gray-50">
                      <For each={unit().lessons}>
                        {(lesson, idx) => {
                          const read = () => isRead(lesson().id);
                          const isPractice = () => lesson().type === "practice";

                          return (
                            <button
                              onClick={() =>
                                navigate(`/lesson/${params().subjectId}/${lesson().id}`)
                              }
                              class="w-full px-4 py-3.5 flex items-center gap-3 text-left hover:bg-gray-50 transition-all border-t border-gray-50 first:border-t-0 active:bg-gray-100"
                            >
                              <Show
                                when={read()}
                                fallback={
                                  <Show
                                    when={isPractice()}
                                    fallback={
                                      <div
                                        class={{
                                          "w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold": true,
                                          "bg-orange-500 text-white": idx() === 0,
                                          "bg-gray-100 text-gray-500": idx() !== 0,
                                        }}
                                      >
                                        {idx() + 1}
                                      </div>
                                    }
                                  >
                                    <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                                      <FileText size={14} class="text-gray-500" />
                                    </div>
                                  </Show>
                                }
                              >
                                <div class="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                                  <CheckCircle2 size={16} class="text-white" />
                                </div>
                              </Show>

                              <div class="flex-1 min-w-0">
                                <p
                                  class={{
                                    "text-sm truncate font-medium": true,
                                    "text-gray-400": read(),
                                    "text-gray-900": !read(),
                                  }}
                                >
                                  {lesson().title}
                                </p>
                              </div>

                              <span class="text-[10px] text-gray-400 shrink-0 font-medium">
                                {isPractice() ? `${lesson().mcqs} MCQs` : lesson().duration}
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
