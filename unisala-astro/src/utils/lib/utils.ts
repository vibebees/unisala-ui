import type { IPost } from "@/types/post";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


export function extractSegmentURL(path: string) {
  if (!path) return "";
  if (path === "/") return null;
  return path.split("/")[1];
}

export function capitalizer(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export async function getSeasonInfo() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  let season = "";
  const seasonYear = currentDate.getFullYear();
  let nextSeason = "";
  let nextYear = seasonYear;

  switch (currentMonth) {
    case 12:
    case 1:
    case 2:
      season = "WINTER";
      nextSeason = "SPRING";
      break;
    case 3:
    case 4:
    case 5:
      season = "SPRING";
      nextSeason = "SUMMER";
      break;
    case 6:
    case 7:
    case 8:
      season = "SUMMER";
      nextSeason = "FALL";
      break;
    case 9:
    case 10:
    case 11:
      season = "FALL";
      nextSeason = "WINTER";
      if (currentMonth === 11) {
        nextYear++;
      }
      break;
  }

  return {
    season,
    seasonYear,
    nextSeason,
    nextYear,
  };
}

export const shakeWebsite = () => {
  document.body.classList.add("shake");
  const forms = document.getElementsByClassName("warning");
  Array.from(forms).forEach((item) => {
    item.classList.add("border-error");
  });

  setTimeout(() => {
    document.body.classList.remove("shake");
    Array.from(forms).forEach((item) => {
      item.classList.remove("border-error");
    });
  }, 500);
};

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


export function stripHtmlTags(html: string): string {
  return html?.replace(/<[^>]*>/g, '');

}
export function stripHtmlTagsServerSide(html: string): string {
  return html?.replace(/<[^>]*>/g, '');
}

export const similarThreadHeading = (text:string) =>{
return stripHtmlTags(text)?.substring(0, 50)
}

export const similarThreadDetail = (text:string) =>{
  return stripHtmlTags(text)?.substring(50, 250)

}

export function extractHeading(text: string) {
  const headingMatch = text.match(/<h\d[^>]*>(.*?)<\/h\d>/i);
  if (headingMatch) return headingMatch[1].trim();

  let cleanText = text
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  cleanText = cleanText
    .replace(/(\d{4})([A-Z])/g, '$1\n$2')
    .replace(/([.:])(\d+)/g, '$1\n$2')
    .replace(/([a-z])([A-Z])/g, '$1\n$2');

  const lines = cleanText.split('\n');
  let heading = lines.slice(0, 2).join(' - ');

  if (heading.length > 150) {
    heading = heading.slice(0, 147) + '...';
  }

  return heading || 'Thread Details';
}

export const threadPointer = (article:IPost) => {
  return 'threads/'+ article?._id
}

export const calculateReadTime = (text:string) => {
  const wordsPerMinute = 200; // Average reading speed
  const wordCount = text.trim().split(/\s+/).length;
  const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  return readTimeMinutes === 1 ? '1 min read' : `${readTimeMinutes} min read`;
};


export const stripHtmlAndTrim = (html: string) => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};