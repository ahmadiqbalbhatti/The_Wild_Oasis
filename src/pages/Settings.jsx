/* eslint-disable no-mixed-spaces-and-tabs */
import Row from "../ui/Row.jsx";
import {Heading} from "../ui/Heading.jsx";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm.jsx";

function Settings() {
  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm/>
    </Row>
  );
}

export default Settings;
