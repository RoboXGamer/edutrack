import { JSX, merge } from "solid-js";

interface IconProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

const IconWrapper = (props: IconProps, path: JSX.Element) => {
  const merged = merge(
    {
      width: props.size || 24,
      height: props.size || 24,
      strokeWidth: props.strokeWidth || 2,
    },
    props,
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...merged}
    >
      {path}
    </svg>
  );
};

export const Home = (props: IconProps) =>
  IconWrapper(
    props,
    <>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </>,
  );

export const GraduationCap = (props: IconProps) =>
  IconWrapper(
    props,
    <>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </>,
  );

export const BarChart3 = (props: IconProps) =>
  IconWrapper(
    props,
    <>
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </>,
  );

export const Plus = (props: IconProps) => IconWrapper(props, <path d="M12 5v14M5 12h14" />);

export const ChevronRight = (props: IconProps) => IconWrapper(props, <path d="M9 18l6-6-6-6" />);

export const ArrowLeft = (props: IconProps) =>
  IconWrapper(props, <path d="M19 12H5M12 19l-7-7 7-7" />);

export const BookOpen = (props: IconProps) =>
  IconWrapper(
    props,
    <>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </>,
  );

export const CheckCircle = (props: IconProps) =>
  IconWrapper(
    props,
    <>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </>,
  );

export const Play = (props: IconProps) =>
  IconWrapper(props, <polygon points="5 3 19 12 5 21 5 3" />);

export const Search = (props: IconProps) =>
  IconWrapper(
    props,
    <>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>,
  );

export const FileText = (props: IconProps) =>
  IconWrapper(
    props,
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </>,
  );

export const Clock = (props: IconProps) =>
  IconWrapper(
    props,
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>,
  );

export const X = (props: IconProps) =>
  IconWrapper(
    props,
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>,
  );

export const Flame = (props: IconProps) =>
  IconWrapper(
    props,
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.5 3.5 6 2.136 2.136 3.561 3.931 3.561 6.327a6.5 6.5 0 0 1-13 0c0-1.066.21-2.083.589-3.008.2.1.2.1.35.308.25.35.5.75.5 1.373z" />,
  );

export const Target = (props: IconProps) =>
  IconWrapper(
    props,
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>,
  );

export const ArrowRight = (props: IconProps) =>
  IconWrapper(props, <path d="M5 12h14M12 5l7 7-7 7" />);

export const ChevronDown = (props: IconProps) => IconWrapper(props, <path d="M6 9l6 6 6-6" />);

export const ChevronUp = (props: IconProps) => IconWrapper(props, <path d="M18 15l-6-6-6 6" />);

export const CheckCircle2 = (props: IconProps) =>
  IconWrapper(
    props,
    <>
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M9 12l2 2 4-4" />
    </>,
  );
