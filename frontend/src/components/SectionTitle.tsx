type Props = {
  title: string;
  subtitle?: string;
};

function SectionTitle({ title, subtitle }: Props) {
  return (
    <div
      style={{
        marginBottom: "32px",
      }}
    >
      <h2
        style={{
          fontSize: "36px",
          fontWeight: 800,
          color: "#111827",
          marginBottom: "10px",
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          style={{
            color: "#6B7280",
            fontSize: "18px",
            margin: 0,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;