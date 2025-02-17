import { useLiveQuery } from 'dexie-react-hooks';
import { Send } from 'lucide-react';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import Combobox from './components/Combobox';
import Message from './components/Message';
import { Conversation, db } from './db';

import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Textarea } from '@/components/ui/textarea';
import MainLayout from '@/layouts/MainLayout';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [text, setText] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const conversationID = Number(searchParams.get('c') ?? -1);

  async function addConversation({
    title,
    model,
    messages,
  }: Partial<Conversation>): Promise<number> {
    try {
      const id = await db.conversations.add({
        title: title ?? 'New conversation',
        model: model ?? 'gpt-4o',
        messages: messages ?? [],
      });

      return id;
    } catch {
      return -1;
    }
  }

  const submitChat = async () => {
    const newMessage = {
      uuid: uuid(),
      content: text,
      role: 'user',
    } as const;

    if (conversationID === -1) {
      const title = text.length < 30 ? text : text.slice(0, 30);
      const newConversationID = await addConversation({
        messages: [newMessage],
        title,
      });
      const newParams = new URLSearchParams();
      newParams.set('c', String(newConversationID));
      setSearchParams(newParams);
    } else {
      const conversation = await db.conversations.get(conversationID);

      if (conversation) {
        const messages = conversation.messages ?? [];
        messages.push(newMessage);

        await db.conversations.put(
          {
            ...conversation,
            messages,
          },
          conversationID,
        );
      }
    }

    setText('');
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.scrollTo(0, textarea.scrollHeight);
    }
  };

  const conversation = useLiveQuery(
    async () => db.conversations.get(conversationID),
    [conversationID],
  );
  const chatMessages = conversation?.messages;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      if (!event.shiftKey) {
        event.preventDefault();
        submitChat();
      } else {
        console.log('Shift + Enter pressed - new line');
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
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  return (
    <MainLayout>
      <main className="w-full h-svh flex flex-col min-w-0">
        <div className="p-2 flex items-center justify-between">
          <SidebarTrigger />
          <Combobox />
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-2 mx-auto w-full max-w-5xl">
            {chatMessages?.map((msg) => (
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
