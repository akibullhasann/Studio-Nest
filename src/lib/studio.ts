export type Studio = {
    _id: string;
    title: string;
    category: string;
    capacity: number;
    address: string;
    hourlyRate: number;
    deposit: number;
    rating: number;
    imageUrl: string[];
    amenities: string[];
    overview: string;
    host?: Host;        // এই ডেটায় নেই, তাই optional
    reviews?: Review[]; // এই ডেটায় নেই, তাই optional
};