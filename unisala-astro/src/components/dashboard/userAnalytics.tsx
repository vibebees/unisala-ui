interface StreakStore {
    currentStreak: number
    streakData: {
      [key: string]: { firstAccess: number }
    }
    updateStreak: () => void
  }
  
  export const useStreakStore = create(
    persist<StreakStore>(
      (set) => ({
        currentStreak: 0,
        streakData: {},
        updateStreak: () => set((state) => {
          const now = new Date()
          const today = now.toISOString().split('T')[0]
          const yesterday = new Date(now.setDate(now.getDate() - 1))
            .toISOString().split('T')[0]
  
          if (!state.streakData[today]) {
            const isConsecutive = state.streakData[yesterday]
            return {
              currentStreak: isConsecutive ? state.currentStreak + 1 : 1,
              streakData: {
                ...state.streakData,
                [today]: { firstAccess: Date.now() }
              }
            }
          }
  
          return state
        })
      }),
      { name: 'streak-storage' }
    )
  )