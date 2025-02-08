import { motion } from "framer-motion";

import { getStrapiMediaURL } from "@/lib/utils";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/routing";
import { TripData } from "@/lib/types/trips";

type Props = {
  trip: TripData;
  i: number;
  inView: boolean;
};
export default function TripCard({ trip, i, inView }: Props) {
  const imgUrl = getStrapiMediaURL(trip?.imgs.data[0]?.url);
  const t = useTranslations();

  return (
    <motion.div
      key={trip?.id}
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: inView ? 1 : 0,
        y: inView ? 0 : 100,
        transition: { delay: 0.25 * i },
      }}
      exit={{ opacity: 0 }}
      custom={i}
      className="h-full"
    >
      <Link
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        href={`/trips/${trip.slug}` as any}
        prefetch={false}
        className="relative overflow-hidden select-none block group h-full bg-cover bg-[80%] after:absolute after:inset-0 after:bg-[#12131233] before:absolute before:inset-0 before:opacity-0 hover:before:bg-custom-gradient hover:before:opacity-[1] before:transition-all before:duration-700"
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      >
        {trip.offer && (
          <div className="absolute text-white text-2xl end-2 top-2 bg-main w-[50px] h-[50px] rounded-full z-50 flex justify-center items-center">
            {trip.offer}%
          </div>
        )}

        <span className="z-[50] text-white absolute top-2 flex items-center before:bg-white gap-2 after:bg-white start-2 before:w-0 before:h-0.5 after:w-6 after:h-0.5 group-hover:before:w-6 group-hover:after:w-0 after:transition-all after:duration-300 before:transition-all before:duration-300">
          {i + 1 < 10 ? `0${i + 1}` : i + 1}
        </span>
        <div className="z-50 absolute start-[1em] bottom-[1em] end-[1em] ">
          <h3 className="text-2xl mb-2 sm:mb-0 absolute bottom-[110px]  group-hover:bottom-[180px] sm:bottom-[110px]  sm:group-hover:bottom-[180px] md:bottom-[120px]  md:group-hover:bottom-[180px]  lg:bottom-[120px]lg:group-hover:bottom-[180px] transition-all duration-300 delay-[60ms] text-white">
            {trip.adultPrice}$/ {t(`tripInfo.tripTime.${trip.time}`)}
          </h3>
          <h4 className="absolute bottom-[30px] start-0 end-0 text-white text-3xl my-2 line-clamp-2 group-hover:bottom-[80px] transition-all duration-300 delay-[50ms] ">
            {trip.name}
          </h4>
          <button className="absolute py-2 px-5 bg-main text-white bottom-[-50px] opacity-0 group-hover:bottom-[30px] group-hover:opacity-[1] transition-all  duration-500 delay-[30ms]">
            {t("tripInfo.exploreButtonLabel")}
          </button>
        </div>
      </Link>
    </motion.div>
  );
}
