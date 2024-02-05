import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export function Productos() {
    const [dataProductos, setDataProductos] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3000/api/productos/mostrarproductos")
        .then((response)=>{
            //console.log(response.data);
            setDataProductos(response.data);
        })
        .catch((error)=>{
            console.log(error);
        });
    }, []);

    const listaProductos = dataProductos.map((producto)=>{
        var foto = "http://localhost:3000/images/" + producto.foto;
        var editar = "/editar/" + producto.id;
        var borrar = "/borrar/" + producto.id;
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
    )
}