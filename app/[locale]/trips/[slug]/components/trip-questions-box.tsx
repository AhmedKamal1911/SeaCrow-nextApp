import { useTranslations } from "next-intl";
import TripOverview from "./trip-overview";
import QuestionsList from "@/components/common/questions-list";
import { FaqsPageDataType } from "@/lib/validations/faqPageDataValidation";
type Props = {
  questionsList: FaqsPageDataType["faqsList"];
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
