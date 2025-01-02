import { useEffect, useState } from "react";

export const useContainerWidth = (
  containerRef: React.RefObject<HTMLDivElement>
) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth =
          containerRef.current.getBoundingClientRect().width;
        setWidth(containerWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef]);

  return width;
};
