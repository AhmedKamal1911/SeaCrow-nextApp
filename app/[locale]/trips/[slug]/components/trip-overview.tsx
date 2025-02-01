type Props = {
  title: string;
  desc?: string;
};
export default function TripOverview({ desc, title }: Props) {
  return (
    <div className="mb-5">
      <h3 className="text-3xl text-center sm:text-start sm:text-4xl mb-5">
        {title}
      </h3>
      {desc && (
        <p className="text-[15px] lg:text-[18px] text-grayDesc leading-relaxed">
          {desc}
        </p>
      )}
    </div>
  );
}
