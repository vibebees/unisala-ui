// import { useHistory } from "react-router-dom";


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
        let redirectUrl = urlParams.get('redirect');
      
        if (url === '') {
          // If no URL is provided, serve the redirect or go to default
          if (redirectUrl) {
            // Preserve the structure of the redirect URL
            const [path, query] = redirectUrl.split('?');
            const redirectUrlObj = new URL(path || '/new-story', window.location.origin);
            if (query) {
              redirectUrlObj.search = query;
            }
            window.location.href = redirectUrlObj.toString();
          } else {
            // Default to /new-story if no redirect is provided
            window.location.href = new URL('/new-story', window.location.origin).toString();
          }
        } else {
          // If a URL is provided, attach the current redirect to it
          const newUrl = new URL(url, window.location.origin);
          if (redirectUrl) {
            // Preserve the structure of the redirect URL
            newUrl.searchParams.set('redirect', redirectUrl);
          }
          window.location.href = newUrl.toString();
        }
}

 
/**
 * Transforms a topic and ID into a URL-friendly string.
 * @param {string} topic - The topic to be included in the URL.
 * @param {string|number} id - The ID to be appended to the URL.
 * @param {string} [separator='-'] - The character used to replace spaces and separate elements (default is hyphen).
 * @returns {string} The transformed URL-friendly string.
 */
export const transformToUrlFriendly = (topic: string, id: string, separator: string = '-'): string => {
  // Ensure the topic is a string and trim any leading/trailing whitespace
  const cleanTopic = String(topic).trim();
  
  // Replace spaces and any non-alphanumeric characters (except underscores) with the separator
  const urlFriendlyTopic = cleanTopic.replace(/[^a-z0-9_]+/gi, separator).toLowerCase();
  
  // Remove any leading or trailing separators
  const trimmedTopic = urlFriendlyTopic.replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '');
  
  // Combine the transformed topic with the ID
  return `${trimmedTopic}${separator}${id}`;
}

export const extractNameAndId = (url:string)=> {
  // Match the ID at the end of the url (assuming it's a 24-character hexadecimal string)
  const match = url.match(/^(.+)-([a-f0-9]{24})$/);
  
  if (!match) {
    throw new Error('Invalid url format: expected name-[24 character ID]');
  }
  
  // Extract the name and ID
  let [, name, id] = match;
  
  // Replace hyphens with spaces in the name
  name = name?.replace(/-/g, ' ') || '';
  
  // Capitalize the first letter of each word in the name
  const capitalizedName = name.replace(/\b\w/g, char => char.toUpperCase());
  
  return { name: capitalizedName, id };
}