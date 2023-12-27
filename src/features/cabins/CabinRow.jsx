/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import styled from "styled-components";
import {useState} from "react";

import CreateCabinForm from "./CreateCabinForm.jsx";

import {formatCurrency} from "../../utils/helpers.js";
import {useDeleteCabin} from "./useDeleteCabin.js";
import {HiSquare2Stack} from "react-icons/hi2";
import {HiPencilAlt, HiTrash} from "react-icons/hi";
import {useCreateCabin} from "./useCreateCabin.js";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;
/*

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;
*/

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono", serif;
`;

const Price = styled.div`
  font-family: "Sono", sans-serif;
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono", sans-serif;
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({cabin}) {
    const [showForm, setShowForm] = useState(false)
    const {
        id: cabinId, name, maxCapacity, regularPrice, discount, image, description
    } = cabin;

    const {createCabin, isCreating} = useCreateCabin()

    function handleDuplicateCabin() {
        createCabin({name: `Copy of ${name}`, maxCapacity, regularPrice, discount, image, description})
    }

    const {isDeleting, deleteCabin} = useDeleteCabin();

    return (
        <>
            <TableRow role={"row"}>
                <img src={image} alt={description}/>
                <Cabin>{name}</Cabin>
                <div>Fits upto {maxCapacity} guests</div>
                <Price>{formatCurrency(regularPrice)}</Price>
                {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
                {/*{isLoading ? <Spinner/> :
				 <button onClick={() => mutate(cabinId)}>Delete</button>
				 }*/}


                <div>
                    <button disabled={isCreating} onClick={handleDuplicateCabin}>
                        <HiSquare2Stack/>
                    </button>
                    <button
                        onClick={() => setShowForm((show) => !show)}>
                        <HiPencilAlt/>
                    </button>
                    <button
                        onClick={() => deleteCabin(cabinId)} disabled={isDeleting}>
                        <HiTrash/>
                    </button>
                </div>

            </TableRow>

            {showForm && <CreateCabinForm cabinToEdit={cabin}/>}
        </>
    );
}

export default CabinRow;
