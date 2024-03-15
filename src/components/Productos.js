import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URL_API , URL_IMAGES } from "./config/rutas";


export function Productos() {
    const [dataProductos, setDataProductos] = useState([]);
    useEffect(()=>{
        axios.get( URL_API + "/productos/mostrarProductos")
        .then((response)=>{
            //console.log(response.data);
            setDataProductos(response.data);
        })
        .catch((error)=>{
            console.log(error);
        });
    }, []);

    const listaProductos = dataProductos.map((producto)=>{
        var foto = URL_IMAGES + producto.foto;
        var editar = "/editarPr/" + producto.id;
        var borrar = "/borrarPr/" + producto.id;
        return(
            <tr key={producto.id} className="align-middle">
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td>{producto.stock}</td>
                <td><img src={foto} width="100px" height="100px" alt="Foto de perfil"></img></td>
                <td>
                    <Link to = {editar}>Editar</Link> / 
                    <Link to = {borrar}>Borrar</Link>
                </td>
            </tr>
        );
    });
    return(
        <div className="container mt-5">
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h1>Lista de productos</h1>
                    </div>
                    <div className="card-body">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Foto</th>
                                    <th>Editar / Borrar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaProductos}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}