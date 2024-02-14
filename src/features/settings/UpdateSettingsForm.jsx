/* eslint-disable no-mixed-spaces-and-tabs */

import Form from "../../ui/Form";
import FormRow from "../../ui/StyledFormRow.jsx";
import {Input} from "../../ui/Input.jsx";
import {useSettings} from "./useSettings.js";
import Spinner from "../../ui/Spinner.jsx";
import {useUpdateSetting} from "./useUpdateSetting.js";

function UpdateSettingsForm() {
  const {
          isLoading,
          settings: {
            minBookingLength,
            maxBookingLength,
            minGuestsPerBooking,
            breakfastPrice
          } = {}
        }                           = useSettings();
  const {isUpdating, updateSetting} = useUpdateSetting();

  if (isLoading) return <Spinner/>;

  function handleUpdate(event, field) {
    const {value} = event.target;
    if (!value) return;
    updateSetting({[field]: value});
  }

  return (
    <>
      <Form>
        <FormRow label="Minimum nights/booking">
          <Input type="number" id="min-nights"
                 defaultValue={minBookingLength}
                 disabled={isUpdating}
                 onBlur={(e) => handleUpdate(e, "minBookingLength")}
          />
        </FormRow>
        <FormRow label="Maximum nights/booking">
          <Input type="number" id="max-nights"
                 defaultValue={minGuestsPerBooking} disabled={isUpdating}
                 onBlur={(e) => handleUpdate(e, "minGuestsPerBooking")}
          />
        </FormRow>
        <FormRow label="Maximum guests/booking">
          <Input type="number" id="max-guests" defaultValue={maxBookingLength}
                 disabled={isUpdating}
                 onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          />
        </FormRow>
        <FormRow label="Breakfast price">
          <Input type="number" id="breakfast-price"
                 defaultValue={breakfastPrice} disabled={isUpdating}
                 onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          />
        </FormRow>
      </Form>
    </>
  );
}

export default UpdateSettingsForm;
