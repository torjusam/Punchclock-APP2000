/* 
  Author: Torjus A.M
  This file defines functions to format time and dates into various 
  readable formats throughout the app.
*/
const months: string[] = [
  'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'
];

// Formates date to: mmmm, dd, yyyy, for example: Januar 06, 2024
export function formatDate(date: Date): string {
  const day: number = date.getDate();
  const month: string = months[date.getMonth()];
  const year: number = date.getFullYear();

  // Add leading zero to day if it's a single digit
  const formattedDay: string = (day < 10) ? `0${day}` : day.toString();

  return `${month} ${formattedDay}, ${year}`;
}

// Formats time to hh:mm, for example 14:30
export function formatTime (date: Date): string {
  date = new Date(date);
  const hours: number = date.getHours();
  const minutes: number = date.getMinutes();

  // Add leading zero to minutes if it's a single digit
  const formattedMinutes: string = (minutes < 10) ? `0${minutes}` : minutes.toString();

  return `${hours}:${formattedMinutes}`;
}

const days: string[] = [
  'Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'
];

// Takes a date and returns one string for DD, and one for DDD (for example 06 and Søn)
export function formatDay(date: Date): { day: string, dayOfWeek: string } {
  const day: number = date.getDate();
  const dayOfWeek: string = days[date.getDay()];

  // Add leading zero to day if it's a single digit
  const formattedDay: string = (day < 10) ? `0${day}` : day.toString();

  // Return as an object with two separate strings
  return { day: formattedDay, dayOfWeek };
}