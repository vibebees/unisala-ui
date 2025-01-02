import moment from 'moment';

export const calculateAnalytics = (drafts: { [timestamp: string]: { createdAt: string, postText: string, updatedAt: string } }) => {
    const postTexts = Object.values(drafts).map(draft => draft.postText); // Content focus
    const dates = Object.keys(drafts).map(timestamp => moment(parseInt(timestamp))); // Convert timestamps to Moment.js objects

    const streak = calculateStreak(dates);
    const weeklyNotes = calculateWeeklyNotes(dates);
    const avgNotesPerWeek = calculateAvgNotesPerWeek(dates);
    const peakUsageNotesUpdated = calculatePeakUsageHours(drafts, 'updatedAt');
    const peakUsageNotesCreated = calculatePeakUsageHours(drafts, 'createdAt');
    const {mostActiveDay, dayCount} = calculateMostActiveDay(drafts);
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
};

const calculateStreak = (dates: moment.Moment[]): number => {
    const sortedDates = dates.sort((a, b) => a.valueOf() - b.valueOf());
    let streak = 1;

    for (let i = 1; i < sortedDates.length; i++) {
        if (sortedDates[i].diff(sortedDates[i - 1], 'days') === 1) {
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
    drafts: { [timestamp: string]: { createdAt: string, updatedAt: string } },
    trackField: 'createdAt' | 'updatedAt',
    interval: number = 3 // Use larger interval (e.g., 4 hours)
): { [key: string]: number } => {
    const dateTimeFormat = "DD/MM/YYYY, HH:mm:ss"; // Specify the format explicitly

    const hoursCount = Object.values(drafts).reduce((hoursCount, draft) => {
        const timestamp = draft[trackField];
        const momentObj = moment(timestamp, dateTimeFormat, true); // Parse with format and strict mode

        if (momentObj.isValid()) {
            const hour = momentObj.hour();
            const intervalStart = Math.floor(hour / interval) * interval;

            // Shortened labels: "3-6 PM"
            const formatHour = (h: number) => (h % 12 || 12); // Convert to 12-hour format
            const startHour = formatHour(intervalStart);
            const endHour = formatHour(intervalStart + interval);
            const period = intervalStart < 12 ? "AM" : "PM"; // Use AM/PM once
            const intervalKey = `${startHour}-${endHour} ${period}`;

            hoursCount[intervalKey] = (hoursCount[intervalKey] || 0) + 1;
        } else {
            console.warn(`Invalid timestamp: ${timestamp}`);
        }

        return hoursCount;
    }, {} as { [key: string]: number });

    // Sort intervals based on 24-hour time (hidden behind 12-hour format)
    return Object.fromEntries(
        Object.entries(hoursCount).sort(([a], [b]) => {
            const parseHour = (key: string) =>
                parseInt(key.split("-")[0], 10) +
                (key.includes("PM") && !key.startsWith("12") ? 12 : 0);
            return parseHour(a) - parseHour(b);
        })
    );
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
};

const calculateEngagementGap = (dates: moment.Moment[]): number[] => {
    const sortedDates = dates.sort((a, b) => a.valueOf() - b.valueOf());
    return sortedDates.slice(1).map((date, i) => date.diff(sortedDates[i], 'days'));
};

export const calculateMostActiveDay = (drafts: { [key: string]: { createdAt: string; updatedAt: string } }) => {
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
        const createdMoment = moment(draft.createdAt, "DD/MM/YYYY, HH:mm:ss", true);
        const updatedMoment = moment(draft.updatedAt, "DD/MM/YYYY, HH:mm:ss", true);

        if (createdMoment.isValid()) {
            const createdDay = createdMoment.format("dddd");
            dayCount[createdDay]++;
        }

        if (updatedMoment.isValid()) {
            const updatedDay = updatedMoment.format("dddd");
            if (createdMoment.isValid() && createdMoment.format("dddd") !== updatedDay) {
                dayCount[updatedDay]++;
            }
        }
    });

    const maxCount = Math.max(...Object.values(dayCount));
    const mostActiveDays = Object.entries(dayCount)
        .filter(([day, count]) => count === maxCount)
        .map(([day]) => day);

    return {
        mostActiveDays,
        dayCount,
    };
};
