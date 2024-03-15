import { URL_API_PRODUCTOS } from "./config/rutas";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function NuevoProducto() {

    const navigate = useNavigate();
    const [mensaje, setMensaje] = useState("");
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [foto, setFoto] = useState(null);

    async function guardarDatos(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("precio", precio);
        formData.append("stock", stock);
        formData.append("foto", foto);
        console.log(formData);
        const res = await axios.post( URL_API_PRODUCTOS + "/nuevoproducto", formData,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log(res);
        setNombre("");
        setPrecio("");
        setStock("");
        setFoto(null);
        setMensaje(res.data);
        setTimeout(() => {
            setMensaje("");
            navigate("/productos");
        }, 700);
    }

    return (
        <div className="container mt-5">
            <div className="text-danger"><h2>{mensaje}</h2></div>
            <form onSubmit={guardarDatos}>
                <div className="card">
                    <div className="card-header">
                        <h1>Registro de producto</h1>
                    </div>
                    <div className="card-body">
                        <input className="form-control mb-3" type="text" name="nombre" id="nombre" placeholder="Nombre" autoFocus onChange={(e)=>setNombre(e.target.value)} ></input>
                        <input className="form-control mb-3" type="text" name="precio" id="precio" placeholder="Precio" onChange={(e)=>setPrecio(e.target.value)}></input>
                        <input className="form-control mb-3" type="text" name="stock" id="stock" placeholder="Stock" onChange={(e)=>setStock(e.target.value)}></input>
                        <input className="form-control mb-3" type="file" name="foto" id="foto" placeholder="Foto" onChange={(e)=>setFoto(e.target.files[0])}></input>
                    </div>
                    <div className="card-footer">
                        <button className=" form-control btn btn-primary" type="submit">Registrar</button>
                    </div>
                </div>
            </form>
        </div>
    );
}