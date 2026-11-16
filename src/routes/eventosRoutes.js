// Routes: liga cada endereço e método HTTP à função do controller.
import { Router } from 'express';
import { listar, buscarPorId, criar, atualizar, excluir } from '../controllers/eventosController.js';

const router = Router();

router.get('/', listar);
router.get('/:id', buscarPorId);
router.put('/:id', atualizar);
router.delete('/:id', excluir);
router.post('/', criar);

export default router;
