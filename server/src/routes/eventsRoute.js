import express from 'express';
import { createEvent, getAllEvents } from '../controllers/events.js';
import { isauthenticated } from '../middleware/auth.js';

const router = express.Router();

router.post('/create',isauthenticated, createEvent);
router.get('/allEvents',isauthenticated, getAllEvents);

export default router;
