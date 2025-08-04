import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController.js';
import { CategoryService } from '../services/CategoryService.js';
import { CategoryRepository } from '../repositories/CategoryRepository.js';

const categoriesRouter = Router();
const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

categoriesRouter.post('/', (req, res) => categoryController.create(req, res));
categoriesRouter.get('/', (req, res) => categoryController.findAll(req, res));
categoriesRouter.get('/:id', (req, res) => categoryController.findById(req, res));
categoriesRouter.patch('/:id', (req, res) => categoryController.update(req, res));
categoriesRouter.delete('/:id', (req, res) => categoryController.delete(req, res));

export { categoriesRouter };
