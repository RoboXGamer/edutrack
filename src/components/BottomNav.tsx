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
    <nav class="fixed bottom-0 left-0 right-0 md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:w-auto md:rounded-full md:px-2 md:py-1.5 md:border md:border-border md:shadow-elevated bg-card/90 backdrop-blur-lg border-t border-border z-50 pb-[env(safe-area-inset-bottom)] md:pb-0">
      <div class="w-full max-w-sm md:max-w-none mx-auto flex justify-around items-center h-16 md:h-12 md:gap-2">
        <For each={tabs}>
          {(tab) => {
            const isActive = () => tab().id === currentActive();
            const Icon = tab().icon;

            return (
              <button
                onClick={() => navigate(tab().path)}
                aria-label={tab().label}
                class={{
                  "flex flex-col items-center justify-center flex-1 md:flex-initial md:px-5 md:py-2 h-full transition-all duration-200 relative rounded-full min-h-[64px] md:min-h-0": true,
                  "text-brand": isActive(),
                  "text-muted-foreground hover:text-foreground": !isActive(),
                }}
              >
                <div
                  class={{
                    "transition-all duration-200": true,
                    "scale-110 md:scale-100": isActive(),
                    "md:scale-95": !isActive(),
                  }}
                >
                  <Icon size={24} strokeWidth={isActive() ? 2.5 : 1.5} class="md:w-5 md:h-5" />
                </div>
                <span
                  class={{
                    "text-[11px] mt-1 md:hidden font-medium": true,
                    "font-semibold": isActive(),
                  }}
                >
                  {tab().label}
                </span>
                {isActive() && (
                  <div class="absolute bottom-1.5 md:hidden w-6 h-0.5 bg-brand rounded-full" />
                )}
                {isActive() && (
                  <div class="hidden md:block absolute inset-0 bg-brand/10 rounded-full" />
                )}
              </button>
            );
          }}
        </For>
      </div>
    </nav>
  );
};

export default BottomNav;
