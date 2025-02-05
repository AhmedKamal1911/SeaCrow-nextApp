import { BookTripSchema } from "../validations/bookTripSchema";

export type aboutInfoListType = {
  id: number;
  img: string;
  count: number;
  about: string;
}[];

export type TripTicket = Omit<BookTripSchema, "checkDate"> & {
  checkDate: string;
};

// export type User = {
//   jwt: string;
//   user: {
//     id: number;
//     username: string;
//     email: string;
//     provider: unknown;
//     confirmed: boolean;
//     blocked: boolean;
//     createdAt: string;
//     updatedAt: string;
//   };
// };
