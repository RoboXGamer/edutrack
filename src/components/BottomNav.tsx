import { type Component, For } from "solid-js";
import { useNavigate, useLocation } from "../router";
import { Home, GraduationCap, BarChart3 } from "./Icons";

const tabs = [
  { id: "home", label: "Home", icon: Home, path: "/" },
  { id: "learn", label: "Learn", icon: GraduationCap, path: "/learn" },
  { id: "progress", label: "Progress", icon: BarChart3, path: "/progress" },
];

interface BottomNavProps {
  active?: string;
}

const BottomNav: Component<BottomNavProps> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-detect active if not provided
  const currentActive = () => {
    if (props.active) return props.active;
    const path = location.pathname;
    if (path === "/") return "home";
    if (path.startsWith("/progress")) return "progress";
    return "learn";
  };

  return (
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div class="max-w-lg mx-auto flex justify-around items-center h-16 relative">
        <For each={tabs}>
          {(tab) => {
            const isActive = () => tab().id === currentActive();
            const Icon = tab().icon;

            return (
              <button
                onClick={() => navigate(tab().path)}
                class={{
                  "flex flex-col items-center justify-center w-full h-full transition-all duration-200 relative": true,
                  "text-blue-500": isActive(),
                  "text-gray-400 hover:text-gray-500": !isActive(),
                }}
              >
                <div
                  class={{
                    "transition-transform duration-200": true,
                    "scale-110": isActive(),
                  }}
                >
                  <Icon size={20} strokeWidth={isActive() ? 2.5 : 1.5} />
                </div>
                <span
                  class={{
                    "text-xs mt-1": true,
                    "font-semibold": isActive(),
                    "font-medium": !isActive(),
                  }}
                >
                  {tab().label}
                </span>
                {isActive() && <div class="absolute bottom-1 w-6 h-0.5 bg-blue-500 rounded-full" />}
              </button>
            );
          }}
        </For>
      </div>
    </div>
  );
};

export default BottomNav;
