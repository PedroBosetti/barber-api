import { Router } from "express";
import { registrar, logar, mostrarPerfil } from "../controllers/auth";
import { auth } from "../middlewares/auth";

const rotasUsuario = Router()

rotasUsuario.post("/registro", registrar)
rotasUsuario.post("/login", logar)
rotasUsuario.get("/mostrarPerfil", auth, mostrarPerfil)

export default rotasUsuario