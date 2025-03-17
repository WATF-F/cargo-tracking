import React from "react";
import { Table } from "react-bootstrap";

const CargoTable = ({ cargoList, updateCargoStatus }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "Ожидает отправки":
        return "bg-warning text-dark"; // Желтый
      case "В пути":
        return "bg-primary text-white"; // Синий
      case "Доставлен":
        return "bg-success text-white"; // Зеленый
      default:
        return "";
    }
  };

  const handleStatusChange = (cargoId, newStatus) => {
    const cargo = cargoList.find((item) => item.id === cargoId);

    if (
      newStatus === "Доставлен" &&
      cargo.departureDate > new Date().toISOString().split("T")[0]
    ) {
      alert(
        "Нельзя установить статус 'Доставлен', если дата отправления находится в будущем."
      );
      return;
    }

    updateCargoStatus(cargoId, newStatus);
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Номер груза</th>
          <th>Название груза</th>
          <th>Статус</th>
          <th>Пункт отправления</th>
          <th>Пункт назначения</th>
          <th>Дата отправления</th>
        </tr>
      </thead>
      <tbody>
        {cargoList.map((cargo) => (
          <tr key={cargo.id}>
            <td>{cargo.id}</td>
            <td>{cargo.name}</td>
            <td className={getStatusClass(cargo.status)}>
              <select
                value={cargo.status}
                onChange={(e) => handleStatusChange(cargo.id, e.target.value)}
                className="form-select"
              >
                <option value="Ожидает отправки">Ожидает отправки</option>
                <option value="В пути">В пути</option>
                <option value="Доставлен">Доставлен</option>
              </select>
            </td>
            <td>{cargo.origin}</td>
            <td>{cargo.destination}</td>
            <td>{cargo.departureDate}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CargoTable;
