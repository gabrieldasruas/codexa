"use client";

import { Monitor, Smartphone } from "lucide-react";

export type Device = "desktop" | "phone";

/** Alterna a visualização do modelo entre computador e celular. */
export default function DeviceToggle({ value, onChange, className = "" }: { value: Device; onChange: (d: Device) => void; className?: string }) {
  const items = [
    ["desktop", "Computador", Monitor],
    ["phone", "Celular", Smartphone],
  ] as const;
  return (
    <div role="radiogroup" aria-label="Visualizar em" className={`flex rounded-full bg-black/35 p-0.5 ${className}`}>
      {items.map(([v, label, Icon]) => (
        <button
          key={v}
          type="button"
          role="radio"
          aria-checked={value === v}
          aria-label={label}
          title={label}
          onClick={() => onChange(v)}
          className={`flex h-7 cursor-pointer items-center gap-1.5 rounded-full px-2.5 text-[11px] font-semibold transition ${value === v ? "bg-white text-black" : "text-white/65 hover:text-white"}`}
        >
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden md:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}
