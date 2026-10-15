// import { useLayoutEffect } from "react";
// import { useLocation } from "react-router-dom";
// import useLoadingStore from "../../store/LoadingStore";

// const waitForPaint = async () => {
//   if (document.fonts) {
//     await document.fonts.ready;
//   }

//   const images = Array.from(document.images).filter((img) => {
//     const rect = img.getBoundingClientRect();

//     return (
//       rect.width > 0 &&
//       rect.height > 0 &&
//       rect.bottom > 0 &&
//       rect.top < window.innerHeight &&
//       rect.right > 0 &&
//       rect.left < window.innerWidth
//     );
//   });

//   await Promise.all(
//     images.map(async (img) => {
//       if (!img.complete) {
//         await new Promise((resolve) => {
//           img.addEventListener("load", resolve, { once: true });
//           img.addEventListener("error", resolve, { once: true });
//         });
//       }

//       try {
//         await img.decode?.();
//       } catch {
//         // Continue if an image fails to decode.
//       }
//     }),
//   );

//   // Allow the browser two frames to render the updated page.
//   await new Promise((resolve) =>
//     requestAnimationFrame(() => requestAnimationFrame(resolve)),
//   );
// };

// const RouteLoadingTracker = () => {
//   const location = useLocation();
//   const setRouteLoading = useLoadingStore((state) => state.setRouteLoading);

//   useLayoutEffect(() => {
//     let cancelled = false;
//     const startTime = Date.now();
//     const MIN_LOADER_TIME = 500; // milliseconds

//     setRouteLoading(true);

//     const finishLoading = async () => {
//       try {
//         await waitForPaint();

//         // Ensure the loader stays visible for at least 500ms
//         const elapsedTime = Date.now() - startTime;
//         const remainingTime = Math.max(0, MIN_LOADER_TIME - elapsedTime);

//         if (remainingTime > 0) {
//           await new Promise((resolve) => setTimeout(resolve, remainingTime));
//         }
//       } finally {
//         if (!cancelled) {
//           setRouteLoading(false);
//         }
//       }
//     };

//     finishLoading();

//     return () => {
//       cancelled = true;
//     };
//   }, [location.key, setRouteLoading]);

//   return null;
// };

// export default RouteLoadingTracker;
