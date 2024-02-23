import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { URL_API, URL_IMAGES } from "../config/rutas";

export function EditarUsuario(){
    const params = useParams();
    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [usuario, setUsuario] = useState("");
    const [nombreFoto, setNombreFoto] = useState("");
    const [password, setPassword] = useState("");
    const [passwordViejo, setPasswordViejo] = useState("");
    const [saltViejo, setSaltViejo] = useState("");
    const [fotoVieja, setFotoVieja] = useState("");
    const [foto, setFoto] = useState(null);
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        async function buscarPorID() {
                const res = await axios.get(URL_API+"buscarUsuarioPorId/" + params.id);
                setId(res.data.id);
                setNombre(res.data.nombre);
                setUsuario(res.data.usuario);
                setPasswordViejo(res.data.password);
                setSaltViejo(res.data.salt);
                setFotoVieja(res.data.foto);
                setNombreFoto(URL_IMAGES + res.data.foto);
        }
        buscarPorID();
    }, [params.id]);

    async function editarUsuario(e) {
        e.preventDefault();
            const formData = new FormData();
            formData.append("id", id);
            formData.append("nombre", nombre);
            formData.append("usuario", usuario);
            formData.append("password", password);
            formData.append("passwordViejo", passwordViejo);
            formData.append("saltViejo", saltViejo);
            formData.append("fotoVieja", fotoVieja);
            formData.append("foto", foto);
            const res = await axios.post(URL_API+"editarUsuario/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            
            console.log(res);
            setNombre("");
            setUsuario("");
            setPassword("");
            setFoto(null);
            setMensaje(res.data);
            setTimeout(()=>{
                setMensaje("");
                navigate('/')
            },3000);
    }

    return(
        <div className="container mt-5">
            <div className="text-danger"><h3>{mensaje}</h3></div>
            <form onSubmit={editarUsuario}>
                <div className="card">
                    <div className="card-header">
                        <h1>Editar usuario</h1>
                    </div>
                    <div className="card-body">
                        <input className="form-control mb-3" type="text" placeholder="Id" name="id" id="id" value={id} readOnly />
                        <input type="hidden" name="passwordViejo" id="passwordViejo" value={passwordViejo} readOnly />
                        <input type="hidden" name="saltViejo" id="saltViejo" value={saltViejo} readOnly />
                        <input className="form-control mb-3" type="text" placeholder="Nombre" name="nombre" id="nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)} autoFocus />
                        <input className="form-control mb-3" type="text" placeholder="Usuario" name="usuario" id="usuario" value={usuario} onChange={(e)=>{setUsuario(e.target.value)}} />
                        <input className="form-control mb-3" type="text" placeholder="Password" name="password" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                        <div>
                            <img src={nombreFoto} width={100} alt="Foto de usuario" />
                        </div>
                        <input className="form-control mb-3" type="file" placeholder="Foto" name="foto" id="foto" onChange={(e)=>setFoto(e.target.files[0])} />
                    </div>
                    <div className="card-footer">
                        <button className="form-control btn btn-primary" type="submit">Guardar usuario</button>
                    </div>
                </div>
            </form>
        </div>
    );
}