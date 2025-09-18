"use client";

import { useState } from "react";
import { HiPlus } from "react-icons/hi";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ExclusionDialogProps {
  size?: "default" | "icon";
  exclusions: { contents: string[]; path_name: string }[];
  isOpen: boolean;
  onClose: () => void;
}

export default function ExclusionDialog({
  size = "default",
  isOpen,
  exclusions,
  onClose,
}: ExclusionDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-bottom fixed top-auto right-0 bottom-0 left-1/2 mx-0 my-0 h-[85vh] max-w-full -translate-x-1/2 translate-y-0 rounded-t-xl rounded-b-none border-b-0 duration-200 ease-out"
        showCloseButton={false}
      >
        <div className="flex h-full flex-col gap-6">
          <div className="flex flex-auto flex-col gap-4">
            <DialogTitle className="text-lg font-semibold">
              注意事項
            </DialogTitle>
            <div className="flex-auto space-y-5 overflow-y-auto">
              {exclusions.map((excl, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-base">{excl.path_name}</h3>
                  <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                    {excl.contents.map((content, cidx) => (
                      <li key={cidx}>{content}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <Button
            type="button"
            variant="secondary"
            className="flex-none"
            size="lg"
            onClick={() => {
              onClose();
            }}
          >
            取消
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
