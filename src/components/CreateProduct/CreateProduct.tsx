import React, { useState } from 'react';
import './CreateProduct.css';
import { X } from 'lucide-react';

interface ConfigRow {
  key: string;
  value: string;

}
type props = {
    display?: string;
    action?: () => void;
}

export const CreateProduct: React.FC<props> = ({
  display = "none",
  action = () => {console.log("e")}
}) => {
  const [isConfigEnabled, setIsConfigEnabled] = useState<boolean>(false);
  const [configRows, setConfigRows] = useState<ConfigRow[]>([{ key: '', value: '' }]);

  const handleRowChange = (index: number, field: keyof ConfigRow, value: string) => {
    const updatedRows = [...configRows];
    updatedRows[index][field] = value;
    setConfigRows(updatedRows);
  };

  const addRow = () => setConfigRows([...configRows, { key: '', value: '' }]);
  
  const removeRow = (index: number) => {
    if (configRows.length === 1) {
      setConfigRows([{ key: '', value: '' }]);
    } else {
      setConfigRows(configRows.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="page-wrapper" style={{ display: display }}>
      <form className="create-product-container">
        <button type="button" onClick={() => action()}>
          <X />
        </button>
       
        {/* El título siempre ocupará todo el ancho superior */}
        <div className="form-header">
          <h1>Crear Producto</h1>
        </div>

        {/* Contenedor Grid que se dividirá en 2 columnas en PC */}
        <div className="form-grid-layout">
          
          {/* COLUMNA IZQUIERDA: Datos básicos */}
          <div className="form-column basic-data">
            <div className="form-field">
              <p>Nombre del producto:</p>
              <input type="text" />
            </div>
            <div className="form-field">
              <p>Nombre de la imagen:</p>
              <input type="text" />
            </div>
            <div className="form-field">
              <p>Precio:</p>
              <input type="number" step="0.01" />
            </div>
            <div className="form-field">
              <p>Stock:</p>
              <input type="number" />
            </div>
            <div className="form-field">
              <p>Nivel requerido:</p>
              <input type="number" />
            </div>
            <div className="form-field">
              <p>Límite de compra:</p>
              <input type="number" />
            </div>
            <div className="form-field">
              <p>Descripción:</p>
              <input type="text" />
            </div>
            <div className="form-field">
              <p>Código:</p>
              <input type="text" />
            </div>
            <div className="form-field">
              <p>ID de categoría:</p>
              <input type="number" />
            </div>
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
                            onChange={(e) => handleRowChange(index, 'key', e.target.value)}
                            className="table-input"
                          />
                        </td>
                        <td>
                          <input 
                            type="text" 
                            placeholder="ej. 30" 
                            value={row.value}
                            onChange={(e) => handleRowChange(index, 'value', e.target.value)}
                            className="table-input"
                          />
                        </td>
                        <td>
                          <button type="button" className="btn-delete-row" onClick={() => removeRow(index)}>✕</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button type="button" className="btn-add-row" onClick={addRow}>+ Añadir Propiedad</button>
              </div>
            )}
          </div>

        </div>

        {/* El botón de guardar ocupará todo el ancho inferior */}
        <button type="submit" className="btn-submit-product">
          Guardar Producto
        </button>
      </form>
    </div>
  );
};
//Datos de ejemplo para crear un producto virtual en la tienda oficial de un videojuego. Este producto es un pack de monedas premium que los jugadores pueden comprar para obtener monedas utilizables en la tienda. El producto tiene un precio, stock disponible, nivel requerido para comprarlo, límite de compra, descripción, código único, categoría, tipo de producto y configuraciones adicionales como días de expiración, política de reembolso y artículos bonus incluidos en el pack.
// {
//   "name": "Pack de Monedas Premium",
//   "image": "https://mi-cdn.com/imagenes/pack-monedas.png",
//   "price": 299.50,
//   "stock": 500,
//   "requiredLevel": 2,
//   "limit": 5,
//   "description": "Contiene 1500 monedas utilizables en toda la tienda oficial.",
//   "code": "COIN-PACK-1500",
//   "categoryId": 1,
//   "productType": "VIRTUAL",
//   "config": {
//     "expirationDays": 30,
//     "allowRefund": false,
//     "bonusItems": ["skin_basic_01", "badge_beta_tester"]
//   }
// }
