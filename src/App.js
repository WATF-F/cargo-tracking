import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CargoTable from "./components/CargoTable";
import AddCargoForm from "./components/AddCargoForm";

const App = () => {
  const [cargoList, setCargoList] = useState([
    {
      id: "CARGO001",
      name: "Строительные материалы",
      status: "В пути",
      origin: "Москва",
      destination: "Казань",
      departureDate: "2024-11-24",
    },
    {
      id: "CARGO002",
      name: "Хрупкий груз",
      status: "Ожидает отправки",
      origin: "Санкт-Петербург",
      destination: "Екатеринбург",
      departureDate: "2024-11-26",
    },
  ]);

  const [statusFilter, setStatusFilter] = useState("");

  const addCargo = (newCargo) => {
    setCargoList((prevList) => [...prevList, newCargo]);
  };

  const updateCargoStatus = (id, newStatus) => {
    setCargoList((prevList) =>
      prevList.map((cargo) =>
        cargo.id === id && cargo.status !== newStatus
          ? { ...cargo, status: newStatus }
          : cargo
      )
    );
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredCargoList = statusFilter
    ? cargoList.filter((cargo) => cargo.status === statusFilter)
    : cargoList;

  return (
    <div className="container mt-4">
      <h1>Отслеживание грузов</h1>
      <AddCargoForm addCargo={addCargo} />

      <div className="mb-3">
        <label htmlFor="statusFilter">Фильтровать по статусу:</label>
        <select
          id="statusFilter"
          className="form-select"
          value={statusFilter}
          onChange={handleStatusFilterChange}
        >
          <option value="">Все</option>
          <option value="Ожидает отправки">Ожидает отправки</option>
          <option value="В пути">В пути</option>
          <option value="Доставлен">Доставлен</option>
        </select>
      </div>

      <CargoTable
        cargoList={filteredCargoList}
        updateCargoStatus={updateCargoStatus}
      />
    </div>
  );
};

export default App;
