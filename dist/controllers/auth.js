"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrar = registrar;
exports.logar = logar;
exports.mostrarPerfil = mostrarPerfil;
const prisma_1 = __importDefault(require("../lib/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function registrar(req, res) {
    try {
        const { usuario, email, senha, tipo } = req.body;
        const senhaHash = await bcrypt_1.default.hash(senha, 10);
        const novoUsuario = await prisma_1.default.usuario.create({
            data: {
                usuario,
                email,
                senha: senhaHash,
                tipo
            }
        });
        const { senha: _, ...usuarioSemSenha } = novoUsuario;
        return res.status(201).json(usuarioSemSenha);
    }
    catch (erro) {
        return res.status(500).json({ erro: 'Erro ao registrar usuário' });
    }
}
async function logar(req, res) {
    try {
        const { email, senha } = req.body;
        const usuario = await prisma_1.default.usuario.findUnique({
            where: { email }
        });
        if (!usuario)
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        const senhaValida = await bcrypt_1.default.compare(senha, usuario.senha);
        if (!senhaValida)
            return res.status(401).json({ erro: 'Senha incorreta' });
        const token = jsonwebtoken_1.default.sign({ id: usuario.id }, process.env.SEGREDO, { expiresIn: '7d' });
        const { senha: _, ...usuarioSemSenha } = usuario;
        return res.status(200).json({
            usuario: usuarioSemSenha,
            token
        });
    }
    catch (erro) {
        return res.status(500).json({ erro: 'Erro ao fazer login' });
    }
}
async function mostrarPerfil(req, res) {
    try {
        const usuario = await prisma_1.default.usuario.findUnique({
            where: {
                id: req.usuarioId
            }
        });
        if (!usuario)
            return res.status(404).json({ erro: "Usuário não encontrado" });
        const { senha: _, ...usuarioSemSenha } = usuario;
        return res.status(200).json(usuarioSemSenha);
    }
    catch (erro) {
        return res.status(500).json({
            erro: "Erro ao buscar perfil"
        });
    }
}
