import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import CopyButton from "./CopyButton";
import type { ChatMessage } from "@/db";

export default function Message({ message }: { message: ChatMessage }) {
  return (
    <div className="flex p-4 gap-4 rounded-md hover:bg-gray-100">
      <Avatar>
        <AvatarFallback
          className={message.role === "user" ? "bg-zinc-200" : "bg-blue-200"}
        >
          {message.role === "user" ? "US" : "AS"}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 overflow-x-auto prose dark:prose-invert max-w-none prose-pre:bg-transparent prose-pre:p-0">
        <Markdown
          children={message.content}
          remarkPlugins={[remarkGfm]}
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <div className="relative">
                  <CopyButton
                    content={String(children)}
                    className="text-black absolute top-2 right-2"
                    variant="outline"
                    size="icon"
                  />
                  <SyntaxHighlighter
                    PreTag="div"
                    children={String(children).replace(/\n$/, "")}
                    language={match[1]}
                    style={oneLight}
                  />
                </div>
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
    </div>
  );
}
