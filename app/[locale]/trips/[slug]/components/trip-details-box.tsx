import { formatTime, getTimingSystem } from "@/lib/utils";
import { useTranslations } from "next-intl";

type Props = {
  tour: string;
  tourFrom: string;
  departureTime: string;
  departureTimeSystem: string;
  tripDays: string;
  returnTime: string;
  returnTimeSystem: string;
  maxGuests: string | number;
};
export default function TripDetailsBox({
  departureTime,
  departureTimeSystem,
  maxGuests,
  returnTime,
  returnTimeSystem,
  tour,
  tourFrom,
  tripDays,
}: Props) {
  const t = useTranslations();
  return (
    <div className="p-4 sm:p-6">
      <ul className="flex flex-col gap-5 sm:gap-7">
        <li className="flex flex-col sm:flex-row">
          <span className="text-xl sm:text-[21px] flex-1">
            {t("tripInfo.tripDetails.tourTitleText")} :
          </span>
          <span className="text-grayDesc flex-1 text-[16px] sm:text-[19px]">
            {tour}
          </span>
        </li>
        <li className="flex flex-col sm:flex-row">
          <span className="text-xl sm:text-[21px] flex-1">
            {t("tripInfo.tripDetails.tourFromText")} :
          </span>
          <span className="text-grayDesc flex-1 text-[16px] sm:text-[19px]">
            {tourFrom}
          </span>
        </li>
        <li className="flex flex-col sm:flex-row">
          <span className="text-xl sm:text-[21px] flex-1">
            {t("tripInfo.tripDetails.departureTimeText")} :
          </span>
          <span className="text-grayDesc flex-1 text-[16px] sm:text-[19px]">
            {`${formatTime(departureTime)} ${t(
              `global.timingSystem.${getTimingSystem(departureTimeSystem)}`
            )}`}
          </span>
        </li>
        <li className="flex flex-col sm:flex-row">
          <span className="text-xl sm:text-[21px] flex-1">
            {t("tripInfo.tripDetails.tripDaysText")} :
          </span>
          <span className="text-grayDesc flex-1 text-[16px] sm:text-[19px]">
            {t(`tripInfo.tripDays.${tripDays}`)}
          </span>
        </li>
        <li className="flex flex-col sm:flex-row">
          <span className="text-xl sm:text-[21px] flex-1">
            {t("tripInfo.tripDetails.returnTimeText")} :
          </span>
          <span className="text-grayDesc flex-1 text-[16px] sm:text-[19px]">
            {`${formatTime(returnTime)} ${t(
              `global.timingSystem.${getTimingSystem(returnTimeSystem)}`
            )}`}
          </span>
        </li>

        <li className="flex flex-col sm:flex-row">
          <span className="text-xl sm:text-[21px] flex-1">
            {t("tripInfo.tripDetails.maxGuestsText")} :
          </span>
          <span className="text-grayDesc flex-1 text-[16px] sm:text-[19px]">
            {maxGuests}
          </span>
        </li>
      </ul>
    </div>
  );
}
