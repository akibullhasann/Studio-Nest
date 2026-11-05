"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { apiUrl } from "@/src/lib/api";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

export default function DeleteModal({ id, name }: { id: string; name: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);

    const token = getTokenFromClient();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete-studio/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    setLoading(false);

    if (res.ok) {
      toast.success("Studio deleted successfully");
      setOpen(false);
      router.refresh();
    } else {
      toast.error("Delete failed");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={<Button variant="destructive" size="sm" className="flex-1" />}
      >
        Delete
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this studio?</AlertDialogTitle>
          <AlertDialogDescription>
            "{name}" will be permanently removed. This can't be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Yes, delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}