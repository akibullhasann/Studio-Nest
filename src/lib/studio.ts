
export type Host = {
  name: string;
  email?: string;
  image?: string;
};

export type Review = {
  _id?: string;
  user: string;
  rating: number;
  comment: string;
  date?: string;
};

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
    host?: Host;        // 
    reviews?: Review[]; // 
};