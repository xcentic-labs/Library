import Faclits from "@/components/Faclits/Faclits";
import Hero from "@/components/Hero/Hero";
import Rules from "@/components/Rules/Rules";
import SeatBooking from "@/components/SeatBooking/SeatBooking";
import Testimonial from "@/components/Testimonial/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <SeatBooking />
      <Faclits />
      <Rules />
      <Testimonial />
    </>
  )
}