export const options = [
  { value: "en-US", label: "En" },
  { value: "ru-RU", label: "Ru" },
];

export const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "transparent",
    border: "none",
    boxShadow: "none",
    minHeight: "30px",
    display: "flex",
    flexDirection: "row-reverse",
    cursor: "pointer",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "white",
    fontSize: "16px",
  }),
  input: (provided: any) => ({
    ...provided,
    color: "white",
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "#2a2a2a",
    borderRadius: "8px",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ? "#fff" : "#ddd",
    backgroundColor: state.isSelected ? "#ff4500" : "transparent",
    padding: "10px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: "white",
  }),
};
