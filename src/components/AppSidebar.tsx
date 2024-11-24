import { useLiveQuery } from 'dexie-react-hooks';
import { useSearchParams } from 'react-router-dom';

import DialogAddKey from './DialogAddKey';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { db } from '@/db';


export function AppSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const conversations = useLiveQuery(async () => db.conversations.toArray());

  return (
    <Sidebar className="min-w-0">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {conversations?.map((conversation) => (
                <SidebarMenuItem key={conversation.id}>
                  <SidebarMenuButton
                    isActive={Number(searchParams.get('c')) === conversation.id}
                    onClick={() => {
                      const newParams = new URLSearchParams();
                      newParams.set('c', String(conversation.id));

                      setSearchParams(newParams);
                    }}
                    asChild
                  >
                    <span className="truncate min-w-0">
                      {conversation.title}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <DialogAddKey />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
