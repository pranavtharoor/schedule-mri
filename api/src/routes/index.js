import express from 'express';
import appointment from './appointment';

const router = express.Router();

router.get('/appointment/:id', appointment.findById);
router.get('/appointment/:id/delete', appointment.deleteById);
router.get('/appointment', appointment.list);
router.post('/appointment/create', appointment.create);
router.post('/appointment/update', appointment.update);

export default router;
