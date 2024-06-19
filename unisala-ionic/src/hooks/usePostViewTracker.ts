import { useEffect, useRef } from "react";

interface UsePostViewTrackerProps {
  postId: string;
  postText: string;
}

interface UsePostViewTrackerReturn {
  postRef: React.RefObject<HTMLDivElement>;
  viewStartTime: React.MutableRefObject<number | null>;
}

const usePostViewTracker = ({
  postId,
}: UsePostViewTrackerProps): UsePostViewTrackerReturn => {
  const postRef = useRef<HTMLDivElement>(null);
  const viewStartTime = useRef<number | null>(null);

  const sendAnalyticsData = (postId: string, duration: number) => {
    const seconds = duration / 1000;
    console.log("-------------------------------------------------------");
    console.log(`You viewed the post ${postId} for ${seconds} seconds.`);
    console.log("-------------------------------------------------------");
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            viewStartTime.current = Date.now();
          } else {
            if (!entry.isIntersecting && viewStartTime.current !== null) {
              const viewDuration = Date.now() - viewStartTime.current;
              sendAnalyticsData(postId, viewDuration);
              viewStartTime.current = null;
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const currentElement = postRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [postId]);

  return { postRef, viewStartTime };
};

export default usePostViewTracker;
