import { List } from "react-window";

function Row({ index, style, rows }) {
  const row = rows[index];
  const values = Object.values(row);

  return (
    <div
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        padding: "0 10px",
        borderBottom: "1px solid #444",
        boxSizing: "border-box",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
      title={values.join(" | ")}
    >
      {values.join(" | ")}
    </div>
  );
}

function DataGrid({ rows }) {
  if (!rows || rows.length === 0) {
    return (
      <div>
        <h2>Data Preview</h2>
        <p> No Files have been Uploaded yet .. </p>
      </div>
    );
  }

  return (
    <div>
      <h2>Data Preview ({rows.length} rows)</h2>

      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
          border: "1px solid #555",
          overflow: "hidden",
        }}
      >
        <List
          rowComponent={Row}
          rowCount={rows.length}
          rowHeight={40}
          rowProps={{ rows }}
          style={{
            height: 400,
            width: "100%",
          }}
        />
      </div>
    </div>
  );
}

export default DataGrid;