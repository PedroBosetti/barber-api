"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = auth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function auth(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader)
            return res.status(401).json({ erro: 'Token não fornecido' });
        const token = authHeader.split(' ')[1];
        const tokenVerificado = jsonwebtoken_1.default.verify(token, process.env.SEGREDO);
        req.usuarioId = tokenVerificado.id;
        next();
    }
    catch (erro) {
        return res.status(401).json({
            erro: "Token inválido"
        });
    }
}
