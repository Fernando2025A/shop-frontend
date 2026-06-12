import React, { useState } from "react";
import "./CreateProduct.css";
import { X } from "lucide-react";

interface ConfigRow {
  key: string;
  value: string;
}

type props = {
  display?: string;
  action?: () => void;
};

const INITIAL_FORM_STATE = {
  name: "",
  image: "",
  price: 0,
  stock: 0,
  requiredLevel: 1,
  limit: 1,
  description: "",
  code: "",
  categoryId: 1,
  productType: "COSMETIC",
};
const PRODUCT_TYPES = ["BOOST", "COSMETIC", "CONSUMABLE", "EFFECT"];
export const CreateProduct: React.FC<props> = ({
  display = "none",
  action = () => {
    console.log("e");
  },
}) => {
  const [isConfigEnabled, setIsConfigEnabled] = useState<boolean>(false);
  const [configRows, setConfigRows] = useState<ConfigRow[]>([
    { key: "", value: "" },
  ]);

  // 🌟 Hook unificado para los campos básicos
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const apiUrl = import.meta.env.VITE_API_URL;

  // 🌟 Manejador genérico que parsea números automáticamente según el input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleRowChange = (
    index: number,
    field: keyof ConfigRow,
    value: string,
  ) => {
    const updatedRows = [...configRows];
    updatedRows[index][field] = value;
    setConfigRows(updatedRows);
  };

  const addRow = () => setConfigRows([...configRows, { key: "", value: "" }]);

  const removeRow = (index: number) => {
    if (configRows.length === 1) {
      setConfigRows([{ key: "", value: "" }]);
    } else {
      setConfigRows(configRows.filter((_, i) => i !== index));
    }
  };

  // 🌟 Procesa el submit, arma el payload dinámico y ejecuta el fetch real
  const createProduct = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página recargue

    // Convertimos el array de filas [{key: "color", value: "#00ffcc"}] en un objeto plano
    let finalConfig: Record<string, any> | undefined = undefined;
    if (isConfigEnabled && configRows.length > 0) {
      finalConfig = {};
      configRows.forEach((row) => {
        if (row.key.trim() !== "") {
          finalConfig![row.key.trim()] = row.value;
        }
      });
    }

    // Unimos los datos del formulario con el objeto config dinámico
    const payload = {
      ...formData,
      config: finalConfig,
    };

    console.log("Enviando producto al backend:", payload);

    await fetch(`${apiUrl}/products`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), // 🚀 Mandamos los datos reales recopilados
    });

    action(); // Opcional: Cierra el modal/formulario tras guardar exitosamente
  };

  return (
    <div className="page-wrapper" style={{ display: display }}>
      {/* Asignamos la función al onSubmit del formulario */}
      <form className="create-product-container" onSubmit={createProduct}>
        <button type="button" onClick={() => action()}>
          <X />
        </button>

        <div className="form-header">
          <h1>Crear Producto</h1>
        </div>

        <div className="form-grid-layout">
          {/* COLUMNA IZQUIERDA: Datos básicos */}
          <div className="form-column basic-data">
            <div className="form-field">
              <p>Nombre del producto:</p>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-field">
              <p>Nombre de la imagen:</p>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-field">
              <p>Precio:</p>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
            <div className="form-field">
              <p>Stock:</p>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
            <div className="form-field">
              <p>Nivel requerido:</p>
              <input
                type="number"
                name="requiredLevel"
                value={formData.requiredLevel}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
            <div className="form-field">
              <p>Límite de compra:</p>
              <input
                type="number"
                name="limit"
                value={formData.limit}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
            <div className="form-field">
              <p>Descripción:</p>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-field">
              <p>Código:</p>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-field">
              <p>ID de categoría:</p>
              <input
                type="number"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
          </div>
          <div className="form-field">
            <p>Tipo de producto:</p>
            <select
              name="productType"
              value={formData.productType}
              onChange={handleInputChange as any} // Casteo rápido por el tipo de evento de select
              className="form-select" // Para que le des estilos cyberpunk en tu CSS
              required
            >
              {PRODUCT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          {/* COLUMNA DERECHA: Configuración Avanzada */}
          <div className="form-column advanced-config">
            <div className="config-trigger-row">
              <p>Configuración:</p>
              <label className="switch-trigger">
                <input
                  type="checkbox"
                  checked={isConfigEnabled}
                  onChange={(e) => setIsConfigEnabled(e.target.checked)}
                />
                <span className="slider-switch"></span>
              </label>
            </div>

            {isConfigEnabled && (
              <div className="config-table-section">
                <table className="config-table">
                  <thead>
                    <tr>
                      <th>Propiedad (Clave)</th>
                      <th>Valor</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {configRows.map((row, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            placeholder="ej. expirationDays"
                            value={row.key}
                            onChange={(e) =>
                              handleRowChange(index, "key", e.target.value)
                            }
                            className="table-input"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="ej. 30"
                            value={row.value}
                            onChange={(e) =>
                              handleRowChange(index, "value", e.target.value)
                            }
                            className="table-input"
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn-delete-row"
                            onClick={() => removeRow(index)}
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button type="button" className="btn-add-row" onClick={addRow}>
                  + Añadir Propiedad
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Al ser type="submit", gatilla automáticamente la función createProduct asignada al form */}
        <button type="submit" className="btn-submit-product">
          Guardar Producto
        </button>
      </form>
    </div>
  );
};
