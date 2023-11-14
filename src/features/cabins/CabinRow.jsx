/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import styled from "styled-components";
import {formatCurrency} from "../../utils/helpers.js";
import {deleteCabin} from "../../services/apiCabins.js";
import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import toast from "react-hot-toast";

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

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

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
  const {
          id: cabinId,
          name,
          maxCapacity,
          regularPrice,
          discount,
          image,
          description
        } = cabin;

  const queryClient = useQueryClient();

  const {isLoading: isDeleting, mutate} = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess : () => {
      toast.success("Cabin successfully deleted.")
      queryClient.invalidateQueries({
        queryKey: ["cabins"]
      });
    },
    onError   : error => toast.error(error.message)
  });

  return (
    <TableRow role={"row"}>
      <img src={image} alt={description}/>
      <Cabin>{name}</Cabin>
      <div>Fits upto {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      {/*{isLoading ? <Spinner/> :
       <button onClick={() => mutate(cabinId)}>Delete</button>
       }*/}

      <button onClick={() => mutate(cabinId)} disabled={isDeleting}>Delete
      </button>

    </TableRow>
  );
}

export default CabinRow;
