import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Cta() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background */}
      <Image
        src="/images/CTA.png"
        alt="Airplane flying over a tropical island"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center text-white">
        <h2 className="text-4xl font-light tracking-tight md:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-base text-white/90">
          Join thousands of travelers who have discovered the world with us
        </p>
        <a
          href="/destinations"
          className="mt-10 flex items-center gap-3 bg-white px-8 py-4 text-sm font-semibold tracking-widest text-foreground uppercase transition-colors hover:bg-white/90"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" />
        </a>
      </div>
    </section>
  );
}
