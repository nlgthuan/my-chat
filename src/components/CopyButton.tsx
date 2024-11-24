import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

import { Button, ButtonProps } from './ui/button';

interface CopyButtonProps extends ButtonProps {
  content: string;
}

export default function CopyButton({ content, ...rest }: CopyButtonProps) {
  const [copying, setCopying] = useState(false);
  const handleCopy = async () => {
    setCopying(true);
    await navigator.clipboard.writeText(content);

    setTimeout(() => {
      setCopying(false);
    }, 2000);
  };

  return (
    <Button {...rest} onClick={handleCopy}>
      {copying ? <Check /> : <Copy />}
    </Button>
  );
}
