// src/components/ui/morphing-spinner.jsx
// A minimal spinner that morphs circle -> rounded square -> triangle -> diamond -> circle
// while slowly rotating. Pure CSS, no dependencies.
//
// Props:
//   size:      "sm" | "md" | "lg" | "xl"   (default "md")
//   className: extra classes. Color follows `currentColor`, e.g. "text-blue-500"
//   label:     accessible label (default "Loading")

const sizes = {
  sm: "h-6 w-6",
  md: "h-10 w-10",
  lg: "h-16 w-16",
  xl: "h-24 w-24",
};

export function MorphingSpinner({
  size = "md",
  className = "",
  label = "Loading",
}) {
  return (
    <span
      role="status"
      aria-label={label}
      className={`inline-flex items-center justify-center text-blue-500 ${className}`}
    >
      <style>{`
        @keyframes ms-morph {
          0% {
            border-radius: 50%;
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            transform: rotate(0deg) scale(1);
          }
          25% {
            border-radius: 18%;
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            transform: rotate(90deg) scale(0.85);
          }
          50% {
            border-radius: 0%;
            clip-path: polygon(50% 0, 50% 0, 100% 100%, 0 100%);
            transform: rotate(180deg) scale(0.95);
          }
          75% {
            border-radius: 0%;
            clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
            transform: rotate(270deg) scale(0.8);
          }
          100% {
            border-radius: 50%;
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            transform: rotate(360deg) scale(1);
          }
        }
        .ms-shape {
          animation: ms-morph 3.2s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .ms-shape { animation: none; border-radius: 50%; }
        }
      `}</style>

      <span
        className={`ms-shape block bg-current ${sizes[size] ?? sizes.md}`}
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}

export default MorphingSpinner;
