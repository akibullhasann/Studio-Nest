import Link from "next/link";
import { Studio } from "@/lib/studio";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

export default function StudioCard({ studio }: { studio: Studio }) {
  return (
    <Card className="overflow-hidden py-0">
      <div className="relative h-44 bg-muted">
        {studio.imageUrl?.[0] && (
          <img
            src={studio.imageUrl[0]}
            alt={studio.title}
            className="h-full w-full object-cover"
          />
        )}
        <Badge className="absolute left-3 top-3">{studio.category}</Badge>
        <Badge variant="secondary" className="absolute bottom-3 right-3">
          ${studio.hourlyRate}/hr
        </Badge>
      </div>

      <CardContent className="space-y-3 p-4">
        <div>
          <h2 className="line-clamp-1 font-semibold">{studio.title}</h2>
          <p className="line-clamp-1 text-sm text-muted-foreground">
            📍 {studio.address}
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          ⭐ {studio.rating} · Deposit ${studio.deposit} · 👥 {studio.capacity}
        </p>

        <div className="flex gap-2 border-t pt-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            nativeButton={false}
            render={<Link href={`/studios/${studio._id}`} />}
          >
            View
          </Button>
          <EditModal studio={studio} />
          <DeleteModal id={studio._id} name={studio.title} />
        </div>
      </CardContent>
    </Card>
  );
}