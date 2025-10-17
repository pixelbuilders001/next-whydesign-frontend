export function formatTime(timeString) {
    if (!timeString) return "";
  
    // Case 1: If it's already "HH:MM", just return
    if (/^\d{2}:\d{2}$/.test(timeString)) return timeString;
  
    // Case 2: If it includes seconds (HH:MM:SS)
    if (/^\d{2}:\d{2}:\d{2}$/.test(timeString)) {
      return timeString.slice(0, 5);
    }
  
    // Case 3: If it's 12-hour format like "2:30 PM"
    const match = timeString.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (match) {
      let [_, hour, minute, period] = match;
      hour = parseInt(hour, 10);
      if (period.toUpperCase() === "PM" && hour < 12) hour += 12;
      if (period.toUpperCase() === "AM" && hour === 12) hour = 0;
      return `${hour.toString().padStart(2, "0")}:${minute}`;
    }
  
    // Default: return original
    return timeString;
  }
  