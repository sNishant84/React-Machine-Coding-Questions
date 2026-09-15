import React, { useState } from "react";

export const sampleData = [
    { id: 1, name: "Alice", age: 25, email: "alice@example.com" },
    { id: 2, name: "Bob", age: 30, email: "bob@example.com" },
    { id: 3, name: "Charlie", age: 28, email: "charlie@example.com" },
    { id: 4, name: "David", age: 35, email: "david@example.com" },
    { id: 5, name: "Eve", age: 22, email: "eve@example.com" },
    // ...add more items for testing pagination
  ];

const Table = () => {
  const [data] = useState(sampleData);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  // 🟡 1. Filtering
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🟡 2. Sorting
  const sortedData = [...filteredData].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];

    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // 🟡 3. Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const currentData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // 🔁 Sort handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div>
      <h2>Data Table</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>ID</th>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("age")}>Age</th>
            <th onClick={() => handleSort("email")}>Email</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ marginTop: "1rem" }}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Prev
        </button>
        <span style={{ margin: "0 1rem" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
