export interface House {
  property_id: string;
  title: string;
  image: string;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  surface_useable: number;
  verbose_price: string;
  city: string;
  zone: string | null;
}

export interface SingleHouse extends House {
  description: string;
  images: string[];
  agent: {
    phone: string;
    last_name: string;
    first_name: string;
  };
}
