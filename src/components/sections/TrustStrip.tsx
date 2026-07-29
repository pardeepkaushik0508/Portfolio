"use client";

import { personal } from "@/data/personal";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

export function TrustStrip() {
  return (
    <section aria-label="Credentials" className="trust-strip">
      <div className="container-shell">
        <Stagger className="grid grid-cols-2 md:grid-cols-4 text-[15px]">
          {personal.trustItems.map((item) => (
            <StaggerItem key={item}>
              <div className="trust-item">{item}</div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
