"use client";

import { ArrowRight, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IDestination } from "@/lib/types/destinations";
import { authClient } from "@/lib/auth-client";

const perks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

const BookingCard = ({ destination }: { destination: IDestination }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // console.log(destination)

  const handleBooking = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault()
    const departureDate = e.target.departureDate.value 
    
    const data = {
        username: user?.name,
        email: user?.email,
        image: user?.image,
        ...destination,
        departureDate: departureDate,
        bookingDate: new Date()
    }

   const res = await fetch('http://localhost:8000/booking', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
   })

   const bookingRes = await res.json()
   console.log(bookingRes)

  }

  return (
    <aside className="h-fit rounded-sm border border-border p-5">
      <p className="text-sm text-muted-foreground">Starting from</p>
      <p className="mt-1 text-3xl font-semibold text-[#00A8E8]">
        ${destination.price}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">per person</p>
    <form onSubmit={handleBooking}>
      <Input
        type="date"
        name="departureDate"
        aria-label="Departure date"
        defaultValue={destination.departureDate}
        className="mt-4"
      />

      <Button type="submit" className="mt-4 w-full bg-[#00A8E8] text-white hover:bg-[#0095d1]">
        Book Now
        <ArrowRight />
      </Button>

      </form>

      <ul className="mt-5 space-y-3 border-t border-border pt-5">
        {perks.map((perk) => (
          <li
            key={perk}
            className="flex items-center gap-2 text-xs text-muted-foreground"
          >
            <Check className="size-4 shrink-0 text-green-600" />
            {perk}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default BookingCard;
