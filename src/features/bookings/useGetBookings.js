import {useQuery} from "@tanstack/react-query";
import {getBookings} from "../../services/apiBookings.js";

export function useGetBookings() {
  const {
          isLoading,
          data: bookings,
          error
        } = useQuery({
    queryKey: ["bookings"],
    queryFn : getBookings
  });

  return {isLoading, error, bookings};
}
