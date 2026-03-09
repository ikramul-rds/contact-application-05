import "./_tables.scss";
import { useContacts } from "../../context/ContactContext";

const FilterSection = () => {
  const { filterMethod, setFilterMethod } = useContacts();

  return (
    <div className="filter_section">
      <h3>Filters</h3>
      <select
        value={filterMethod}
        onChange={(e) => setFilterMethod(e.target.value)}
        className="filter-select"
      >
        <option value="">Default</option>
        <option value="asc">A to Z</option>
        <option value="desc">Z to A</option>
        <option value="none">Oldest first</option>
      </select>
    </div>
  );
};

export default FilterSection;
