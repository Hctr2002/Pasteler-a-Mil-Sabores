import { useState } from "react";
import "../styles/theme.css";

export function Filter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    category: [],
    type: "",
    size: []
  });

  const categories = [
    "Chocolate",
    "Especial",
    "Tradicional",
    "Frutas y Vegetales",
    "Hojaldre rellenos",
    "Pie"
  ];

  const sizes = [
    "6/8 Personas",
    "8/10 Personas",
    "10/12 Personas",
    "12/14 Personas",
    "14/16 Personas"
  ];

  const types = ["Redondo", "Cuadrado"];

  const handleCheckboxChange = (name, value) => {
    const current = filters[name];
    const newValues = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    const newFilters = { ...filters, [name]: newValues };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    const newFilters = { ...filters, type: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <aside className="filter-sidebar">
      {/* Categorías */}
      <div className="filter-section">
        <h5>Categorías</h5>
        <div className="filter-options">
          {categories.map((cat) => (
            <label key={cat} className="filter-checkbox">
              <input
                type="checkbox"
                value={cat}
                checked={filters.category.includes(cat)}
                onChange={() => handleCheckboxChange("category", cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* Tamaño */}
      <div className="filter-section">
        <h5>Tamaño</h5>
        <div className="filter-options">
          {sizes.map((size) => (
            <label key={size} className="filter-checkbox">
              <input
                type="checkbox"
                value={size}
                checked={filters.size.includes(size)}
                onChange={() => handleCheckboxChange("size", size)}
              />
              {size}
            </label>
          ))}
        </div>
      </div>

      {/* Tipo */}
      <div className="filter-section">
        <h5>Tipo</h5>
        <select
          name="type"
          className="form-select"
          value={filters.type}
          onChange={handleSelectChange}
        >
          <option value="">Seleccione una opción</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
