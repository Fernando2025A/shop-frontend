import React, { useState } from 'react';
import './MyOrders.css';

// --- Interfaces de Datos ---
interface Pedido {
  id: string;
  fecha: string;
  hora: string;
  productos: string[]; // URLs ficticias o placeholders
  total: number;
  estado: 'RECLAMADO' | 'PENDIENTE' | 'CANCELADO';
  descripcionEstado: string;
  fechaEntrega?: string;
  horaEntrega?: string;
}

interface MetricCardProps {
  title: string;
  value: number;
  subtext?: string;
  iconType: 'all' | 'claimed' | 'pending' | 'canceled' | 'total';
}

// --- Datos de Prueba por Defecto ---
const defaultPedidos: Pedido[] = [
  { id: '#72', fecha: '27/5/2026', hora: '14:35', productos: ['📦', '🖼️', '🌌'], total: 675.00, estado: 'RECLAMADO', descripcionEstado: 'Pedido completado', fechaEntrega: '27/5/2026', horaEntrega: '14:40' },
  { id: '#71', fecha: '26/5/2026', hora: '18:22', productos: ['💻', '📱', '🌌'], total: 787.50, estado: 'PENDIENTE', descripcionEstado: 'Procesando pedido' },
  { id: '#70', fecha: '25/5/2026', hora: '11:08', productos: ['🌌', '💻'], total: 375.00, estado: 'CANCELADO', descripcionEstado: 'Pedido cancelado' },
  { id: '#69', fecha: '24/5/2026', hora: '20:15', productos: ['📱', '💻'], total: 187.50, estado: 'RECLAMADO', descripcionEstado: 'Pedido completado', fechaEntrega: '24/5/2026', horaEntrega: '20:20' },
  { id: '#68', fecha: '23/5/2026', hora: '16:45', productos: ['🌌'], total: 950.00, estado: 'CANCELADO', descripcionEstado: 'Pedido cancelado' },
  { id: '#67', fecha: '22/5/2026', hora: '09:30', productos: ['💻', '📱'], total: 997.50, estado: 'RECLAMADO', descripcionEstado: 'Pedido completado', fechaEntrega: '22/5/2026', horaEntrega: '09:35' },
];

export const MyOrders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');

  return (
    <div className="dashboard-container">
      {/* Encabezado */}
      <header className="dashboard-header">
        <h1>📋 Mis pedidos</h1>
        <p>Consulta y gestiona todos los pedidos que has realizado.</p>
      </header>

      {/* Grid de Métricas */}
      <section className="metrics-grid">
        <MetricCard title="Todos los pedidos" value={72} subtext="Ver todos" iconType="all" />
        <MetricCard title="Reclamados" value={24} subtext="33.3% del total" iconType="claimed" />
        <MetricCard title="Pendientes" value={8} subtext="11.1% del total" iconType="pending" />
        <MetricCard title="Cancelados" value={40} subtext="55.6% del total" iconType="canceled" />
        <MetricCard title="Total gastado" value={24562.48} subtext="En todos tus pedidos" iconType="total" />
      </section>

      {/* Barra de Filtros */}
      <section className="filters-bar">
        <div className="search-wrapper">
          <span className="icon-search">🔍</span>
          <input 
            type="text" 
            placeholder="Buscar por ID de pedido..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="date-inputs">
          <input type="date" placeholder="Desde" className="date-field" />
          <input type="date" placeholder="Hasta" className="date-field" />
        </div>

        <div className="select-wrapper">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="Todos">Estado: Todos</option>
            <option value="RECLAMADO">Reclamado</option>
            <option value="PENDIENTE">Pendiente</option>
            <option value="CANCELADO">Cancelado</option>
          </select>
        </div>

        <button className="btn-clear-filters">🔄 Limpiar filtros</button>
      </section>

      {/* Tabla de Pedidos */}
      <section className="table-responsive">
        <table className="pedidos-table">
          <thead>
            <tr>
              <th>ID DE PEDIDO</th>
              <th>FECHA</th>
              <th>PRODUCTOS</th>
              <th>TOTAL</th>
              <th>ESTADO</th>
              <th>FECHA DE ENTREGA</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {defaultPedidos.map((pedido) => (
              <tr key={pedido.id}>
                {/* ID */}
                <td className="col-id">
                  <span className="id-text">{pedido.id}</span>
                  <a href="#detalle" className="view-detail">Ver detalle ↗</a>
                </td>
                
                {/* Fecha */}
                <td className="col-fecha">
                  <div>{pedido.fecha}</div>
                  <div className="text-muted">{pedido.hora}</div>
                </td>
                
                {/* Productos */}
                <td className="col-productos">
                  <div className="product-thumbnails">
                    {pedido.productos.slice(0, 3).map((prod, idx) => (
                      <div key={idx} className="prod-thumb">{prod}</div>
                    ))}
                    {pedido.productos.length > 3 && (
                      <span className="more-products">+{pedido.productos.length - 2} más</span>
                    )}
                  </div>
                </td>
                
                {/* Total */}
                <td className="col-total">
                  <div className="total-amount">${pedido.total.toFixed(2)}</div>
                  <div className="payment-status">Pagado</div>
                </td>
                
                {/* Estado */}
                <td className="col-estado">
                  <span className={`status-badge ${pedido.estado.toLowerCase()}`}>
                    ● {pedido.estado}
                  </span>
                  <div className="status-desc">{pedido.descripcionEstado}</div>
                </td>
                
                {/* Fecha de Entrega */}
                <td className="col-entrega">
                  {pedido.fechaEntrega ? (
                    <>
                      <div>📅 {pedido.fechaEntrega}</div>
                      <div className="text-muted">{pedido.horaEntrega}</div>
                    </>
                  ) : (
                    <>
                      <div>-</div>
                      <div className="text-muted">
                        {pedido.estado === 'PENDIENTE' ? 'Aún no disponible' : 'No aplica'}
                      </div>
                    </>
                  )}
                </td>
                
                {/* Acciones */}
                <td className="col-acciones">
                  <div className="actions-wrapper">
                    {pedido.estado === 'RECLAMADO' && (
                      <button className="btn-action btn-claim">Reclamar ❯</button>
                    )}
                    {pedido.estado === 'PENDIENTE' && (
                      <>
                        <button className="btn-action btn-secondary">Ver detalle</button>
                        <button className="btn-action btn-danger">Cancelar</button>
                      </>
                    )}
                    {pedido.estado === 'CANCELADO' && (
                      <button className="btn-action btn-secondary">Ver detalle</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

// --- Subcomponente Auxiliar para Tarjetas ---
const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtext, iconType }) => {
  const getIcon = () => {
    switch (iconType) {
      case 'all': return { char: '🛍️', class: 'icon-all' };
      case 'claimed': return { char: '✓', class: 'icon-claimed' };
      case 'pending': return { char: '🕒', class: 'icon-pending' };
      case 'canceled': return { char: '✕', class: 'icon-canceled' };
      case 'total': return { char: '💲', class: 'icon-total' };
    }
  };

  const iconData = getIcon();
  const isCurrency = iconType === 'total';

  return (
    <div className="metric-card">
      <div className="metric-info">
        <span className="metric-title">{title}</span>
        <span className="metric-value">
          {isCurrency ? `$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : value}
        </span>
        <span className={`metric-subtext ${iconType === 'all' ? 'link' : ''}`}>{subtext}</span>
      </div>
      <div className={`metric-icon-box ${iconData.class}`}>
        {iconData.char}
      </div>
    </div>
  );
};