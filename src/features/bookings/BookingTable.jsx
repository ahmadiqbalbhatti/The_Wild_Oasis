/* eslint-disable no-mixed-spaces-and-tabs */
import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import {useGetBookings} from "./useGetBookings.js";
import Spinner from "../../ui/Spinner.jsx";
import Pagination from "../../ui/Pagination.jsx";


function BookingTable() {
  const {isLoading, data} = useGetBookings();

  if (isLoading) return <Spinner/>;
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
          data={data.data}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking}/>
          )}
        />
        <Table.Footer>
          <Pagination count={data.count}/>
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
