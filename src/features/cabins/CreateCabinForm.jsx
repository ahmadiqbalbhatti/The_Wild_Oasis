/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */

import {useForm} from "react-hook-form";
import FormRow from "../../ui/StyledFormRow.jsx";

import Button from "../../ui/Button.jsx";
import FileInput from "../../ui/FileInput.jsx";
import Textarea from "../../ui/Textarea.jsx";
import styled from "styled-components";
import Form from "../../ui/Form";

import {Input} from "../../ui/Input";
import {useCreateCabin} from "./useCreateCabin.js";
import {useEditCabin} from "./useEditCabin.js";

const BtnFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

// eslint-disable-next-line react/prop-types
function CreateCabinForm({cabinToEdit = {}}) {
    // Getting to know if it is editing session or not
    const {id: editId, ...editValues} = cabinToEdit;
    const isEditSession = Boolean(editId);

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState
    } = useForm({
        defaultValues: isEditSession ? editValues : {}
    });
    const {errors} = formState;

    // Hooks that are used to create and edit cabin data
    const {isCreating, createCabin} = useCreateCabin();
    const {isEditing, editCabin} = useEditCabin();

    const isWorking = isCreating || isEditing


    // Function to handle form submission
    function onSubmit(data) {
        const image = typeof data.image === "string" ? data.image : data.image[0]
        if (isEditSession) {
            editCabin({newCabinData: {...data, image}, id: editId}, {onSuccess: () => reset()})
        } else {
            createCabin({...data, image: image}, {onSuccess: () => reset()});
        }
    }

    function onError(error) {
        console.log(error);
    }

    return (<Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label={"Cabin Name"} error={errors?.name?.message}>
            <Input type="text" id="name"
                   {...register("name", {
                       required: "This field is required", maxLength: {
                           value: 25,
                           message: "Name should contain maximum 25 characters"
                       }
                   })} disabled={isWorking}/>
        </FormRow>

        <FormRow label={"Maximum Capacity"}
                 error={errors?.maxCapacity?.message}>
            <Input type="number" id="maxCapacity" {...register("maxCapacity", {
                required: "This field is required", min: {
                    value: 1, message: "Capacity should be at least 1"
                }
            })} disabled={isWorking}/>
        </FormRow>

        <FormRow label={"Regular Price"} error={errors?.regularPrice?.message}>
            <Input type="number"
                   id="regularPrice" {...register("regularPrice", {
                required: "This field is required", min: {
                    value: 1, message: "Capacity should be at least 1"
                }
            })} disabled={isWorking}/>
        </FormRow>

        <FormRow label={"Discount"} error={errors?.discount?.message}>
            <Input type="number" id="discount" disabled={isWorking}
                   defaultValue={0} {...register("discount", {
                required: "This field is required",
                validate: (value) => value <= getValues().regularPrice || "Discount should be less than the regular price."
            })}/>
        </FormRow>

        <FormRow label={"Description for website"}
                 error={errors?.description?.message}>
            <Textarea type="number" id="description" disabled={isWorking}
                      defaultValue="" {...register("description", {
                required: "This field is required"
            })} />
        </FormRow>

        <FormRow label={"Cabin photo"}>
            <FileInput id="image" disabled={isWorking} accept="image/*"
                       type={"file"} {...register("image", {
                required: isEditSession ? false : "This field is Required"
            })}
            />
        </FormRow>

        <BtnFormRow>
            type is an HTML attribute!
            <Button variation="secondary" disabled={isWorking} type="reset">
                Cancel
            </Button>
            <Button disabled={isWorking}>
                {isEditSession ? "Edit Cabin" : "Create New Cabin"}
            </Button>
        </BtnFormRow>
    </Form>);
}

export default CreateCabinForm;
