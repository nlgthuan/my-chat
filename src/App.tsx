import { ChangeEvent, useCallback, useRef, useState } from "react";
import { Send } from "lucide-react";

import MainLayout from "@/layouts/MainLayout";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Message from "./components/Message";

export type Message = {
  content: string;
  role: "user" | "assistant";
  uuid: string;
  model?: "gpt-4o";
};

const initialMessages: Message[] = [
  {
    content:
      "Create a Python program that visualizes weather data for a city using hardcoded data.",
    role: "user",
    uuid: "123121313",
  },
  {
    content: "Can you suggest some good books on machine learning?",
    role: "user",
    uuid: "234234234",
  },
  {
    content:
      "Sure! Some highly recommended books on machine learning are 'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow' by Aurélien Géron and 'Deep Learning' by Ian Goodfellow.",
    role: "assistant",
    uuid: "345345345",
    model: "gpt-4o",
  },
  {
    content: "How do I implement a binary search algorithm in JavaScript?",
    role: "user",
    uuid: "456456456",
  },
  {
    content:
      "Here's a simple implementation of binary search in JavaScript:\n\n```javascript\nfunction binarySearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n\n    if (arr[mid] === target) {\n      return mid;\n    }\n\n    if (arr[mid] < target) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n\n  return -1;\n}\n```",
    role: "assistant",
    model: "gpt-4o",
    uuid: "567567567",
  },
  {
    content: "What is the capital of France?",
    role: "user",
    uuid: "678678678",
  },
  {
    content: "The capital of France is Paris.",
    role: "assistant",
    model: "gpt-4o",
    uuid: "789789789",
  },
  {
    content:
      "Explain the concept of polymorphism in object-oriented programming.",
    role: "user",
    uuid: "890890890",
  },
  {
    content:
      "Polymorphism in object-oriented programming allows objects to be treated as instances of their parent class. It enables a single function to work in different ways based on the object it is acting upon. This can be achieved through method overriding or interfaces.",
    role: "assistant",
    uuid: "901901901",
    model: "gpt-4o",
  },
];

function App() {
  const [text, setText] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const submitChat = () => {
    console.log("============ Submit chatttt: ", text);
    setText("");
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      if (!event.shiftKey) {
        event.preventDefault();
        submitChat();
      } else {
        console.log("Shift + Enter pressed - new line");
      }
    }
  };
  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  return (
    <MainLayout>
      <main className="w-full h-svh flex flex-col min-w-0">
        <div className="p-2">
          <SidebarTrigger />
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-2 mx-auto w-full max-w-5xl">
            {initialMessages.map((msg) => (
              <Message key={msg.uuid} message={msg} />
            ))}
          </div>
        </div>
        <div className="py-4">
          <div className="px-2 mx-auto w-full max-w-5xl relative">
            <Textarea
              placeholder="Type anything to chat with AI"
              value={text}
              onChange={handleTextareaChange}
              ref={textareaRef}
              onKeyDown={handleKeyDown}
              className="max-h-60 overflow-y-auto resize-none pb-9 h-[84px]"
            />
            <Button
              className="absolute bottom-0 right-2"
              size="icon"
              variant="ghost"
              onClick={submitChat}
            >
              <Send />
            </Button>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default App;
