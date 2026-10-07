"use client";

import type { ReactNode } from "react";
import Scaled from "./Scaled";

/** Moldura de celular (390 px de largura de projeto) que preenche a altura do contêiner, com o site rolável dentro. */
export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full items-center justify-center bg-[radial-gradient(ellipse_at_50%_40%,rgba(109,74,255,.3),transparent_70%)] py-3">
      <div
        className="relative h-full overflow-hidden rounded-[30px] border-[6px] border-[#0b0b10] bg-black shadow-[0_24px_70px_rgba(0,0,0,.65)] ring-1 ring-white/25"
        style={{ aspectRatio: "390 / 800" }}
      >
        <Scaled scroll designW={390} ratio={390 / 800}>
          {children}
        </Scaled>
        <i aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1 h-2.5 w-12 -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}
