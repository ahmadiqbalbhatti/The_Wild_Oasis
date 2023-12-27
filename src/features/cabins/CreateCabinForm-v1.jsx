/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */

import {useForm} from "react-hook-form";
import {
	useMutation, useQueryClient
} from "@tanstack/react-query";
import {createEditCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";
import FormRow from "../../ui/StyledFormRow.jsx";

import Button from "../../ui/Button.jsx";
import FileInput from "../../ui/FileInput.jsx";
import Textarea from "../../ui/Textarea.jsx";
import styled from "styled-components";
import Form from "../../ui/Form";

import {Input} from "../../ui/Input";

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

function CreateCabinForm() {

	const {register, handleSubmit, reset, getValues, formState} = useForm();
	const queryClient = useQueryClient();

	const {errors} = formState;

	const {mutate, isLoading: isCreating} = useMutation({
		mutationFn: createEditCabin, onSuccess: () => {
			toast.success("New cabin successfully created");
			queryClient.invalidateQueries({
				queryKey: ["cabins"]
			});
			reset();
		},
		onError: error => toast.error(error.message)
	});

	function onSubmit(data) {
		// console.log(data)
		mutate({...data, image: data.image[0]});
	}

	function onError(error) {
		console.log(error);
	}

	return (<Form onSubmit={handleSubmit(onSubmit, onError)}>
		<FormRow label={"Cabin Name"} error={errors?.name?.message}>
			<Input type="text" id="name"
			       {...register("name", {
				       required: "This field is required", maxLength: {
					       value: 25, message: "Name should contain maximum 25 characters"
				       }
			       })} disabled={isCreating}/>
		</FormRow>

		<FormRow label={"Maximum Capacity"} error={errors?.maxCapacity?.message}>
			<Input type="number" id="maxCapacity" {...register("maxCapacity", {
				required: "This field is required", min: {
					value: 1, message: "Capacity should be at least 1"
				}
			})} disabled={isCreating}/>
		</FormRow>

		<FormRow label={"Regular Price"} error={errors?.regularPrice?.message}>
			<Input type="number" id="regularPrice" {...register("regularPrice", {
				required: "This field is required", min: {
					value: 1, message: "Capacity should be at least 1"
				}
			})} disabled={isCreating}/>
		</FormRow>

		<FormRow label={"Discount"} error={errors?.discount?.message}>
			<Input type="number" id="discount" disabled={isCreating}
			       defaultValue={0} {...register("discount", {
				required: "This field is required",
				validate: (value) => value <= getValues().regularPrice || "Discount should be less than the regular price."
			})}/>
		</FormRow>

		<FormRow label={"Description for website"}
		         error={errors?.description?.message}>
			<Textarea type="number" id="description" disabled={isCreating}
			          defaultValue="" {...register("description", {
				required: "This field is required"
			})} />
		</FormRow>

		<FormRow label={"Cabin photo"}>
			<FileInput id="image" disabled={isCreating} accept="image/*"
			           type={"file"} {...register("image",
				{required: "This field is Required"}
			)}
			/>
		</FormRow>


		<BtnFormRow>
			type is an HTML attribute!
			<Button variation="secondary" disabled={isCreating} type="reset">
				Cancel
			</Button>
			<Button disabled={isCreating}>Create cabin</Button>
		</BtnFormRow>
	</Form>);
}

export default CreateCabinForm;
