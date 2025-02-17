type Props = {
  price: string | number;
  age: string;
};
export default function TripPriceDetail({ age, price }: Props) {
  return (
    <div className="flex gap-3">
      <span className="text-2xl sm:text-3xl font-bold">${price}</span>
      <span className="self-end text-grayDesc whitespace-nowrap font-semibold text-[18px]">
        / {age}
      </span>
    </div>
  );
}
