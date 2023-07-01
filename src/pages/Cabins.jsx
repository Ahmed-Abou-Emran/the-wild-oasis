import React from "react";
import Heading from "../ui/Heading";
import { toast } from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCabins, deleteCabin } from "../services/apiCabins";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import CabinRow from "../features/cabins/CabinRow";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Spinner from "../ui/Spinner";
function Cabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const queryClient = useQueryClient();
  const { mutate: mutateDelete, isLoading: isDeleting } = useMutation(
    deleteCabin,
    {
      onSuccess: () => {
        toast.success("Cabin deleted successfully");
        queryClient.invalidateQueries("cabins");
      },
      onError: (error) => {
        toast.error("Error deleting cabin: " + error.message);
      },
    }
  );

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable>
          {isLoading && <Spinner />}
          {error && <p>Something went wrong...</p>}
          {cabins &&
            cabins.map(
              ({
                id,
                name,
                maxCapacity,
                regularPrice,
                discount,
                description,
                image,
              }) => (
                <CabinRow
                  key={id}
                  id={name}
                  maxCapacity={maxCapacity}
                  regularPrice={regularPrice}
                  discount={discount}
                  description={description}
                  image={image}
                  onDelete={() => mutateDelete(id)}
                  isDeleting={isDeleting}
                />
              )
            )}
        </CabinTable>
      </Row>
      <CreateCabinForm />
    </>
  );
}

export default Cabins;
