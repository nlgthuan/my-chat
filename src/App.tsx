import { ChangeEvent, useCallback, useRef, useState } from "react";
import { Send } from "lucide-react";

import MainLayout from "@/layouts/MainLayout";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
          <div className="px-2 mx-auto w-full max-w-3xl">
            {Array.from({ length: 40 }, (_, i) => (
              <p key={i}>main chat</p>
            ))}
          </div>
        </div>
        <div className="py-4">
          <div className="px-2 mx-auto w-full max-w-3xl relative">
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
