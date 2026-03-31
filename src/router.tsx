import { createSignal, createMemo, JSX } from "solid-js";

// Simple signal-based router for SolidJS 2.0+
const [currentPath, setCurrentPath] = createSignal(window.location.hash.slice(1) || "/");

// Listen for hash changes
window.addEventListener("hashchange", () => {
  const path = window.location.hash.slice(1) || "/";
  setCurrentPath(path);
});

export function useNavigate() {
  return (path: string | number) => {
    if (typeof path === "number") {
      window.history.go(path);
    } else {
      window.location.hash = path;
    }
  };
}

export function useLocation() {
  return {
    get pathname() {
      return currentPath();
    },
  };
}

export function useParams() {
  // Basic param extractor for patterns like /course/:id
  const path = currentPath();
  const parts = path.split("/").filter(Boolean);

  // We'll manual parse common patterns since this is a simple router
  const params: Record<string, string> = {};

  if (path.startsWith("/course/")) {
    params.subjectId = parts[1];
  } else if (path.startsWith("/lesson/") || path.startsWith("/quiz/")) {
    params.subjectId = parts[1];
    params.lessonId = parts[2];
  } else if (path.startsWith("/stats/")) {
    params.subjectId = parts[1];
  }

  return params;
}

interface RouteProps {
  path: string;
  component: () => JSX.Element;
}

export function SimpleRoute(props: RouteProps) {
  const isVisible = createMemo(() => {
    const path = currentPath();
    // Exact match or prefix match for routes with params
    if (props.path.includes(":")) {
      const pattern = props.path.split("/").filter(Boolean)[0];
      return path.startsWith("/" + pattern);
    }
    return path === props.path;
  });

  return (
    <div style={{ display: isVisible() ? "block" : "none" }}>
      {isVisible() && props.component()}
    </div>
  );
}

export function SimpleRouter(props: { children: any }) {
  return <>{props.children}</>;
}
