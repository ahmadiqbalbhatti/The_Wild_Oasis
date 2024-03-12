/* eslint-disable no-mixed-spaces-and-tabs */
import styled from "styled-components";
import {
  format,
  isToday
} from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import {
  formatCurrency,
  formatDistanceFromNow
} from "../../utils/helpers";
import Menus from "../../ui/Menus.jsx";
import {HiEye} from "react-icons/hi";
import {useNavigate} from "react-router-dom";
import {HiArrowDownOnSquare} from "react-icons/hi2";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow(
  {
    booking: {
      id: bookingId,
      created_at,
      startDate,
      endDate,
      numNights,
      numGuests,
      totalPrice,
      status,
      guests,
      cabins
    }
  }) {
  const naviagate = useNavigate();

  const statusToTagName = {
    unconfirmed: "blue", "checked-in": "green", "checked-out": "silver"
  };

  return (
    <Table.Row>
      <Cabin>{cabins?.name}</Cabin>

      <Stacked>
        <span>{guests?.fullName}</span>
        <span>{guests?.email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate)) ? "Today" : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Menus.Menu>
        <Menus.Toggle id={bookingId}/>

        <Menus.List id={bookingId}>
          <Menus.Button
            icon={<HiEye/>}
            onClick={() => naviagate(`/bookings/${bookingId}`)}
          >
            See Details
          </Menus.Button>

          {
            status === "unconfirmed" &&
            <Menus.Button
              icon={<HiArrowDownOnSquare/>}
              onClick={() => naviagate(`/checkin/${bookingId}`)}
            >
              Check In
            </Menus.Button>
          }
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}

export default BookingRow;
