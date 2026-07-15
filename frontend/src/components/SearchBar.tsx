type Props = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

function SearchBar({ value, onChange, onSearch }: Props) {
  return (
    <div
      style={{
        maxWidth: "820px",
        margin: "0 auto",
        display: "flex",
        background: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 15px 40px rgba(0,0,0,.12)",
      }}
    >
      <input
        type="text"
        placeholder="Search by job title, company or location..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          padding: "20px",
          fontSize: "17px",
        }}
      />

      <button
        onClick={onSearch}
        style={{
          background: "#5B3DF5",
          color: "#fff",
          border: "none",
          padding: "0 32px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: 700,
        }}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;