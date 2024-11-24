import { Settings } from 'lucide-react';
import { useState } from 'react';

import { Button } from './ui/button';
import { SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';



export default function DialogAddKey() {
  const [openaiKey, setOpenaiKey] = useState<string>(() => {
    return localStorage.getItem('openaiKey') || '';
  });

  const handleSave = () => {
    localStorage.setItem('openaiKey', openaiKey);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Settings />
            <span>Settings</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>API Keys</DialogTitle>
          <DialogDescription>
            Set up your API keys here. Click save when your're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="openai_key" className="text-right">
              OpenAI
            </Label>
            <Input
              id="openai_key"
              placeholder="sk_..."
              className="col-span-3"
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={handleSave}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
