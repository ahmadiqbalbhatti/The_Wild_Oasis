import {Heading} from "../ui/Heading";
import Row from "../ui/Row.jsx";
import {useEffect} from "react";
import {getCabins} from "../services/apiCabins.js";

function Cabins() {
  useEffect(() => {
    getCabins().then(data => console.log(data));
  }, []);

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img
        src="https://amkrkgrexshfpmnanhhv.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg"
        alt="Testing with supabase"/>
    </Row>
  );
}

export default Cabins;
