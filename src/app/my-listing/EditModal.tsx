"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Studio } from "@/lib/studio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function EditModal({ studio }: { studio: Studio }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const updated = {
      title: form.get("title"),
      category: form.get("category"),
      address: form.get("address"),
      hourlyRate: Number(form.get("hourlyRate")),
      deposit: Number(form.get("deposit")),
      capacity: Number(form.get("capacity")),
      imageUrl: String(form.get("imageUrl")).split("\n").map((s) => s.trim()).filter(Boolean),
      amenities: String(form.get("amenities")).split(",").map((s) => s.trim()).filter(Boolean),
      overview: form.get("overview"),
    };

    setLoading(true);
    const res = await fetch(`http://localhost:5000/studio/${studio._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setLoading(false);

    if (res.ok) {
      toast.success("Studio updated successfully");
      setOpen(false);
      router.refresh();
    } else {
      toast.error("Update failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button variant="secondary" size="sm" className="flex-1" />}
      >
        Edit
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit studio</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={studio.title} required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" defaultValue={studio.category} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" defaultValue={studio.address} required />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label htmlFor="hourlyRate">Rate ($/hr)</Label>
              <Input id="hourlyRate" name="hourlyRate" type="number" defaultValue={studio.hourlyRate} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="deposit">Deposit ($)</Label>
              <Input id="deposit" name="deposit" type="number" defaultValue={studio.deposit} required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="capacity">Capacity</Label>
              <Input id="capacity" name="capacity" type="number" defaultValue={studio.capacity} required />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="imageUrl">Image URLs (one per line)</Label>
            <Textarea id="imageUrl" name="imageUrl" rows={3} defaultValue={studio.imageUrl?.join("\n")} />
          </div>

          <div className="space-y-1">
            <Label htmlFor="amenities">Amenities (comma separated)</Label>
            <Input id="amenities" name="amenities" defaultValue={studio.amenities?.join(", ")} />
          </div>

          <div className="space-y-1">
            <Label htmlFor="overview">Overview</Label>
            <Textarea id="overview" name="overview" rows={4} defaultValue={studio.overview} />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}