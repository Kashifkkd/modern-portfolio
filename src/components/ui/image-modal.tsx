"use client";

import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";
import Image from "next/image";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  alt: string;
}

export function ImageModal({ isOpen, onClose, imageSrc, alt }: ImageModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-2xl w-full p-0 bg-transparent shadow-none border-none flex flex-col items-center justify-center">
        <DialogClose asChild>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 hover:scale-110 z-10 backdrop-blur-sm"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </DialogClose>
        <div className="relative w-full h-full flex items-center justify-center p-4">
          <Image
            src={imageSrc}
            alt={alt}
            width={800}
            height={800}
            className="rounded-2xl shadow-2xl w-full h-auto max-h-[80vh] object-contain border-4 border-white/20"
            priority
          />
        </div>
      </DialogContent>
    </Dialog>
  );
} 