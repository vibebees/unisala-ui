import { useHistory } from "react-router";

export const URLupdate = (key: string, value: string) => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  let search = params.get(key);
  if (search) {
    params.delete(key);
    params.set(key, value);
  } else {
    params.set(key, value);
  }
  return params.toString();
};

export const URLgetter = (key) => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  return params.get(key);
};

export const URLdelete = (key: string) => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  params.delete(key);
  return params.toString();
};

export const redirectTo = () => {
  return (url: string) => {
    const history = useHistory();
    history.push(url);
  };
};
