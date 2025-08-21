// export interface User{
//   id: string;
//   name: string;
//   email: string;
//   phonenumber: string | null;
//   location: string | null;
//   bio: string | null;
//   profileImage: string | null;
//   password: string;
//   role: string;
//   createdAt: Date
// }

// export interface Provider {
//   id: string;
//   companyName: string;
//   companyEmail: string;
//   companyPhonenumber: string | null;
//   companyLocation: string | null;
//   companyDescription: string | null;
//   companyProfileImage: string | null;
//   companyAddress: string | null;
//   companyCategory: string | null;
//   password: string;
//   createdAt: Date;
// }

// export interface Trip {
//   id: string;
//   provider: Provider;
//   providerId: string;
//   title: string;
//   category: Category|null;
//   categoryId: string|null;
//   description: string | null;
//   location: string;
//   departureDate: string;
//   returnDate: string;
//   price: number;
//   maxParticipants: number;
//   currentParticipants: number;
//   isActive: boolean;
//   createdAt: Date;
//   images: TripImage[];
//   reviews: Review[];
// }

// export interface Category{
//   id: string;
//   trip: Trip[];
//   name: string;
//   createdAt: Date;
// }

// export interface TripImage {
//   id: string;
//   tripId: string;
//   imageUrl: string;
//   createdAt: Date;
// }

// export interface Booking {
//   id: string;
//   tripId: string;
//   userId: string;
//   status: string;
//   createdAt: Date;
// }

// export interface Review {
//   id: string;
//   tripId: string;
//   userId: string;
//   rating: number;
//   comment: string;
//   createdAt: Date;
// }