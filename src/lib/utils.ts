import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { parse, format, isValid } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function getInitials(name: string) {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "";

  const parsedDate = parse(dateString, "yyyy-MM-dd", new Date());

  if (isValid(parsedDate)) {
    return format(parsedDate, "MMMM, yyyy");
  } else {
    console.error("Invalid date:", dateString);
    return "Present"; // or return a default value or the original string
  }
};
