import moment from 'moment';

export const calculateAnalytics = (drafts: { [timestamp: string]: { createdAt: number, postText: string, updatedAt: number } }) => {
    try {
        const postTexts = Object.values(drafts).map(draft => draft.postText); // Content focus
        const dates = Object.keys(drafts).map(timestamp => moment(parseInt(timestamp))); // Convert timestamps to Moment.js objects

        const streak = calculateStreak(dates);
        const weeklyNotes = calculateWeeklyNotes(dates);
        const avgNotesPerWeek = calculateAvgNotesPerWeek(dates);
        const peakUsageNotesUpdated = calculatePeakUsageHours(drafts, 'updatedAt');
        const peakUsageNotesCreated = calculatePeakUsageHours(drafts, 'createdAt');
        const { mostActiveDay, dayCount } = calculateMostActiveDay(drafts);
        const weeklyTrends = calculateWeeklyTrends(dates);
        const contentFocus = calculateContentFocus(postTexts);
        const engagementGap = calculateEngagementGap(dates);
        return {
            streak,
            weeklyNotes,
            avgNotesPerWeek,
            peakUsageNotesUpdated,
            peakUsageNotesCreated,
            weeklyTrends,
            contentFocus,
            engagementGap,
            mostActiveDay,
            dayCount
        };
    } catch (error) {
        console.error('Error calculating analytics:', error);
        return {};
    }
};

const calculateStreak = (dates: moment.Moment[]): number => {
    const sortedDates = dates.sort((a, b) => a.valueOf() - b.valueOf());
    let streak = 1;

    for (let i = 1; i < sortedDates.length; i++) {
        if (sortedDates[i] && sortedDates[i - 1] && sortedDates[i]!.diff(sortedDates[i - 1]!, 'days') === 1) {
            streak++;
        } else {
            break;
        }
    }
    return streak;
};

const calculateWeeklyNotes = (dates: moment.Moment[]): number => {
    const startOfWeek = moment().startOf('week');
    return dates.filter(date => date.isSameOrAfter(startOfWeek)).length;
};

const calculateAvgNotesPerWeek = (dates: moment.Moment[]): number => {
    if (dates.length === 0) return 0;

    const totalNotes = dates.length;
    const weeks = moment().diff(dates[0], 'weeks', true); // Calculate total weeks, fractional
    return weeks < 1 ? totalNotes : totalNotes / weeks;
};

const calculatePeakUsageHours = (
    drafts: { [timestamp: string]: { createdAt: number, updatedAt: number } },
    trackField: 'createdAt' | 'updatedAt',
    interval: number = 3
): { [key: string]: number } => {
    try {

        const hoursCount = Object.values(drafts).reduce((hoursCount, draft) => {
            const timestamp = draft[trackField];

            // Convert timestamp to a Date object
            const date = new Date(timestamp);

            if (isNaN(date.getTime())) {
                console.error(`Invalid timestamp: ${timestamp}`);
                return hoursCount;
            }

            const hour = date.getHours();
            const intervalStart = Math.floor(hour / interval) * interval;

            const formatHour = (h: number) => (h % 12 || 12);
            const startHour = formatHour(intervalStart);
            const endHour = formatHour(intervalStart + interval);
            const period = intervalStart < 12 ? "AM" : "PM";
            const intervalKey = `${startHour}-${endHour} ${period}`;
            hoursCount[intervalKey] = (hoursCount[intervalKey] || 0) + 1;

            return hoursCount;
        }, {} as { [key: string]: number });

        // Log the final hours count before sorting

        // Sort intervals
        return Object.fromEntries(
            Object.entries(hoursCount).sort(([a], [b]) => {
                const parseHour = (key: string) => {
                    const hourPart = key.split("-")[0];
                    return parseInt(hourPart || "0", 10) +
                        (key.includes("PM") && !key.startsWith("12") ? 12 : 0);
                };
                return parseHour(a) - parseHour(b);
            })
        );
    } catch (error) {
        console.error('Error calculating peak usage hours:', error);
        return {};
    }
};






const calculateWeeklyTrends = (dates: moment.Moment[]): { [key: string]: number } => {
    const dayOfWeekCount: { [key: string]: number } = {};

    dates.forEach(date => {
        const dayOfWeek = date.format('dddd'); // Get full name of the day
        dayOfWeekCount[dayOfWeek] = (dayOfWeekCount[dayOfWeek] || 0) + 1;
    });
    return dayOfWeekCount;
};

const calculateContentFocus = (postTexts: string[]): { [key: string]: number } => {
    try {
        const keywordCount: { [key: string]: number } = {};

        postTexts.forEach(post => {
            const words = post.toLowerCase().split(/\W+/); // Split by non-word characters
            words.forEach(word => {
                if (word) {
                    keywordCount[word] = (keywordCount[word] || 0) + 1;
                }
            });
        });

        return keywordCount;
    } catch (error) {
        console.error('Error calculating content focus:', error);
        return {};
    }
};

const calculateEngagementGap = (dates: moment.Moment[]): number[] => {
    try {
        const sortedDates = dates.sort((a, b) => a.valueOf() - b.valueOf());
        return sortedDates.slice(1).map((date, i) => date.diff(sortedDates[i], 'days'));
    } catch (error) {
        console.error('Error calculating engagement gap:', error);
        return [];
    }
};

const calculateMostActiveDay = (drafts: { [key: string]: { createdAt: number; updatedAt: number } }) => {
    try {
        const dayCount: { [key: string]: number } = {
            Sunday: 0,
            Monday: 0,
            Tuesday: 0,
            Wednesday: 0,
            Thursday: 0,
            Friday: 0,
            Saturday: 0,
        };

        Object.values(drafts).forEach(draft => {
            // Parse with the correct format: "M/D/YYYY, h:mm:ss A"
            const createdMoment = moment(draft.createdAt);
            const updatedMoment = moment(draft.updatedAt);

            if (createdMoment.isValid()) {
                const createdDay = createdMoment.format("dddd");
                if (dayCount[createdDay] !== undefined) {
                    dayCount[createdDay]++;
                }
            }

            if (updatedMoment.isValid()) {
                const updatedDay = updatedMoment.format("dddd");
                // Only count update if it's on a different day than creation
                if (createdMoment.isValid() && createdMoment.format("dddd") !== updatedDay && dayCount[updatedDay] !== undefined) {
                    dayCount[updatedDay]++;
                }
            }
        });

        const maxCount = Math.max(...Object.values(dayCount));
        const mostActiveDay = Object.entries(dayCount)
            .filter(([day, count]) => count === maxCount)
            .map(([day]) => day)

        return {
            mostActiveDay,
            dayCount,
        };
    } catch (error) {
        console.error('Error calculating most active day:', error);
        return {};
    }
};