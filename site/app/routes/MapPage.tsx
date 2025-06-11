import { lazy, Suspense } from "react";
import MapLoading from "~/components/MapLoading";

export default function MapPage() {
  const MapPageContent = lazy(() => import("~/components/MapPageContent"));

  return (
    <Suspense fallback={<MapLoading />}>
      <MapPageContent />
    </Suspense>
  );
}
