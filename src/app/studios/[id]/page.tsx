

import { notFound } from "next/navigation";
import StudioDetails from "./studio-details";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

const StudioDetailsPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;

    const token = await getTokenFromServer();
    console.log(token);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studio/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) {
        notFound(); // invalid id or backend error -> show 404 page instead of crashing
    }

    const data = await res.json();

    return <StudioDetails studio={data} />;
};

export default StudioDetailsPage;
