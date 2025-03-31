import { clsx, type ClassValue } from "clsx"
import { ReadonlyURLSearchParams } from "next/navigation"
import { twMerge } from "tailwind-merge"
import { CauseCategory, User } from "./type"
import { Bookmark, LucideIcon, GraduationCap, Heart, Users, Briefcase, Leaf, PiggyBank, Sprout } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sessionAge = 60 * 60 * 24 * 180;

export const getOldParams = (searchParams: ReadonlyURLSearchParams, params: URLSearchParams) => {
  const oldObj: any = {}
  const oldParams = Array.from(searchParams.keys())
  oldParams.forEach((key: any) => {
    const value = params.get(key);
    if (value) {
      params.set(key, value);
      oldObj[`${key}`] = value
    }
  })
  return oldObj

}

export function getDaysLeft(deadline: string): string {
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const diffTime = deadlineDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return "Past due";
  const words = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
  ];
  const dayWord = diffDays <= 10 ? words[diffDays] : diffDays.toString();
  return `${dayWord} day${diffDays > 1 ? "s" : ""} left`;
}

export function generateKeywords(title: string): string[] {
  if (!title) return [];

  title = title.toLowerCase().trim();
  const words = title.split(/\s+/);
  const keywordSet = new Set<string>();

  words.forEach((word) => keywordSet.add(word));

  let currentPrefix = "";
  for (const char of title) {
    if (char !== " ") {
      currentPrefix += char;
      keywordSet.add(currentPrefix);
    }
  }

  for (let i = 0; i < words.length; i++) {
    let phrase = words[i];
    keywordSet.add(phrase);
    for (let j = i + 1; j < words.length; j++) {
      phrase += " " + words[j];
      keywordSet.add(phrase);
    }
  }

  return Array.from(keywordSet);
}



export const CauseCategories: CauseCategory[] = [
  { name: "Education", icon: GraduationCap },
  { name: "Healthcare", icon: Heart },
  { name: "Women's Empowerment", icon: Users },
  { name: "Youth Development", icon: Briefcase },
  { name: "Economic Development", icon: PiggyBank },
  { name: "Agriculture", icon: Sprout },
  { name: "Environment", icon: Leaf },
] as const;

export const getBaseURL = (): string => {
  if (typeof window !== "undefined") {
    // Client-side (browser)
    return window.location.origin;
  } else {
    // Server-side (Node.js)
    return process.env.BASE_URL || "http://localhost:3000"; // Fallback for local dev
  }
};

export const calculateServiceFee = (amount: number): number => {
  const serviceFeePercentage = Number(process.env.NEXT_PUBLIC_REFREEG_SERVICE_FEE || "0");
  return Math.round((amount * (serviceFeePercentage / 100)) || 0);
};
