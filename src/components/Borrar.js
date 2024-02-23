import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URL_API } from "../config/rutas";

export function BorrarUsuario() {
    const params = useParams();
    const navigate = useNavigate();
    console.log(params);
    useEffect(() => {
        async function borrar() {
            const res = axios.get(URL_API + "/borrar/" + params.id);
            console.log(res.data);
            navigate("/");
        }
        borrar();
    }, [params.id , navigate]);
    return (
        <h1>Borrar Usuario</h1>
    )
}