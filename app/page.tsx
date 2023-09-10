import Booking from "@/app/components/booking/Booking";
import MapBox from "@/app/components/map/MapBox";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      <div className="shadow-2xl z-10">
        <Booking />
      </div>
      <div className="col-span-2">
        <MapBox />
      </div>
    </div>
  )
}
