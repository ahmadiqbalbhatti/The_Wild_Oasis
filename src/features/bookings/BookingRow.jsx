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
import {HiArrowDownOnSquare, HiArrowUpOnSquare, HiTrash} from "react-icons/hi2";
import {useCheckOut} from "../check-in-out/useCheckOut.js";
import {useDeleteBooking} from "./useDeleteBooking.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";

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
	const {checkout, isCheckingIn} = useCheckOut();
	const {isDeleting, deleteBooking} = useDeleteBooking();

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
          {isToday(new Date(startDate)) ? "Today" : formatDistanceFromNow(
	          startDate)}{" "}
	        &rarr; {numNights} night stay
        </span>
				<span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
					{format(new Date(endDate), "MMM dd yyyy")}
        </span>
			</Stacked>

			<Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

			<Amount>{formatCurrency(totalPrice)}</Amount>
			<Modal>
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

						{
							status === "checked-in" &&
							<Menus.Button
								icon={<HiArrowUpOnSquare/>}
								onClick={() => checkout(bookingId)}
								disabled={isCheckingIn}
							>
								Check Out
							</Menus.Button>
						}

						<Modal.Open opens={'delete' }>
							<Menus.Button
								icon={<HiTrash/>}
								disabled={isDeleting}
							>
								Delete
							</Menus.Button>
						</Modal.Open>
					</Menus.List>
				</Menus.Menu>

				<Modal.Window name={"delete"}>
					<ConfirmDelete resourceName={'booking'} onConfirm={() => deleteBooking(bookingId)}/>
 				</Modal.Window>
			</Modal>
		</Table.Row>
	);
}

export default BookingRow;
