import { createSignal, type Component, For, Show } from "solid-js";
import { useNavigate } from "../router";
import { ArrowLeft, Plus, FileText } from "../components/Icons";
import BottomNav from "../components/BottomNav";

const templateSubjects = [
  {
    name: "Medieval History",
    icon: "⚔️",
    courseData: {
      units: [
        {
          id: 1,
          name: "Early Medieval Period",
          icon: "🏰",
          lessons: [
            {
              id: 1,
              unitId: 1,
              title: "Tripartite Struggle",
              duration: "12m",
              type: "lesson",
              mcqs: 8,
              content:
                "The tripartite struggle between the Palas, Pratiharas, and Rashtrakutas for the control of Kannauj dominated North Indian politics from the 8th to the 10th century. Kannauj was a symbol of imperial power as it had been the capital of Harsha.\n\nThe Palas of Bengal were founded by Gopala in 750 CE. He was elected by the people to end the Matsya Nyaya (law of the fish). The Palas were great patrons of Buddhism and established Vikramashila and Odantapuri universities.\n\nThe Pratiharas ruled from Kannauj and acted as a barrier against Arab invasions from the west. Nagabhata I and Mihira Bhoja were their most powerful rulers.\n\nThe Rashtrakutas of the Deccan were known for their architectural achievements, including the Kailash temple at Ellora. Krishna I commissioned this monolithic structure.",
            },
            {
              id: 2,
              unitId: 1,
              title: "Chola Administration",
              duration: "10m",
              type: "lesson",
              mcqs: 8,
              content:
                "The Chola Empire reached its zenith under Rajaraja I and Rajendra I. Rajaraja I conquered northern Sri Lanka and built the Brihadeeswara Temple at Thanjavur.\n\nRajendra I conducted a naval expedition to Srivijaya (Indonesia) and assumed the title Gangaikonda Chola after his Ganges expedition.\n\nThe Chola administration was highly organized with local self-government through the Ur, Sabha, and Nagaram assemblies. The Uttaramerur inscription provides detailed information about the Sabha system.\n\nLand revenue was the main source of income. The Cholas maintained a strong army and a powerful navy that controlled trade routes in the Bay of Bengal.",
            },
            {
              id: 3,
              unitId: 1,
              title: "Practice Sheet 1",
              duration: "15m",
              type: "practice",
              mcqs: 10,
              content:
                "Practice questions covering Early Medieval Period including Tripartite Struggle, Chola Administration, and regional kingdoms.",
            },
          ],
        },
        {
          id: 2,
          name: "Delhi Sultanate",
          icon: "🕌",
          lessons: [
            {
              id: 4,
              unitId: 2,
              title: "Slave Dynasty",
              duration: "15m",
              type: "lesson",
              mcqs: 10,
              content:
                "The Slave Dynasty (1206-1290) was founded by Qutb-ud-din Aibak, a former slave of Muhammad Ghori. He started the construction of Qutub Minar and built the Quwwat-ul-Islam mosque.\n\nIltutmish was the real founder of the Delhi Sultanate. He introduced the Iqta system and organized the nobility into Chalisa (group of forty). He received the Mansur from the Caliph of Baghdad.\n\nRazia Sultan was the only woman ruler of the Delhi Sultanate. She was appointed by Iltutmish but faced opposition from the Turkish nobles.\n\nBalban introduced the policy of blood and iron, emphasized the divine theory of kingship, and started the practice of Sijda (prostration) and Paibos (kissing the monarch's feet).",
            },
            {
              id: 5,
              unitId: 2,
              title: "Khilji Dynasty",
              duration: "12m",
              type: "lesson",
              mcqs: 8,
              content:
                "Alauddin Khilji (1296-1316) was the most powerful ruler of the Khilji dynasty. He was the first Muslim ruler to conquer the Deccan.\n\nHis market control policy was unique in Indian history. He fixed prices of all commodities, established separate markets for grain, cloth, and horses, and appointed Shahna-i-Mandi to supervise markets.\n\nHe introduced the Dagh (branding of horses) and Chehra (descriptive roll of soldiers) system. He maintained a large standing army paid in cash.\n\nMalik Kafur, his general, led successful expeditions to the South including Devagiri, Warangal, Dwarasamudra, and Madurai.",
            },
            {
              id: 6,
              unitId: 2,
              title: "Practice Sheet 2",
              duration: "15m",
              type: "practice",
              mcqs: 10,
              content:
                "Practice questions covering Delhi Sultanate including Slave Dynasty, Khilji Dynasty, and administrative reforms.",
            },
          ],
        },
      ],
    },
  },
  {
    name: "Indian Polity",
    icon: "⚖️",
    courseData: {
      units: [
        {
          id: 1,
          name: "Constitutional Framework",
          icon: "📜",
          lessons: [
            {
              id: 1,
              unitId: 1,
              title: "Making of the Constitution",
              duration: "15m",
              type: "lesson",
              mcqs: 10,
              content:
                "The Constituent Assembly was constituted in November 1946 under the Cabinet Mission Plan. It had 389 members initially, reduced to 299 after partition.\n\nDr. Rajendra Prasad was the President of the Constituent Assembly. Dr. B.R. Ambedkar was the Chairman of the Drafting Committee.\n\nThe Constitution was adopted on November 26, 1949, and came into effect on January 26, 1950. The total time taken was 2 years, 11 months, and 18 days.\n\nThe Constitution borrowed features from several countries: Government of India Act 1935 (federal scheme), Britain (parliamentary system), USA (fundamental rights), Ireland (DPSP), Canada (federation with strong center), Australia (concurrent list), Germany (suspension of fundamental rights during emergency), USSR (fundamental duties), France (republic), South Africa (amendment procedure), Japan (procedure established by law).",
            },
            {
              id: 2,
              unitId: 1,
              title: "Preamble",
              duration: "8m",
              type: "lesson",
              mcqs: 6,
              content:
                "The Preamble is the introductory statement of the Constitution that states the guiding principles and philosophy of the Constitution. It is based on the Objectives Resolution moved by Jawaharlal Nehru.\n\nThe Preamble declares India to be a Sovereign, Socialist, Secular, Democratic Republic. The words Socialist, Secular, and Integrity were added by the 42nd Amendment Act, 1976.\n\nIt secures to all citizens Justice (social, economic, and political), Liberty (of thought, expression, belief, faith, and worship), Equality (of status and opportunity), and Fraternity (dignity of individual and unity of nation).\n\nThe Supreme Court in the Kesavananda Bharati case (1973) held that the Preamble is an integral part of the Constitution and can be amended, but its basic structure cannot be altered.",
            },
            {
              id: 3,
              unitId: 1,
              title: "Practice Sheet 1",
              duration: "15m",
              type: "practice",
              mcqs: 10,
              content:
                "Practice questions covering Making of the Constitution, Preamble, and constitutional philosophy.",
            },
          ],
        },
      ],
    },
  },
];

