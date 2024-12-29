import express from 'express';
import jwt from 'jsonwebtoken';
import { userLogin, userRegister, userLogout, getMyProfile } from '../controllers/user.js';
import { isauthenticated } from '../middleware/auth.js';

const router = express.Router()

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/logout', userLogout);
router.get('/myprofile', isauthenticated, getMyProfile);
router.get('/check-auth', isauthenticated, (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json({ success: false });
    }

    jwt.verify(token, '!@#$%^&*()', (err, decoded) => {
        if (err) {
            return res.json({ success: false });
        }

        res.json({ success: true, user: decoded });
    });
});

export default router;