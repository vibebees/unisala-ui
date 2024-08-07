// import { useHistory } from "react-router-dom";

import { getCache, setCache } from "../cache";

export const URLupdate = (key: string, value: string) => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const search = params.get(key);
  if (search) {
    params.delete(key);
    params.set(key, value);
  } else {
    params.set(key, value);
  }
  return params?.toString();
};

export const URLgetter = (key: string) => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  return params.get(key);
};

export const URLdelete = (key: string) => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  params.delete(key);
  return params?.toString();
};

export const redirectTo = () => {
  return (url: string) => {
    const history = []
    history.push(url);
  };
};

export const currentFeedType = (location: Location) => {
  // feedType could be org , space or feed
  const pathSegment = location.pathname.split('/')[1]; // Split the

  const feedType =
    pathSegment === 'org'
      ? 'specificOrg'
      : pathSegment === 'space'
      ? 'specificSpace'
      : pathSegment === 'university'
      ? 'uniWall'
      : 'newsfeed';

  return feedType;
}

export const getQueryParams = (search:string) => {
  return new URLSearchParams(search);
};

export const feedUrlChips =   [
  { key: 's_uni', value : 'suggestMeUniversity', text: 'Suggested Uni', color: 'green' },
  { key: 'q_uni', value : 'questionAboutUniversity', text: 'Questions on Uni', color: 'orange' },
  { key: 'rev', value : 'reviewUniversity', text: 'Reviews', color: 'indigo' },
  { key: 'o', value : 'others', text: 'Others', color: 'purple' }
];



// Function to get the actual values from the keys
export const getFeedChipValues = (keys: Array<string>) => {
  if (!keys) return [];
  return keys.map(key => {
    const foundChip = feedUrlChips.find(chip => chip.key === key);
    return foundChip ? foundChip.value : undefined;
  });
};


export const navigator = ( url:string = '') => {

  /*

   if preseveState is true, then 
    redirect to the original page user was visiting
    else redirect to the url passed

    scenarios where navigator is used:
    1. Preserve State
       thread => login => thread
        a. In thread, trying to comment
        b. so when calling href = login(), pass afterState = thread
        c. redirect to thread
             
    2. New State
       home page => register => welcome page => discover page
        a. In home page, trying to register
        b. so when calling href = register(), pass afterState = home page
        c. redirect to welcome page

    3. Redirect to a new page
        thread => login => home page
        a. In thread, trying to login
        b. so when calling href = login(), pass afterState = home page


  */

        const urlParams = new URLSearchParams(window.location.search);
        const redirectUrl = urlParams.get('redirect');
      
        if (url === '') {
          // If no URL is provided, serve the redirect or go to default
          window.location.href = redirectUrl ? decodeURIComponent(redirectUrl) : '/new-story';
        } else {
          // If a URL is provided, attach the current redirect to it
          const newUrl = new URL(url, window.location.origin);
          console.log({newUrl})
          if (redirectUrl) {
            newUrl.searchParams.set('redirect', redirectUrl);
          }
          window.location.href = newUrl.toString();
        }

}

 