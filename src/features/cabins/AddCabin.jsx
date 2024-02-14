import Modal from "../../ui/Modal.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";
import Button from "../../ui/Button.jsx";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens={"cabin-form"}>
          <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window name={"cabin-form"}>
          <CreateCabinForm/>
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
