/**
 * Shared types for the ARMY Portal frontend.
 */

export interface ThemeConfig {
  bg: string;
  primary: string;
  font: string;
  accent?: string;
}

export interface Album {
  id: number;
  title: string;
  titleKo: string | null;
  era: string;
  releaseDate: string;
  albumType: string;
  coverUrl: string | null;
  themeConfig: ThemeConfig;
  trackCount: number;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}
