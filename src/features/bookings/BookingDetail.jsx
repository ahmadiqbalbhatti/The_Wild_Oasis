import styled from "styled-components";

import {useNavigate} from "react-router-dom";
import {useMoveBack} from "../../hooks/useMoveBack";
import {useGetABooking} from "./useGetABooking.js";
import {useCheckOut} from "../check-in-out/useCheckOut.js";
import {useDeleteBooking} from "./useDeleteBooking.js";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import {Heading} from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
	const {booking, isLoading} = useGetABooking();
	const {checkout, isCheckingOut} = useCheckOut();
	const {deleteBooking, isDeleting} = useDeleteBooking();

	const moveBack = useMoveBack();
	const navigate = useNavigate();

	if (isLoading) return <Spinner/>;

	const {status, id: bookingId} = booking;

	const statusToTagName = {
		unconfirmed: "blue", "checked-in": "green", "checked-out": "silver"
	};

	return (<Modal>
		<Row type="horizontal">
			<HeadingGroup>
				<Heading as="h1">Booking #{bookingId}</Heading>
				<Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
			</HeadingGroup>
			<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
		</Row>

		<BookingDataBox booking={booking}/>

		<ButtonGroup>

			{status === "unconfirmed" && (
				<Button onClick={() => navigate(`/checkin/${bookingId}`)}>
					Check in
				</Button>)}

			{status === "checked-in" && (<Button
				onClick={() => checkout(bookingId)}
				disabled={isCheckingOut}
			>
				Check out
			</Button>)}
			<Button variation="secondary" onClick={moveBack}>
				Back
			</Button>
			<Modal.Open opens={"delete"}>
				<Button variation="danger" disabled={isDeleting}>
					Delete
				</Button>
			</Modal.Open>
		</ButtonGroup>

		<Modal.Window name={"delete"}>
			<ConfirmDelete resourceName={"bookings"} onConfirm={() => deleteBooking(bookingId)} disabled={isDeleting}/>

		</Modal.Window>
	</Modal>);
}

export default BookingDetail;
