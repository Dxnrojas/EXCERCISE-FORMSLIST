import { useState } from "react";
import "./Forms.css";

export default function Forms() {
  const [titulo, setTitulo] = useState("");
  const [prioridad, setPrioridad] = useState("media"); // baja | media | alta
  const [tareas, setTareas] = useState([]);
  const [filtro, setFiltro] = useState("todas"); // todas | baja | media | alta

  function handleAddTask(e) {
    e.preventDefault();

    const id = Date.now() + Math.random();
    setTareas((prev) => [...prev, { id, titulo, prioridad }]);

    setTitulo("");
    setPrioridad("media");
  }

  function handleDelete(id) {
    setTareas((prev) => prev.filter((e) => e.id !== id));
  }

  const tareasFiltradas =
    filtro === "todas" ? tareas : tareas.filter((e) => e.prioridad === filtro);

  return (
    <div className="wrap">
      <div className="box">
        <h1 className="title">Todo simple</h1>

        <div className="row">
          <label>Filtro:</label>
          <select
            className="select"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          >
            <option value="todas">Todas</option>
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>

        </div>

        <form onSubmit={handleAddTask} className="form">
          <input
            className="input"
            placeholder="Título de la tarea"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <select
            className="select"
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
          >
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>

          <button className="btn">Añadir</button>
        </form>

        <ul className="list">
          {tareasFiltradas.map((e) => (
            <li key={e.id} className="item">
              <span className={`badge p-${e.prioridad}`}>{e.prioridad}</span>
              <span className="text">{e.titulo}</span>
              <button className="btn-del" onClick={() => handleDelete(e.id)}>
                Eliminar
              </button>
            </li>
          ))}
          {tareasFiltradas.length === 0 && (
            <li className="empty">Sin tareas</li>
          )}
        </ul>
      </div>
    </div>
  );
}
