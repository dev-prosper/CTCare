type DateInfo = {
  year: number;
  month: number; // 1–12
  day: number; // 1–31
  dayOfWeek: number; // Sunday = 0
  date: Date;
  formatted: string; // e.g. "2025-09-23"
};

export function getDateRange(
  startDateStr: string,
  duration: number,
): {
  startDate: DateInfo;
  endDate: DateInfo;
} {
  const start = new Date(startDateStr);

  const toDateInfo = (d: Date): DateInfo => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");

    return {
      year: yyyy,
      month: d.getMonth() + 1,
      day: d.getDate(),
      dayOfWeek: d.getDay(), // numeric index (0=Sunday)
      date: d,
      formatted: `${yyyy}-${mm}-${dd}`, // ISO-like format
    };
  };

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
