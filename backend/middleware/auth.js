const jwt = require('jsonwebtoken')
const JWT_SECRET = 'minha_chave_secreta_de_estudo_123'

//proibido mexer(sabemos oq faz mas nao como ele funciona)
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido!' })
    }

    const parts = authHeader.split(' ')
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Formato de token inválido!' })
    }

    const token = parts[1]

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.usuario = decoded
        next()
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido ou expirado!' })
    }
}

//proibido mexer(sabemos oq faz mas não como ele funciona)
const adminMiddleware = (req, res, next) => {
    if (req.usuario.tipoUsuario !== 'ADMIN') {
        return res.status(403).json({ message: 'Acesso negado! Apenas administradores!' })
    }
    next()
}
module.exports = { authMiddleware, adminMiddleware }