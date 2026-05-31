import React, { useState } from "react";
import NavBar from "../components/NavBar";

type Props = {};

function Social({}: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [name, setName] = useState("");
  const [user, setUser] = useState({});

  const getUser = async (username: string) => {
    try {
      if (!username) {
        throw new Error();
      }
      const response = await fetch(`${apiUrl}/users/${username}`, {
        credentials: "include",
      });
      const u = await response.json();
      console.log(u);
      setUser(u);
    } catch (e) {
      setUser({
        id: "null",
        username: "no encontrado",
      });
    }
  };
  return (
    <div className="app-container">
      <NavBar selected="SOCIAL" />
      <h1 style={{ marginLeft: "40%", color: "lightgreen", marginTop: "0%" }}>
        Buscar usuario
      </h1>
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <button onClick={() => getUser(name.toLowerCase())}>Buscar</button>
      <table
        style={{
          ...styles.table,
          width: "100%",
          borderCollapse: "collapse",
          color: "#fff",
          fontSize: "17px",
          padding: "5%",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#111",
        }}
        border={1}
      >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>ID</th>
            <th>Agregar amigo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.username}</td>
            <td>{user.id}</td>
            <td>
              <button>Agregar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
const styles: { table: React.CSSProperties } = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};
export default Social;
