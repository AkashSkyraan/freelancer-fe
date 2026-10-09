import useLoadingStore from "../../store/LoadingStore";
import MorphingSpinner from "./Spinner";

const GlobalLoader = () => {
  // same store logic as before: the loader shows while isLoading is true
  const isLoading = useLoadingStore((state) => state.isLoading);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm"
      aria-live="polite"
    >
      {/* the spinner already has role="status" and an sr-only "Loading" label */}
      <MorphingSpinner size="lg" className="text-[#0088FF]" />
    </div>
  );
};

export default GlobalLoader;
