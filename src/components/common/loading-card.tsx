export const LoadingSmallCards = () => {
  return (
    <div className="relative grid animate-pulse grid-cols-3 gap-4 md:grid-cols-4">
      <div className="h-[85px] rounded-lg bg-slate-50" />
      <div className="h-[85px] rounded-lg bg-slate-50" />
    </div>
  );
};

export const LoadingCard = () => {
  return (
    <div className="relative animate-pulse rounded-xl bg-white p-5 sm:p-4">
      <div className="grid gap-4 sm:grid-cols-5 sm:gap-6">
        <div className="h-40 rounded-xl bg-gray-100 sm:col-span-2"></div>
        <div className="space-y-3 sm:col-span-3">
          <div className="h-6 w-3/4 rounded-md bg-gray-100"></div>
          <div className="h-4 w-1/2 rounded-md bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
