import axios  from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URL_API_PRODUCTOS } from "./config/rutas";

export function BorrarProducto() {
    const params = useParams();
    const navigate = useNavigate();
    console.log(params);
    useEffect(() => {
        async function borrar() {
            const res = await axios.get(URL_API_PRODUCTOS + "/borrarPr/" + params.id);
            console.log(res.data);
            navigate("/productos");
        }
        borrar();
    }, [params.id , navigate]);
    return (
        <h1>Borrar Producto</h1>
    )
}