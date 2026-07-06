"use client";

import { useState } from "react";
import { SmoothScroll } from "@/components/experience/smooth-scroll";
import { SignalField } from "@/components/experience/signal-field";
import { Preloader } from "@/components/experience/preloader";
import { Cursor } from "@/components/experience/cursor";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { SignalStrip } from "@/components/sections/signal-strip";
import { About } from "@/components/sections/about";
import { Journey } from "@/components/sections/journey";
import { Arsenal } from "@/components/sections/arsenal";
import { Works } from "@/components/sections/works";
import { Transmit } from "@/components/sections/transmit";
import { Finale } from "@/components/sections/finale";

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <SmoothScroll>
      <div className="grain">
        <Preloader onDone={() => setReady(true)} />
        <SignalField />
        <Cursor />
        <Nav ready={ready} />
        <main className="relative z-10">
          <Hero ready={ready} />
          <SignalStrip />
          <About />
          <Journey />
          <Arsenal />
          <Works />
          <Transmit />
        </main>
        <Finale />
      </div>
    </SmoothScroll>
  );
}
