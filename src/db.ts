import Dexie, { type EntityTable } from "dexie";

interface ChatMessage {
  content: string;
  role: "user" | "assistant";
  uuid: string;
  model?: "gpt-4o" | "gpt-3.5";
}

interface Conversation {
  id: number;
  model: "gpt-4o" | "gpt-3.5";
  title: string;
  messages: ChatMessage[];
}

const db = new Dexie("ConversationsDatabase") as Dexie & {
  conversations: EntityTable<
    Conversation,
    "id" // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  conversations: "++id, title, model, messages", // primary key "id" (for the runtime!)
});

export type { Conversation, ChatMessage };
export { db };
