import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { IDestination } from "@/lib/types/destinations";
import EditDestinationDialog from "@/components/destination/EditDestinationDialog";
import DeleteDestinationDialog from "@/components/destination/DeleteDestinationDialog";

const highlights = [
  "Professional local guide",
  "Comfortable accommodation",
  "Daily breakfast included",
  "Small group experience",
  "All entrance fees covered",
];

const perks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

function formatDate(value: string) {
  const [year, month, day] = value.split("-");
  return `${month}/${day}/${year}`;
}

// Deterministic pseudo-rating from the id (the API has no rating/review field)
function rating(id: string) {
  const sum = id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return (4 + (sum % 10) / 10).toFixed(1);
}

function reviews(id: string) {
  const sum = id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return 120 + ((sum * 7) % 380);
}

const DestinationDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:8000/destination/${id}`);
  if (!res.ok) notFound();
  const destination: IDestination = await res.json();

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      {/* Actions */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/destinations"
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Destinations
        </Link>
        <div className="flex items-center gap-3">
          

          <EditDestinationDialog destination ={destination}/>

          <DeleteDestinationDialog id={id}/>
       
        </div>
      </div>

      {/* Hero image */}
      <div className="relative mt-6 h-72 w-full overflow-hidden rounded-sm md:h-80">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="mt-6 rounded-sm border border-border bg-white p-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          {/* Main */}
          <div>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              {destination.country}
            </p>

            <h1 className="mt-2 text-4xl font-light tracking-tight text-foreground md:text-5xl">
              {destination.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <span className="flex items-center gap-1.5">
                <Star className="size-4 fill-green-600 text-green-600" />
                <span className="font-semibold text-foreground">
                  {rating(destination._id)}
                </span>
                <span className="text-muted-foreground">
                  ({reviews(destination._id)} reviews)
                </span>
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <CalendarDays className="size-4" />
                {destination.duration}
              </span>
            </div>

            <h2 className="mt-8 text-xl font-semibold text-foreground">
              Overview
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {destination.description}
            </p>

            <h2 className="mt-8 text-xl font-semibold text-foreground">
              Highlights
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {destination.description}
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Check className="size-4 shrink-0 text-green-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar */}
          <aside className="h-fit rounded-sm border border-border p-5">
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p className="mt-1 text-3xl font-semibold text-[#00A8E8]">
              ${destination.price}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">per person</p>

            <Input
              readOnly
              aria-label="Departure date"
              value={formatDate(destination.departureDate)}
              className="mt-4"
            />

            <Button className="mt-4 w-full bg-[#00A8E8] text-white hover:bg-[#0095d1]">
              Book Now
              <ArrowRight />
            </Button>

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
        </div>
      </div>
    </main>
  );
};

export default DestinationDetailsPage;