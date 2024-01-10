export const Filter = ({ filter, changeFilterInput }) => (
  <label>
    Contact
    <input
      type="text"
      name={filter}
      onChange={changeFilterInput}
      placeholder="Find contacts by name"
    />
  </label>
);
