import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Card } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

interface CodeBlockWithCopyProps {
  code: string;
  title?: string;
}

export function CodeBlockWithCopy({ code, title = "Code Output" }: CodeBlockWithCopyProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="relative p-4 bg-muted font-mono text-sm overflow-auto gap-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="absolute top-2 right-2 z-10"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{copied ? "Copied!" : "Copy to clipboard"}</TooltipContent>
      </Tooltip>

      <div className="text-sm font-semibold mb-2">{title}</div>

      <Separator />

      <ScrollArea className="max-h-60">
        <pre className="whitespace-pre overflow-auto min-w-full pb-4">{code}</pre>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Card>
  );
}
