"use client"

import { Card } from "../ui/card";
import Image from "next/image";
import { Calendar, Eye, Ticket, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { IBooking } from "@/lib/types/booking";
import { redirect } from "next/navigation";

const MyBookingCard = ({ booking }: { booking: IBooking }) => {
 console.log(booking)

 const handleCancleBooking = async() => {
    const res = await fetch(`http://localhost:8000/my-bookings/${booking._id}`, {
        method:'DELETE'
    })
    const data = await res.json() 
    console.log(data)

    redirect('/my-bookings')



 }
    return (
    <Card
      key={booking._id}
      className="overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full md:w-75 h-50  shrink-0 relative">
          <Image
            height={400}
            width={400}
            src={booking.imageUrl}
            alt={booking.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
          {/* Top section: Status & Details */}
          <div>
            <h2 className="text-2xl font-medium text-slate-900">
              {booking.name}
            </h2>

            <div className="mt-3 space-y-1.5 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Departure: {booking.departureDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4" />
                <span>Booking ID: {booking._id}</span>
              </div>
            </div>

            <div className="mt-4 text-2xl font-medium text-blue-500">
              ${booking.price}
            </div>
          </div>

          {/* Bottom section: Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <Button
            onClick={handleCancleBooking}
              variant="outline"
              className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 gap-2"
            >
              <XCircle className="w-4 h-4" />
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              <Eye className="w-4 h-4" />
              View
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MyBookingCard;
