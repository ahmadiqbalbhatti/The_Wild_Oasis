/* eslint-disable no-mixed-spaces-and-tabs */
import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import {useGetBookings} from "./useGetBookings.js";
import Spinner from "../../ui/Spinner.jsx";
import {useSearchParams} from "react-router-dom";

function BookingTable() {
  const {isLoading, bookings} = useGetBookings();
  const [searchParams]        = useSearchParams();


  if (isLoading) return <Spinner/>;

  /**
   *Client Side Filtering and Sorting method.
   * */
  const filterValue = searchParams.get("status") || "all";
  let filteredBookings;

  if (filterValue === "all") filteredBookings = bookings;
  if (filterValue === "unconfirmed") filteredBookings = bookings.filter(booking => booking.status === filterValue);
  if (filterValue === "checked-in") filteredBookings = bookings.filter(booking => booking.status === filterValue);
  if (filterValue === "checked-out") filteredBookings = bookings.filter(booking => booking.status === filterValue);

  // Sorting
  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  const [field, direction] = sortBy.split("-");
  console.log(field, direction);
  const modifier       = direction === "asc" ? 1 : -1;
  const sortedBookings = filteredBookings.sort((a, b) => (
                                                           a[field] - b[field]
                                                         ) * modifier);
  console.log(sortedBookings);


  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={filteredBookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking}/>
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
