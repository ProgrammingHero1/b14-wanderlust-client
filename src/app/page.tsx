import { Banner } from "@/components/home/banner";
import { Cta } from "@/components/home/cta";
import { Testimonials } from "@/components/home/testimonials";
import { WhyChooseUs } from "@/components/home/why-choose-us";


export default function Home() {
  return (
    <main>
   
      <Banner />
      <WhyChooseUs />
      <Testimonials />
      <Cta />
     
    </main>
  );
}
