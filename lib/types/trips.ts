import { ImageType } from "./shared";

type Highlight = {
  id: number;
  name: string;
};

type TourPlan = {
  id: number;
  name: string;
};

type IncludedService = {
  id: number;
  name: string;
};

type NotIncluded = {
  id: number;
  name: string;
};

type DontForget = {
  id: number;
  name: string;
};

type Localization = {
  id: number;
  title: string;
  time: string;
  departureTime: string;
  tripDays: string;
  returnTime: string;
  maxGuests: number;
  tourFrom: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  offer: number;
  adultPrice: number;
  childPrice: number;
  type: string;
  locale: string;
  slug: string;
};

export type Trip = {
  id: number;
  title: string;
  time: string;
  departureTime: string;
  tripDays: string;
  returnTime: string;
  maxGuests: number;
  tourFrom: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  offer: number;
  adultPrice: number;
  childPrice: number;
  type: string;
  locale: string;
  slug: string;
  imgs: {
    data: ImageType[];
  };
  highlights: Highlight[];
  tourPlan: TourPlan[];
  includedServices: IncludedService[];
  notIncluded: NotIncluded[];
  dontForget: DontForget[];
  localizations: {
    data: Localization[];
  };
};
