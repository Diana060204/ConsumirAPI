import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Error } from "./Error";
import { Inicio } from "./Inicio";
import { Menu } from "./Menu";
import { Productos } from "./Productos";
import { NuevoUsuario } from "./Nuevo";
import { NuevoProducto } from "./NuevoProducto";
import { EditarUsuario } from "./Editar";
import { EditarProducto } from "./EditarProducto";
import { BorrarProducto } from "./BorrarProductos";
import { BorrarUsuario } from "./Borrar";

export function Rutas() {
    return (
        <>
        <Menu/>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Error />}></Route>
                    <Route path="/" element={<Inicio />}></Route>
                    <Route path="/productos" element={<Productos />}></Route>
                    <Route path="/nuevoUsuario" element={<NuevoUsuario />}></Route>
                    <Route path="/nuevoProducto" element={<NuevoProducto />}></Route>
                    <Route path="/editar/:id" element={<EditarUsuario />}></Route>
                    <Route path="/borrar/:id" element={<BorrarUsuario />}></Route>
                    <Route path="/editarPr/:id" element={<EditarProducto />}></Route>
                    <Route path="/borrarPr/:id" element={<BorrarProducto />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}