import express from 'express';
import {createNewSlot,getAvailableSlots} from '../Controllers/slot-controller.js';

const router = express.Router();

router.post('/slot',createNewSlot);
router.get('/available', getAvailableSlots);

export default router;