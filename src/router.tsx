import { createSignal, createMemo, JSX } from "solid-js";

const getCurrentPath = () => {
  if (typeof window === "undefined") return "/";
  const hash = window.location.hash;
  if (hash && hash.startsWith("#")) {
    return hash.slice(1) || "/";
  }
  return window.location.pathname || "/";
};

const [currentPath, setCurrentPath] = createSignal(getCurrentPath());

const updatePath = () => setCurrentPath(getCurrentPath());

window.addEventListener("hashchange", updatePath);
window.addEventListener("popstate", updatePath);

export function useNavigate() {
  return (path: string | number) => {
    if (typeof path === "number") {
      window.history.go(path);
      return;
    }

    const normalized = path.startsWith("#") ? path : `#${path}`;
    if (window.location.hash !== normalized) {
      window.location.hash = normalized;
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

const matchPath = (route: string, current: string) => {
  if (route === current) return true;

  const routeSegments = route.split("/").filter(Boolean);
  const currentSegments = current.split("/").filter(Boolean);
  if (routeSegments.length !== currentSegments.length) return false;

  return routeSegments.every((segment, index) => {
    return segment.startsWith(":") || segment === currentSegments[index];
  });
};

export function useParams() {
  const path = currentPath();
  const segments = path.split("/").filter(Boolean);
  const params: Record<string, string> = {};

  if (path.startsWith("/course/")) {
    params.subjectId = segments[1] || "";
  }

  if (path.startsWith("/lesson/") || path.startsWith("/quiz/")) {
    params.subjectId = segments[1] || "";
    params.lessonId = segments[2] || "";
  }

  if (path.startsWith("/stats/")) {
    params.subjectId = segments[1] || "";
  }

  return params;
}

interface RouteProps {
  path: string;
  component: () => JSX.Element;
}

export function SimpleRoute(props: RouteProps) {
  const isVisible = createMemo(() => matchPath(props.path, currentPath()));

  return (
    <div style={{ display: isVisible() ? "block" : "none" }}>
      {isVisible() && props.component()}
    </div>
  );
}

export function SimpleRouter(props: { children: any }) {
  return <>{props.children}</>;
}
