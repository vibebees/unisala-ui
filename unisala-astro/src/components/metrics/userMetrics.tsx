import { getCache, setCache } from "@/utils/cache"
import { ANALYTICS_KEY, SESSION_END, SESSION_START } from "./analyticsUtils"

// INIT constants to be more meaningful

interface UserAnalytics {
 currentStreak: number
 streakData: {
   [key: string]: { 
     firstAccess: number,
     totalTimeSpent: number
   }
 }
}

export const useUserAnalytics = () => {
 const updateAnalytics = (sessionState: typeof SESSION_START | typeof SESSION_END) => {
   const cached = getCache<UserAnalytics>(ANALYTICS_KEY) || {
     currentStreak: 0,
     streakData: {}
   }

   const today = new Date().toISOString().split('T')[0] as string
   const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0] as string

   if (sessionState === SESSION_START) {
     return {
       ...cached,
       streakData: {
         ...cached.streakData,
         [today as string]: {
           firstAccess: Date.now(),
           totalTimeSpent: cached.streakData[today as string]?.totalTimeSpent || 0
         }
       }
     }
   }

   // SESSION_END: Calculate time spent
   const todayData = cached.streakData[today as string];
   if (!todayData?.firstAccess) {
     return cached; // Return cached data if no session started today
   }
   const timeSpent = (Date.now() - todayData.firstAccess) / 1000
   const newData = {
     currentStreak: cached.streakData[yesterday as string] ? cached.currentStreak + 1 : 1,
     streakData: {
       ...cached.streakData,
       [today as string]: {
         ...todayData,
         totalTimeSpent: todayData.totalTimeSpent + timeSpent
       }
     }
   }

   setCache(ANALYTICS_KEY, newData)
   return newData
 }

 return { updateAnalytics }
}