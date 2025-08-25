// update or add a search param
const updateSearchParam = (key: string, value: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState({}, "", url.toString());
};

const getSearchParam = (key: string) => {
  const url = new URL(window.location.href);
  return url.searchParams.get(key);
};

const deleteSearchParams = (key: string) => {
  const url = new URL(window.location.href);
  url.searchParams.delete(key);
  window.history.pushState({}, "", url);
};

const updateMultipleSearchParams = (params: Record<string, string>) => {
  const url = new URL(window.location.href);
  Object.keys(params).forEach((key) => {
    url.searchParams.set(key, params[key] || '');
  });
  window.history.pushState({}, "", url);
};

export {
  updateSearchParam,
  getSearchParam,
  deleteSearchParams,
  updateMultipleSearchParams,
};
