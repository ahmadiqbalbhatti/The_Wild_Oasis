import {
  useQuery,
  useQueryClient
} from "@tanstack/react-query";
import {getBookings} from "../../services/apiBookings.js";
import {useSearchParams} from "react-router-dom";
import {PAGE_SIZE} from "../../utils/constant.js";

export function useGetBookings() {
  const queryClient    = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTERING
  const filterValue = searchParams.get("status");
  const filter      = !filterValue || filterValue === "all" ? null : {
    field: "status",
    value: filterValue
  };

  // SORTING
  const sortByRaw          = searchParams.get("sortBy") || "startDate-decs";
  const [field, direction] = sortByRaw.split("-");
  const sortBy             = {field, direction};

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));


  const {
          isLoading,
          data,
          error
        } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn : () => getBookings({filter, sortBy, page})
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(page / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn : () => getBookings({filter, sortBy, page: page + 1})
    });
  }
  return {isLoading, error, data};
}
