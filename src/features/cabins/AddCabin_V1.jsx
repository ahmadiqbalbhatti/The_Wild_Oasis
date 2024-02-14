import {useState} from "react";
import Button from "../../ui/Button.jsx";
import Modal from "../../ui/Modal.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);


  return (
    <div>
      <Button onClick={() => setIsOpenModal(show => !show)}>
        Add New Cabin
      </Button>

      {isOpenModal && <Modal onClose={() => setIsOpenModal(false)}>
        <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
      </Modal> }
      {/*{isOpenModal && <CreateCabinForm*/}
      {/*  onHandleShowForm={() => setIsOpenModal(show => !show)}*/}
      {/*  isOpenForm={isOpenModal}/>}*/}
    </div>
  );
}

export default AddCabin;
