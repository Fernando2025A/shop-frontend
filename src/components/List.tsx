import React from 'react'
import '../App.css';

function List() {
  return (
    <ul id='list' className="list-group">
      <li id='items' className="list-group-item active">Inicio</li>
      <li id='items' className="list-group-item">Tienda</li>
      <li id='items' className="list-group-item">Configuración</li>
      <li id='items' className="list-group-item">Estado</li>
      <li id='items' className="list-group-item">Pedidos</li>
      <li id='items' className="list-group-item">Vip</li>
    </ul>
  )
}

export default List