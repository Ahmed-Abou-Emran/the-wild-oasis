import React from "react";
import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addCabin } from "../../services/apiCabins";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  justify-content: center;
  align-items: center;
  padding: 2.4rem;
`;

function CreateCabinForm() {
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const [showform, setShowForm] = React.useState(false);
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: addCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    console.log(data);
    mutate({ ...data, image: data.image[0] });
  }

  return (
    <Container>
      {!showform && (
        <Button onClick={() => setShowForm(true)}>Create A Cabin</Button>
      )}
      {showform && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormRow label="Cabin name" error={errors?.name?.message}>
            <Input
              type="text"
              id="name"
              {...register("name", {
                required: "This field is required",
              })}
            />
          </FormRow>

          <FormRow
            label="Maximum capacity"
            error={errors?.maxCapacity?.message}
          >
            <Input
              type="number"
              id="maxCapacity"
              {...register("maxCapacity", {
                required: "This field is required",
                min: {
                  value: 1,

                  message: "Minimum capacity is 1",
                },
              })}
            />
          </FormRow>

          <FormRow label="Regular price" error={errors?.regularPrice?.message}>
            <Input
              type="number"
              id="regularPrice"
              {...register("regularPrice", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "Minimum price is 1",
                },
              })}
            />
          </FormRow>

          <FormRow label="Discount" error={errors?.discount?.message}>
            <Input
              type="number"
              id="discount"
              defaultValue={0}
              {...register("discount", {
                required: "This field is required",
                min: {
                  value: 0,
                  message: "Minimum discount is 0",
                },
                validate: (value) =>
                  +value <= +getValues().regularPrice ||
                  "Discount should be less than regular price",
              })}
            />
          </FormRow>

          <FormRow
            label="Description for website"
            error={errors?.description?.message}
          >
            <Textarea
              type="number"
              id="description"
              defaultValue=""
              {...register("description", {
                required: "This field is required",
              })}
            />
          </FormRow>

          <FormRow label="Cabin photo">
            <FileInput id="image" accept="image/*" {...register("image")} />
          </FormRow>

          <FormRow>
            <Button
              variation="secondary"
              onClick={() => {
                setShowForm(false);
              }}
              type="reset"
            >
              Cancel
            </Button>
            <Button type="submit"> {"Add Cabin"}</Button>
          </FormRow>
        </Form>
      )}
    </Container>
  );
}

export default CreateCabinForm;
