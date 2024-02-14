import {useGetCabins} from "./useGetCabins.js";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table.jsx";
import CabinRow from "./CabinRow.jsx";
import Menus from "../../ui/Menus.jsx";

function CabinTable({isOpenForm, onHandleShowForm}) {
  const {isLoading, cabins} = useGetCabins();

  if (isLoading) return <Spinner/>;

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

        <Table.Body data={cabins}
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
