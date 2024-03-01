import TableOperations from "../../ui/TableOperations.jsx";
import Filter from "../../ui/Filter.jsx";
import SortBy from "../../ui/SortBy.jsx";

function CabinTableOperations() {
  const filterOptions = [
    {
      value: "all", label: "All"
    }, {
      value: "no-discount", label: "No Discount"
    }, {
      value: "with-discount", label: "With Discount"
    }
  ];

  const sortByOptions = [
    {value: "name-asc", label: "Sort by name (A-Z)"},
    {value: "name-desc", label: "Sort by name (Z-A)"},
    {value: "regularPrice-asc", label: "Sort by price (Low ➡ High)"},
    {value: "regularPrice-desc", label: "Sort by price (High ➡ Low)"},
    {value: "maxCapacity-asc", label: "Sort by capacity (Low ➡ High)"},
    {value: "maxCapacity-desc", label: "Sort by capacity (High ➡ Low)"}
  ];

  return (
    <TableOperations>
      <Filter filterField={"discount"} options={filterOptions}/>

      <SortBy options={sortByOptions}/>
    </TableOperations>
  );
}

export default CabinTableOperations;
