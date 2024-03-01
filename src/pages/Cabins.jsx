/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */

import {Heading} from "../ui/Heading";
import Row from "../ui/Row.jsx";
import {
  useState
} from "react";
import CabinTable from "../features/cabins/CabinTable.jsx";
import Button from "../ui/Button.jsx";
import CreateCabinForm from "../features/cabins/CreateCabinForm.jsx";
import AddCabin from "../features/cabins/AddCabin.jsx";
import CabinTableOperations from "../features/cabins/CabinTableOperations.jsx";

function Cabins() {
  const [isOpenForm, setIsOpenForm] = useState(false);

  function handleShowForm() {
    setIsOpenForm(show => !show);
  }

  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <CabinTableOperations/>
      {/*<img*/}
      {/*  src="https://amkrkgrexshfpmnanhhv.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg"*/}
      {/*  alt="Testing with supabase"/>*/}
    </Row>

      <Row>
        <CabinTable onHandleShowForm={handleShowForm} isOpenForm={isOpenForm}/>

        <AddCabin/>
{/*        <Button onClick={handleShowForm}>Add New Cabin</Button>

        {isOpenForm && <CreateCabinForm onHandleShowForm={handleShowForm} isOpenForm={isOpenForm} />}*/}
      </Row>
    </>
  );
}

export default Cabins;
