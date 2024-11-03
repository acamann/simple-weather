export const formatTemp = (temp: number): string =>
  `${Math.round(temp)} \u00B0F`;

export const getDayOfWeek = (date: Date): string =>
  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
