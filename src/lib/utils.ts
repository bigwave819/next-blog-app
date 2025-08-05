import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function slugify(text: string): string {
  return text
    .toLowerCase()              // "first post"
    .replace(/[^a-z0-9 ]+/g, "") // keeps only letters, numbers, and spaces → still "first post"
    .replace(/ +/g, "-")        // replaces space with hyphen → "first-post"
    .replace(/-+$/, "")         // no trailing hyphen to remove → still "first-post"
    .replace(/^-+/, "")         // no leading hyphen to remove → still "first-post"
}
    

    export function formatDate(date: Date) : string {
      return new Intl.DateTimeFormat('en-Us', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }).format(date)
    }