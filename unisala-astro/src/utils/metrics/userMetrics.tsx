import { ANALYTICS_KEY, SESSION_END, SESSION_START } from "@/components/metrics/analyticsUtils"
import { getCache, setCache } from "@/utils/cache"

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

export const calculateLoginStreak = () => {
//  const updateAnalytics = (sessionState: typeof SESSION_START | typeof SESSION_END) => {
//    const cached = getCache<UserAnalytics>(ANALYTICS_KEY) || {
//      currentStreak: 0,
//      streakData: {}
//    }

//    const today = new Date().toISOString().split('T')[0]
//    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

//    if (sessionState === SESSION_START) {
//      return {
//        ...cached,
//        streakData: {
//          ...cached.streakData,
//          [today]: {
//            firstAccess: Date.now(),
//            totalTimeSpent: cached.streakData[today]?.totalTimeSpent || 0
//          }
//        }
//      }
//    }

//    // SESSION_END: Calculate time spent
//    const timeSpent = (Date.now() - cached.streakData[today].firstAccess) / 1000
//    const newData = {
//      currentStreak: cached.streakData[yesterday] ? cached.currentStreak + 1 : 1,
//      streakData: {
//        ...cached.streakData,
//        [today]: {
//          ...cached.streakData[today],
//          totalTimeSpent: cached.streakData[today].totalTimeSpent + timeSpent
//        }
//      }
//    }

//    setCache(ANALYTICS_KEY, newData)
//    return newData
//  }

 return { calculateLoginStreak }
}