import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { URL_API , URL_IMAGES} from "./config/rutas";

export function EditarUsuario(){
    const params = useParams();
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [foto, setFoto] = useState(null);
    const [rutaFoto, setRutaFoto] = useState("");
    const [passwordViejo, setPasswordViejo] = useState("")
    const [saltViejo, setSaltViejo] = useState("")
    const [fotoVieja, setFotoVieja] = useState("")
    
    useEffect(()=>{
        async function buscarPorId(){
            var res = await axios.get(URL_API +"/buscarUsuarioPorId/" + params.id)
            console.log(res.data);
            setId(res.data.id)
            setPasswordViejo(res.data.password)
            setSaltViejo(res.data.salt)
            setFotoVieja(res.data.foto)
            setNombre(res.data.nombre)
            setUsuario(res.data.usuario)
            setFoto(res.data.foto)
            setRutaFoto( URL_IMAGES + res.data.foto)

        }
        buscarPorId();
    },[params.id])

    async function editarDatos(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append("id",id);
        formData.append("nombre", nombre);
        formData.append("usuario", usuario);
        formData.append("passwordViejo", passwordViejo)
        formData.append("password", password)
        formData.append("saltViejo", saltViejo)
        formData.append("fotoVieja", fotoVieja)
        formData.append("foto", foto);
        const res = await axios.post( URL_API + "/editarUsuario", formData,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log(res);
        setMensaje(res.data);
        setTimeout(() => {
            setMensaje("");
        }, 3000);
    }


    return(
        <div className="container mt-5">
        <div className="text-danger"><h2>{mensaje}</h2></div>
        <form onSubmit={editarDatos}>
            <div className="card">
                <div className="card-header">
                    <h1>Editar usuario</h1>
                </div>
                <div className="card-body">
                    <input className="form-control mb-3" type="text" name="id" id="id" value={id} readOnly></input>
                    <input type="hidden" name="passwordViejo" id="passwordViejo" value={passwordViejo}></input>
                    <input type="hidden" name="salViejo" id="saltViejo" value={saltViejo} readOnly></input>
                    <input type="hidden" name="fotoVieja" id="fotoVieja" value={fotoVieja} readOnly></input>
                    <input className="form-control mb-3" type="text" name="nombre" id="nombre" placeholder="Nombre" value={nombre} autoFocus onChange={(e)=>setNombre(e.target.value)}></input>
                    <input className="form-control mb-3" type="text" name="usuario" id="usuario" placeholder="Usuario" value={usuario} onChange={(e)=>setUsuario(e.target.value)} ></input>
                    <input className="form-control mb-3" type="password" name="password" id="password" placeholder="Contraseña nueva" onChange={(e)=>setPassword(e.target.value)} ></input>
                    <input className="form-control mb-3" type="file" placeholder="Foto" name="foto" onChange={(e)=>setFoto(e.target.files[0])}></input>
                    <div>
                    <img src={rutaFoto} alt="Foto de usuario" width="100" height="100"></img>
                    </div>
                </div>
                <div className="card-footer">
                    <button className=" form-control btn btn-primary" type="submit">Editar</button>
                </div>
            </div>
        </form>
    </div>
    )
}