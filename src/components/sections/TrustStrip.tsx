"use client";

import { personal } from "@/data/personal";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

export function TrustStrip() {
  return (
    <section aria-label="Credentials" className="trust-strip">
      <div className="container-shell">
        <Stagger
          className="grid grid-cols-2 text-[14px] md:grid-cols-4 md:text-[15px]"
          stagger={0.06}
        >
          {personal.trustItems.map((item) => (
            <StaggerItem key={item} variant="blur">
              <TiltCard intensity={4} lift={4}>
                <div className="trust-item">{item}</div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
