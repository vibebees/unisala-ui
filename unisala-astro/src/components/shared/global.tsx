import { updateStreak } from "@/utils/metrics/streakMetrics";

export const UseGlobal = () => {
    updateStreak('SESSION_START');

    // Add event listener for SESSION_END
    window.addEventListener('beforeunload', () => {
        updateStreak('SESSION_END');
    });

    return "";
};