const UploadPage: Component = () => {
  const navigate = useNavigate();
  const [subjectName, setSubjectName] = createSignal("");
  const [lessonsText, setLessonsText] = createSignal("");
  const [showTemplates, setShowTemplates] = createSignal(false);
  const [error, setError] = createSignal("");

  const addSubject = () => {
    if (!subjectName().trim()) {
      setError("Please enter a subject name");
      return;
    }

    const subjects = JSON.parse(localStorage.getItem("edutrack_subjects") || "[]");
    const id = String(Date.now());

    const newSubject = {
      id,
      name: subjectName().trim(),
      courseData: {
        units: [
          {
            id: 1,
            name: "Unit 1",
            icon: "📖",
            lessons: lessonsText().trim()
              ? lessonsText()
                  .split("\n")
                  .filter((l) => l.trim())
                  .map((line, idx) => ({
                    id: idx + 1,
                    unitId: 1,
                    title: line.trim(),
                    duration: "10m",
                    type: "lesson" as const,
                    mcqs: 8,
                    content: line.trim(),
                  }))
              : [
                  {
                    id: 1,
                    unitId: 1,
                    title: "Introduction",
                    duration: "10m",
                    type: "lesson" as const,
                    mcqs: 8,
                    content: "Introduction to " + subjectName().trim(),
                  },
                ],
          },
        ],
      },
    };

    subjects.push(newSubject);
    localStorage.setItem("edutrack_subjects", JSON.stringify(subjects));
    navigate("/learn");
  };

  const addTemplate = (template: any) => {
    const subjects = JSON.parse(localStorage.getItem("edutrack_subjects") || "[]");
    const id = String(Date.now());
    subjects.push({ ...template, id });
    localStorage.setItem("edutrack_subjects", JSON.stringify(subjects));
    navigate("/learn");
  };

  return (
    <div class="pb-20 sm:pb-24 md:pb-28 bg-background min-h-screen">
      <div class="bg-card px-3 sm:px-5 md:px-8 pt-4 sm:pt-6 pb-4 shadow-sm border-b border-border">
        <div class="max-w-screen-xl mx-auto flex items-center justify-between">
          <div class="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              aria-label="Go back"
              class="p-2 -ml-1.5 hover:bg-muted rounded-xl transition-all active:scale-90"
            >
              <ArrowLeft size={20} class="text-foreground sm:w-5 sm:h-5" />
            </button>
            <h1 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
              Add Subject
            </h1>
          </div>
        </div>
      </div>

      <div class="max-w-screen-xl mx-auto px-3 sm:px-5 md:px-8 mt-4 md:mt-6 space-y-4">
        <div class="bg-card p-4 sm:p-6 rounded-2xl border border-border shadow-sm">
          <h2 class="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Plus size={20} class="text-brand" />
            Create New Subject
          </h2>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-foreground mb-1.5">
                Subject Name *
              </label>
              <input
                type="text"
                value={subjectName()}
                onInput={(e) => {
                  setSubjectName(e.currentTarget.value);
                  setError("");
                }}
                placeholder="e.g. Modern History, Geography..."
                class="w-full bg-muted border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-foreground placeholder:text-muted-foreground text-sm"
              />
              <Show when={error()}>
                <p class="text-red-500 text-xs mt-1">{error()}</p>
              </Show>
            </div>

            <div>
              <label class="block text-sm font-semibold text-foreground mb-1.5">
                Lessons (one per line, optional)
              </label>
              <textarea
                value={lessonsText()}
                onInput={(e) => setLessonsText(e.currentTarget.value)}
                placeholder={"Introduction\nChapter 1\nChapter 2\nChapter 3"}
                rows={6}
                class="w-full bg-muted border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all text-foreground placeholder:text-muted-foreground text-sm resize-none"
              />
              <p class="text-xs text-muted-foreground mt-1">
                Leave empty to create a subject with default lessons
              </p>
            </div>

            <button
              onClick={addSubject}
              class="w-full py-3 bg-brand text-brand-foreground rounded-xl font-bold shadow-lg shadow-brand/20 hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm"
            >
              <Plus size={18} />
              Add Subject
            </button>
          </div>
        </div>

        <div class="bg-card p-4 sm:p-6 rounded-2xl border border-border shadow-sm">
          <button
            onClick={() => setShowTemplates(!showTemplates())}
            class="w-full flex items-center justify-between"
          >
            <h2 class="text-lg font-bold text-foreground flex items-center gap-2">
              <FileText size={20} class="text-brand" />
              Quick Add Templates
            </h2>
            <span class="text-muted-foreground">{showTemplates() ? "▲" : "▼"}</span>
          </button>

          <Show when={showTemplates()}>
            <div class="mt-4 space-y-3">
              <For each={templateSubjects}>
                {(template) => (
                  <button
                    onClick={() => addTemplate(template)}
                    class="w-full bg-muted hover:bg-muted/80 border border-border rounded-xl px-4 py-3 flex items-center justify-between transition-all active:scale-[0.98] text-left"
                  >
                    <div class="flex items-center gap-3">
                      <span class="text-2xl">{template().icon}</span>
                      <div>
                        <p class="font-bold text-foreground text-sm">{template().name}</p>
                        <p class="text-xs text-muted-foreground">
                          {template().courseData.units.length} units •{" "}
                          {template().courseData.units.reduce(
                            (sum: number, u: any) => sum + u.lessons.length,
                            0,
                          )}{" "}
                          lessons
                        </p>
                      </div>
                    </div>
                    <Plus size={18} class="text-brand" />
                  </button>
                )}
              </For>
            </div>
          </Show>
        </div>
      </div>

      <BottomNav active="learn" />
    </div>
  );
};

export default UploadPage;
