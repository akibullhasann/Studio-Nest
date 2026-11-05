export const instant = false;

import { notFound } from "next/navigation";

import StudioDetails from "./studio-details";

const StudioDetailsPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;

    const res = await fetch(`http://localhost:5000/studio/${id}`, { cache: 'no-store' });

    if (!res.ok) {
        notFound(); // invalid id or backend error -> show 404 page instead of crashing
    }

    const data = await res.json();

    return <StudioDetails studio={data} />;
};

export default StudioDetailsPage;
