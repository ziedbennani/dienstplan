import React, { useState, useEffect } from "react";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [day, setDay] = useState("monday");
  const [availability, setAvailability] = useState("green");

  useEffect(() => {
    async function fetchEmployees() {
      const res = await fetch(
        `/api/employees?day=${day}&availability=${availability}`
      );
      const data = await res.json();
      setEmployees(data);
      setLoading(false);
    }

    fetchEmployees();
  }, [day, availability]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Available Employees</h1>
      <label>
        Day:
        <select value={day} onChange={(e) => setDay(e.target.value)}>
          <option value="monday">Monday</option>
          <option value="tuesday">Tuesday</option>
          <option value="wednesday">Wednesday</option>
          <option value="thursday">Thursday</option>
          <option value="friday">Friday</option>
          <option value="saturday">Saturday</option>
          <option value="sunday">Sunday</option>
        </select>
      </label>
      <label>
        Availability:
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}>
          <option value="green">Green</option>
          <option value="red">Red</option>
        </select>
      </label>
      <ul>
        {/* {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} {employee.surname} - Availability: {employee.availability.join(", ")}
          </li>
        ))} */}
      </ul>
    </div>
  );
}
