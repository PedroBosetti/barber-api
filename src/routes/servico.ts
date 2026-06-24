import { Router } from "express";
import { criarServico, editarServico, listarServicos, deletarServico } from "../controllers/servico";
import { auth, permitir } from "../middlewares/auth";

const rotasServico = Router()

rotasServico.post('/criar-servico', auth, permitir('ADMIN'), criarServico)
rotasServico.patch('/editar-servico/:id', auth, permitir('ADMIN'), editarServico)
rotasServico.get('/listar-servicos', listarServicos)
rotasServico.delete('/deletar-servico/:id', auth, permitir('ADMIN'), deletarServico)

export default rotasServico