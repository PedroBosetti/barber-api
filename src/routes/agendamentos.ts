import {Router} from 'express';
import { criarAgendamento, listarAgendamentosEnviados, listarAgendamentosRecebidos, reagendar, desmarcar } from '../controllers/agendamento';
import { auth } from '../middlewares/auth';

const rotasAgendamento = Router()

rotasAgendamento.post('/criar-agendamento', auth, criarAgendamento)
rotasAgendamento.get('/listar-agendamentos-enviados', auth, listarAgendamentosEnviados)
rotasAgendamento.get('/listar-agendamentos-recebidos', auth, listarAgendamentosRecebidos)
rotasAgendamento.patch('/reagendar/:id', auth, reagendar)
rotasAgendamento.delete('/desmarcar/:id', auth, desmarcar)

export default rotasAgendamento