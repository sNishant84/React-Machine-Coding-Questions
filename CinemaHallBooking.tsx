import React,{ useState } from "react";

// Define seat types with prices & colors
const seatTypes = {
  REGULAR: { label: "Regular", price: 10, color: "#6c757d" },
  PREMIUM: { label: "Premium", price: 15, color: "#007bff" },
  VIP: { label: "VIP", price: 25, color: "#ffc107" },
};

// Cinema configuration
const ROWS = [
  { id: "A", type: "REGULAR" },
  { id: "B", type: "REGULAR" },
  { id: "C", type: "PREMIUM" },
  { id: "D", type: "PREMIUM" },
  { id: "E", type: "VIP" },
  { id: "F", type: "VIP" },
];
const SEATS_PER_ROW = 12;

// Example of booked seats
const bookedSeats = ["A3", "A4", "C6", "E1", "E2", "F10"];

const CinemaHallBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (seatId) => {
    if (bookedSeats.includes(seatId)) return; // booked
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  // Calculate total based on seat types
  const total = selectedSeats.reduce((sum, seatId) => {
    const rowLetter = seatId[0];
    const rowConfig = ROWS.find((r) => r.id === rowLetter);
    return sum + seatTypes[rowConfig.type].price;
  }, 0);

  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat!");
      return;
    }
    alert(`🎟️ Seats booked: ${selectedSeats.join(", ")}\nTotal: $${total}`);
    setSelectedSeats([]);
  };

  return (
    <div className="cinema-container">
      <h2>🎬 Cinema Hall Booking</h2>
      <div className="screen">SCREEN</div>

      <div className="seats-grid">
        {ROWS.map((row) => (
          <div key={row.id} className="seat-row">
            {Array.from({ length: SEATS_PER_ROW }, (_, idx) => {
              const seatNumber = idx + 1;
              const seatId = `${row.id}${seatNumber}`;
              const isBooked = bookedSeats.includes(seatId);
              const isSelected = selectedSeats.includes(seatId);

              // Aisle space between groups
              const isAisle = seatNumber === 6; // creates a middle aisle

              return (
                <React.Fragment key={seatId}>
                  {isAisle && <div className="aisle"></div>}
                  <div
                    className={`seat ${
                      isBooked ? "booked" : isSelected ? "selected" : ""
                    }`}
                    style={{
                      backgroundColor: isBooked
                        ? "#444"
                        : isSelected
                        ? seatTypes[row.type].color
                        : "#e0e0e0",
                      borderColor: seatTypes[row.type].color,
                    }}
                    onClick={() => toggleSeat(seatId)}
                  >
                    {seatId}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        ))}
      </div>

      <div className="legend">
        {Object.entries(seatTypes).map(([key, val]) => (
          <div key={key} className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: val.color }}
            ></div>
            <span>
              {val.label} (${val.price})
            </span>
          </div>
        ))}
      </div>

      <div className="summary">
        <p>Selected Seats: {selectedSeats.join(", ") || "None"}</p>
        <p>Total: ${total}</p>
        <button onClick={handleConfirm}>Confirm Booking</button>
      </div>
    </div>
  );
};

export default CinemaHallBooking;
