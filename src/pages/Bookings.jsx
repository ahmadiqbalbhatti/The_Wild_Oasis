/* eslint-disable no-mixed-spaces-and-tabs */

import {Heading} from "../ui/Heading";
import Row from "../ui/Row.jsx";
import BookingTable from "../features/bookings/BookingTable.jsx";
import BookingTableOperations
  from "../features/bookings/BookingTableOperations.jsx";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>

        <BookingTableOperations/>
      </Row>
      <BookingTable/>
    </>
  );
}

export default Bookings;
