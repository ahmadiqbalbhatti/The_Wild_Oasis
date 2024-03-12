import {useParams} from "react-router-dom";
import {getBooking} from "../../services/apiBookings.js";
import {useQuery} from "@tanstack/react-query";

export function useGetABooking() {
  const {bookingId} = useParams();
  const {
          isLoading, data: booking, error
        }           = useQuery({
    queryKey: ["bookings", bookingId], queryFn: () => getBooking(bookingId),
    retry   : false,
  });

  return {isLoading, error, booking};
}
