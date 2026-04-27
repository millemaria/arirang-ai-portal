import { Album, ApiResponse } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

/**
 * Fetch all albums from the backend API.
 */
export async function fetchAlbums(): Promise<Album[]> {
  const res = await fetch(`${API_BASE}/api/albums`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch albums: ${res.status}`);
  }

  const json: ApiResponse<Album[]> = await res.json();
  return json.data;
}

/**
 * Send a chat message and receive a streamed response.
 * Returns a ReadableStream that yields text chunks.
 */
export async function sendChatMessage(
  question: string
): Promise<ReadableStream<string>> {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) {
    throw new Error(`Chat request failed: ${res.status}`);
  }

  const reader = res.body?.getReader();
  const decoder = new TextDecoder();

  return new ReadableStream<string>({
    async pull(controller) {
      if (!reader) {
        controller.close();
        return;
      }

      const { done, value } = await reader.read();

      if (done) {
        controller.close();
        return;
      }

      const text = decoder.decode(value, { stream: true });
      const lines = text.split("\n\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.done) {
              controller.close();
              return;
            }
            if (data.content) {
              controller.enqueue(data.content);
            }
            if (data.error) {
              controller.error(new Error(data.error));
              return;
            }
          } catch {
            // Skip malformed JSON lines
          }
        }
      }
    },
  });
}

/**
 * Send a chat message and receive a complete (non-streamed) response.
 */
export async function sendChatMessageSync(
  question: string
): Promise<string> {
  const res = await fetch(`${API_BASE}/api/chat/sync`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) {
    throw new Error(`Chat request failed: ${res.status}`);
  }

  const json: ApiResponse<{ answer: string }> = await res.json();
  return json.data.answer;
}
