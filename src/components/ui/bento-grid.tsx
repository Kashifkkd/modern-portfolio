import React from "react";
import { cn } from "@/lib/utils";

export function BentoGrid({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {children}
    </div>
  );
}

interface BentoGridItemProps {
  title: string;
  description: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function BentoGridItem({
  title,
  description,
  header,
  icon,
  className,
  children,
}: BentoGridItemProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl bg-white/80 dark:bg-zinc-900/80 shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden group hover:scale-[1.03] hover:shadow-2xl transition-all duration-300",
        className
      )}
    >
      {header && (
        <div className="relative w-full h-44 md:h-52 lg:h-56 overflow-hidden rounded-t-2xl border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
          {header}
        </div>
      )}
      <div className="flex flex-col gap-3 p-6 flex-1">
        {icon && <div className="mb-2">{icon}</div>}
        <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-2 flex-1">{description}</p>
        {children}
      </div>
    </div>
  );
} 