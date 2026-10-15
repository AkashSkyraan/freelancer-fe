import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const LAST_ROUTE_KEY = "lastAllowedRoute";
const INTERNAL_NAV_KEY = "pendingInternalNavigation";

const DirectUrlGuard = ({ children }) => {
  const location = useLocation();

  const currentPath = location.pathname + location.search + location.hash;

  const protectionEnabled = import.meta.env.VITE_BLOCK_DIRECT_URL === "true";

  // Check the initial URL before rendering the page.
  const [initialDecision] = useState(() => {
    if (!protectionEnabled) {
      return { redirectTo: null };
    }

    const lastRoute = sessionStorage.getItem(LAST_ROUTE_KEY) || "/";
    const pendingInternalRoute = sessionStorage.getItem(INTERNAL_NAV_KEY);

    // Allow navigation from a normal internal <a href="..."> click.
    if (pendingInternalRoute === currentPath) {
      return { redirectTo: null };
    }

    // Block a different URL entered directly in the address bar.
    return {
      redirectTo: currentPath !== lastRoute ? lastRoute : null,
    };
  });

  const [initialResolved, setInitialResolved] = useState(
    !initialDecision.redirectTo,
  );

  // Detect normal same-origin <a href="..."> navigation.
  useEffect(() => {
    if (!protectionEnabled) return;

    const handleInternalLinkClick = (event) => {
      // Skip links already handled by React Router or other code.
      if (event.defaultPrevented) return;

      if (
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");

      if (!anchor || anchor.hasAttribute("download")) return;

      if (anchor.target && anchor.target !== "_self") return;

      const url = new URL(anchor.href, window.location.href);

      // Only handle links within this website.
      if (url.origin !== window.location.origin) return;

      const destination = url.pathname + url.search + url.hash;

      sessionStorage.setItem(INTERNAL_NAV_KEY, destination);
    };

    // Bubble phase lets React Router prevent its own link clicks first.
    document.addEventListener("click", handleInternalLinkClick);

    return () => {
      document.removeEventListener("click", handleInternalLinkClick);
    };
  }, [protectionEnabled]);

  // Save valid routes and finish the initial redirect if required.
  useEffect(() => {
    if (!protectionEnabled) {
      sessionStorage.setItem(LAST_ROUTE_KEY, currentPath);
      return;
    }

    if (!initialResolved) {
      if (
        initialDecision.redirectTo &&
        currentPath === initialDecision.redirectTo
      ) {
        sessionStorage.removeItem(INTERNAL_NAV_KEY);
        sessionStorage.setItem(LAST_ROUTE_KEY, currentPath);
        setInitialResolved(true);
      }

      return;
    }

    sessionStorage.removeItem(INTERNAL_NAV_KEY);
    sessionStorage.setItem(LAST_ROUTE_KEY, currentPath);
  }, [
    currentPath,
    protectionEnabled,
    initialResolved,
    initialDecision.redirectTo,
  ]);

  // Redirect without showing the disallowed route.
  if (
    protectionEnabled &&
    !initialResolved &&
    initialDecision.redirectTo &&
    currentPath !== initialDecision.redirectTo
  ) {
    return <Navigate to={initialDecision.redirectTo} replace />;
  }

  return children;
};

export default DirectUrlGuard;
