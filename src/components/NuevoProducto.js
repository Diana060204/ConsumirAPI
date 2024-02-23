import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL_API } from "../config/rutas";

export function NuevoProducto() {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [precio, setPrecio] = useState("");
    const [foto, setFoto] = useState(null);
    const [mensaje, setMensaje] = useState("");

    async function guardarProducto(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("descripcion", descripcion);
        formData.append("categoria", categoria);
        formData.append("precio", precio);
        formData.append("foto", foto);

        const res = await axios.post(URL_API+"nuevoproductoApi", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            console.log(res);
            setNombre("");
            setDescripcion("");
            setCategoria("");
            setPrecio("");
            setFoto(null);
            setMensaje(res.data);
            setTimeout(()=>{
                setMensaje("");
                navigate('/Productos');
            },3000);
  
    }

    return (
        <div className="container mt-5">
            <div className="text-danger"><h3>{mensaje}</h3></div>
            <form onSubmit={guardarProducto}>
                <div className="card">
                    <div className="card-header">
                        <h1>Nuevo Producto</h1>
                    </div>
                    <div className="card-body">
                        <input className="form-control mb-3" type="text" name="nombre" id="nombre" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} autoFocus />
                        <textarea className="form-control mb-3" name="descripcion" id="descripcion" placeholder="Descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                        <input className="form-control mb-3" type="text" name="categoria" id="categoria" placeholder="Categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
                        <input className="form-control mb-3" type="number" name="precio" id="precio" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                        <input className="form-control mb-3" type="file" name="foto" id="foto" onChange={(e) => setFoto(e.target.files[0])} />
                    </div>
                    <div className="card-footer">
                        <button className="form-control btn btn-primary" type="submit">Guardar Producto</button>
                    </div>
                </div>
            </form>
        </div>
    );
}