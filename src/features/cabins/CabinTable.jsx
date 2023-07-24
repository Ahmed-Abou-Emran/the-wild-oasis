import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { cabins, isLoading } = useCabins();
  const currentFilter = searchParams.get("discount");

  const filteredCabins = cabins?.filter((cabin) => {
    if (currentFilter === "all" || !currentFilter) {
      return true;
    }
    if (currentFilter === "with-discount") {
      return cabin.discount > 0;
    }
    if (currentFilter === "without-discount") {
      return cabin.discount === 0;
    }
  });

  const currentSort = searchParams?.get("sortBy")?.split("-") || [
    "name",
    "asc",
  ];
  let sortedCabins = filteredCabins?.sort((a, b) => {
    if (currentSort[1] === "asc") {
      return a[currentSort[0]] - b[currentSort[0]];
    }
    if (currentSort[1] === "desc") {
      return b[currentSort[0]] - a[currentSort[0]];
    }
  });

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
