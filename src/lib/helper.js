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
  

  export const getCroppedImg = (imageSrc, croppedAreaPixels) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.crossOrigin = "anonymous"; // important if image is from another domain
  
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
  
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;
  
        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );
  
        // Convert the cropped image to Blob
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          resolve(blob);
        }, "image/jpeg");
      };
  
      image.onerror = (err) => {
        reject(err);
      };
    });
  };
  