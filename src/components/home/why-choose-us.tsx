import Image from "next/image";

const features = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="w-full border-t border-[#00A8E8] bg-[#def3fd] py-16 px-6">
      <div className="mx-auto max-w-7xl border border-dashed border-[#00A8E8]/60 px-8 py-14 md:px-14">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl font-light tracking-tight text-foreground md:text-5xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-md bg-white p-7 shadow-sm"
            >
              <Image
                src={feature.icon}
                alt=""
                width={36}
                height={36}
                className="size-9"
              />
              <h3 className="mt-6 text-2xl font-normal text-foreground">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
