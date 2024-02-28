import { useCallback, useEffect } from "react";

const useScrollToTop = (mouseBehavior = "smooth") => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: mouseBehavior });
  }, [mouseBehavior]);

  useEffect(() => {
    scrollToTop();
  }, [scrollToTop]);

  const handleClick = (event) => {
    if (event) {
      event.preventDefault();
    }
    scrollToTop();
  };

  return { handleClick };
};

export default useScrollToTop;
