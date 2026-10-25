import { Banner } from "@/components/home/banner";
import { Cta } from "@/components/home/cta";
import Featured from "@/components/home/featured";
import { Testimonials } from "@/components/home/testimonials";
import { WhyChooseUs } from "@/components/home/why-choose-us";


export default function Home() {
  return (
    <main>
   
      <Banner />

      <Featured/>
      <WhyChooseUs />
      <Testimonials />
      <Cta />
     
    </main>
  );
}
