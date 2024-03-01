import {useGetCabins} from "./useGetCabins.js";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table.jsx";
import CabinRow from "./CabinRow.jsx";
import Menus from "../../ui/Menus.jsx";
import {useSearchParams} from "react-router-dom";

function CabinTable({isOpenForm, onHandleShowForm}) {
  const {isLoading, cabins} = useGetCabins();
  const [searchParams]      = useSearchParams();

  if (isLoading) return <Spinner/>;

  // Filtering
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "with-discount") filteredCabins = cabins.filter(cabin => cabin.discount !== 0);
  if (filterValue === "no-discount") filteredCabins = cabins.filter(cabin => cabin.discount === 0);

  // Sorting
  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  const [field, direction] = sortBy.split("-");
  console.log(field, direction);
  const modifier     = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a, b) => (
                                                       a[field] - b[field]
                                                     ) * modifier);
  console.log(sortedCabins);

  return (
    <Menus>
      <Table columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body data={sortedCabins}
                    render={(cabin) => (
                      <CabinRow cabin={cabin} key={cabin.id}
                                onHandleShowForm={onHandleShowForm}
                                isOpenForm={isOpenForm}/>
                    )}/>
      </Table>
    </Menus>
  );
}

export default CabinTable;
