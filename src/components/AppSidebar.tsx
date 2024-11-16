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
} from "@/components/ui/sidebar";
import DialogAddKey from "./DialogAddKey";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db";
import { useSearchParams } from "react-router-dom";

export function AppSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const conversations = useLiveQuery(async () => db.conversations.toArray());

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {conversations?.map((conversation) => (
                <SidebarMenuItem key={conversation.id}>
                  <SidebarMenuButton
                    isActive={Number(searchParams.get("c")) === conversation.id}
                    onClick={() => {
                      const newParams = new URLSearchParams();
                      newParams.set("c", String(conversation.id));

                      setSearchParams(newParams);
                    }}
                  >
                    {conversation.title}
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
