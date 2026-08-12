import {Router} from 'express';
import { criarAgendamento, listarAgendamentosEnviados, listarAgendamentosRecebidos, reagendar, desmarcar } from '../controllers/agendamento';
import { auth, permitir } from '../middlewares/auth';

const rotasAgendamento = Router()

rotasAgendamento.post('/criar-agendamento', auth, permitir('CLIENTE', 'ADMIN'), criarAgendamento)
rotasAgendamento.get('/listar-agendamentos-enviados', auth, permitir('CLIENTE'), listarAgendamentosEnviados)
rotasAgendamento.get('/listar-agendamentos-recebidos', auth, permitir('BARBEIRO', 'ADMIN'), listarAgendamentosRecebidos)
rotasAgendamento.patch('/reagendar/:id', auth, permitir('CLIENTE'), reagendar)
rotasAgendamento.delete('/desmarcar/:id', auth, permitir('CLIENTE'), desmarcar)

export default rotasAgendamento