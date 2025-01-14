import React, { useState } from "react";
import cities from "../data/cities";
import "../styles/AddCargoForm.css"; // Этот файл можно использовать для дополнительной кастомной стилизации

const AddCargoForm = ({ addCargo }) => {
  const [formData, setFormData] = useState({
    name: "",
    origin: "",
    destination: "",
    departureDate: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Сброс ошибки при изменении поля
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, origin, destination, departureDate } = formData;

    // Проверка, что все поля заполнены
    if (!name || !origin || !destination || !departureDate) {
      setError("Все поля должны быть заполнены.");
      return;
    }

    // Проверка, что дата отправления не в прошлом
    const today = new Date().toISOString().split("T")[0];
    if (departureDate < today) {
      setError("Дата отправления не может быть в прошлом.");
      return;
    }

    // Добавление нового груза
    addCargo({
      id: `CARGO${Date.now()}`,
      name,
      origin,
      destination,
      departureDate,
      status: "Ожидает отправки",
    });

    setFormData({ name: "", origin: "", destination: "", departureDate: "" }); // Очистка формы
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="add-cargo-form p-4 shadow-sm rounded border"
    >
      <h3>Добавить новый груз</h3>
      {error && <p className="text-danger">{error}</p>}

      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Название груза:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
          placeholder="Введите название груза"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="origin" className="form-label">
          Пункт отправления:
        </label>
        <select
          id="origin"
          name="origin"
          value={formData.origin}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Выберите город</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="destination" className="form-label">
          Пункт назначения:
        </label>
        <select
          id="destination"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Выберите город</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="departureDate" className="form-label">
          Дата отправления:
        </label>
        <input
          type="date"
          id="departureDate"
          name="departureDate"
          value={formData.departureDate}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Добавить груз
      </button>
    </form>
  );
};

export default AddCargoForm;
