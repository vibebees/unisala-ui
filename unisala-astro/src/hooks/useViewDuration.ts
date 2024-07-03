/* eslint-disable @typescript-eslint/no-explicit-any */

const useViewDuration = () => {
  const ViewDurationCacheUpdate = (viewTime: number, postId: string) => {
    const viewTimeCache = localStorage.getItem("viewTime");
    if (viewTimeCache) {
      const viewTimeCacheObj = JSON.parse(viewTimeCache);
      viewTimeCacheObj[postId] = (viewTimeCacheObj[postId] || 0) + viewTime;
      localStorage.setItem("viewTime", JSON.stringify(viewTimeCacheObj));
    } else {
      const viewTimeCacheObj = { [postId]: viewTime };
      localStorage.setItem("viewTime", JSON.stringify(viewTimeCacheObj));
    }
  };

  const getDuration = (postId: string) => {
    const viewTimeCache = localStorage.getItem("viewTime");
    if (viewTimeCache) {
      const viewTimeCacheObj = JSON.parse(viewTimeCache);
      return viewTimeCacheObj[postId] || 0;
    }
    return 0;
  };

  const getAllViewTime = () => {
    const viewTimeCache = localStorage.getItem("viewTime");
    if (viewTimeCache) {
      const viewTimeCacheObj = JSON.parse(viewTimeCache);
      const newObj: any = {};
      for (const key in viewTimeCacheObj) {
        if (viewTimeCacheObj[key] > 2) {
          newObj[key] = viewTimeCacheObj[key];
        }
      }
      return newObj;
    }
  };

  const deleteAllViewTime = () => {
    localStorage.removeItem("viewTime");
  };

  return {
    getDuration,
    getAllViewTime,
    deleteAllViewTime,
    ViewDurationCacheUpdate,
  };
};

export default useViewDuration;
