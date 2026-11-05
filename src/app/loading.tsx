export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center gap-3">
        <span
          aria-hidden="true"
          className="size-9 animate-spin rounded-full border-2 border-muted border-t-amber-500"
        />
        <p className="text-sm text-muted-foreground">Loading…</p>
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
