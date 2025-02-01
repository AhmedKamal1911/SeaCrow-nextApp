export default function TourPlanBox({ plan }: { plan: string }) {
  return (
    <div className="relative counter-increment group before:duration-500 before:text-6xl before:text-lightGray before:content-[counter(feature-counter,decimal-leading-zero)] hover:before:text-black p-7 flex flex-col sm:flex-row items-center gap-10 [&:not(:last-child)]:after:absolute [&:not(:last-child)]:after:bottom-0 [&:not(:last-child)]:after:end-0 [&:not(:last-child)]:after:h-[1px] [&:not(:last-child)]:after:bg-lightGray [&:not(:last-child)]:after:w-[100vw]">
      <p className="text-center sm:text-start text-xl">{plan}</p>
    </div>
  );
}
