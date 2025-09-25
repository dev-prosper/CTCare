type DateInfo = {
  year: number;
  month: number; // 1–12
  day: number; // 1–31
  dayOfWeek: string; // e.g. "Monday"
  date: Date; // full Date object
  formatted: string; // e.g. "Sep 25 2025"
};

export function getDateRange(
  startDateStr: string,
  duration: number,
): {
  startDate: DateInfo;
  endDate: DateInfo;
} {
  const start = new Date(startDateStr);

  // helper to extract info
  const toDateInfo = (d: Date): DateInfo => {
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate(),
      dayOfWeek: dayNames[d.getDay()],
      date: d,
      formatted: d.toDateString(), // "Thu Sep 25 2025"
    };
  };

  // endDate = startDate + duration
  const end = new Date(start);
  end.setDate(start.getDate() + duration);

  return {
    startDate: toDateInfo(start),
    endDate: toDateInfo(end),
  };
}

// Example
const result = getDateRange("Sep 25 2025", 5);

console.log(result);
/*
{
  startDate: {
    year: 2025,
    month: 9,
    day: 25,
    dayOfWeek: "Thursday",
    date: 2025-09-25T00:00:00.000Z,
    formatted: "Thu Sep 25 2025"
  },
  endDate: {
    year: 2025,
    month: 9,
    day: 30,
    dayOfWeek: "Tuesday",
    date: 2025-09-30T00:00:00.000Z,
    formatted: "Tue Sep 30 2025"
  }
}
*/
