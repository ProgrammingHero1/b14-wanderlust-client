"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { PackageCheck, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IDestination } from "@/lib/types/destinations";

const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural"];

// const initialForm = {
//   name: "",
//   country: "",
//   category: "",
//   price: "",
//   duration: "",
//   departureDate: "",
//   imageUrl: "",
//   description: "",
// };

const EditDestinationDialog = ({ destination } : {destination: IDestination}) => {


  const [form, setForm] = useState(destination);

  const update = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { _id, ...updatedData } = form;

    const res = await fetch(
      `http://localhost:8000/destination/${destination._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      },
    );

    const data = await res.json();
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <Pencil />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className={"min-w-xl"}>
        <DialogHeader>
          <DialogTitle>Edit Destination</DialogTitle>
          <DialogDescription>
            <form
              onSubmit={handleSubmit}
              className="mt-10 rounded-sm border border-border bg-white p-8 shadow-sm"
            >
              <div className="grid gap-5">
                {/* Destination Name */}
                <div className="grid gap-2">
                  <Label htmlFor="name">Destination Name</Label>
                  <Input
                    id="name"
                    placeholder="Bali Paradise"
                    value={form.name}
                    onChange={(event) => update("name", event.target.value)}
                    required
                  />
                </div>

                {/* Country + Category */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      placeholder="Indonesia"
                      value={form.country}
                      onChange={(event) =>
                        update("country", event.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Category</Label>
                    <Select
                      value={form.category}
                      onValueChange={(value) => update("category", value ?? "")}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Beach" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Price + Duration */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price (USD)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="e.g., 1299"
                      value={form.price}
                      onChange={(event) => update("price", event.target.value)}
                      required
                      min="0"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      placeholder="e.g., 7 Days/6 Nights"
                      value={form.duration}
                      onChange={(event) =>
                        update("duration", event.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                {/* Departure Date */}
                <div className="grid gap-2">
                  <Label htmlFor="departureDate">Departure Date</Label>
                  <Input
                    id="departureDate"
                    type="date"
                    value={form.departureDate}
                    onChange={(event) =>
                      update("departureDate", event.target.value)
                    }
                    required
                  />
                </div>

                {/* Image URL */}
                <div className="grid gap-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={form.imageUrl}
                    onChange={(event) => update("imageUrl", event.target.value)}
                    required
                  />
                </div>

                {/* Description */}
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the travel experience..."
                    className="min-h-36"
                    value={form.description}
                    onChange={(event) =>
                      update("description", event.target.value)
                    }
                    required
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="border-destructive/30 bg-background text-destructive hover:bg-destructive/5 hover:text-destructive"
                >
                  <Trash2 />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#00A8E8] text-white hover:bg-[#0095d1]"
                >
                  <PackageCheck />
                  Edit Travel Package
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditDestinationDialog;
