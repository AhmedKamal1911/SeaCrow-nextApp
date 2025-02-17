import { useTranslations } from "next-intl";
import TripOverview from "./trip-overview";
import QuestionsList from "@/components/common/questions-list";

import { QuestionItem } from "@/lib/types/shared";
type Props = {
  questionsList: QuestionItem[];
};
export default function TripQuestionsBox({ questionsList }: Props) {
  const t = useTranslations();
  return (
    <>
      <TripOverview title={t("tripInfo.questionsIntroText")} />
      <QuestionsList list={questionsList} />
    </>
  );
}
