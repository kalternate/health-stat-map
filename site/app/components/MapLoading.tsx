export default function MapLoading() {
  return (
    <div className="flex h-full grow flex-row items-center justify-center bg-zinc-200">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-center">
          <img className="h-48 w-48 animate-spin" src="/images/spinner.png" />
        </div>
        <h1 className="text-3xl font-light text-zinc-600">Loading map...</h1>
      </div>
    </div>
  );
}
