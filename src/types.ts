type LLMProvider = "openai";

interface Model {
  id: string;
  name: string;
  provider: LLMProvider;
}

export type { Model };
