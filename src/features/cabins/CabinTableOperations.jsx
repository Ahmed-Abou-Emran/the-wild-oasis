import React from "react";
import TabeleOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import Select from "../../ui/Select";

const filterOptions = [
  { value: "all", label: "All" },
  { value: "with-discount", label: "With Discount" },
  { value: "without-discount", label: "Without Discount" },
];

const selectOptions = [
  { value: "name-asc", label: "Sort by name (A-Z)" },
  { value: "name-desc", label: "Sort by name (Z-A)" },
  { value: "regularPrice-asc", label: "Sort by price (low first)" },
  { value: "regularPrice-desc", label: "Sort by price (high first)" },
  { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
  { value: "maxCapacity-desc", label: "Sort by capacity (high first)" },
];

function CabinTableOperations() {
  return (
    <TabeleOperations>
      <Filter filter="discount" options={filterOptions} />
      <Select type="white" options={selectOptions} filter="sortBy" />
    </TabeleOperations>
  );
}

export default CabinTableOperations;
