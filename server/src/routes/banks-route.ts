import { Router } from 'express';
import { BankController } from '../controllers/BankController.js';
import { BankService } from '../services/BankService.js';
import { BankRepository } from '../repositories/BankRepository.js';

const router = Router();
const repository = new BankRepository();
const service = new BankService(repository);
const controller = new BankController(service);

router.post('/', controller.create.bind(controller));
router.get('/', controller.findAll.bind(controller));
router.get('/:id', controller.findById.bind(controller));
router.patch('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export { router as banksRouter };
