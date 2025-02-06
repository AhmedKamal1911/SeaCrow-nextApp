import { z } from "zod";
import { BookTripSchema } from "../validations/book-trip-schema";
import { questionItemSchema } from "../validations/shared";

export type aboutInfoListType = {
  id: number;
  img: string;
  count: number;
  about: string;
}[];

export type TripTicket = Omit<BookTripSchema, "checkDate"> & {
  checkDate: string;
};

export type QuestionItem = z.infer<typeof questionItemSchema>;
