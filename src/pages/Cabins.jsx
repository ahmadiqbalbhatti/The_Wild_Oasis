/* eslint-disable no-unused-vars */
import {Heading} from "../ui/Heading";
import Row from "../ui/Row.jsx";
import {useEffect} from "react";
import {getCabins} from "../services/apiCabins.js";
import CabinTable from "../features/cabins/CabinTable.jsx";

function Cabins() {
  // useEffect(() => {
  //   getCabins().then(data => console.log(data));
  // }, []);

  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>Filter / Sort</p>
      {/*<img*/}
      {/*  src="https://amkrkgrexshfpmnanhhv.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg"*/}
      {/*  alt="Testing with supabase"/>*/}
    </Row>

      <Row>
        <CabinTable/>
      </Row>
    </>
  );
}

export default Cabins;
