import { Router } from 'express';
import { leads } from '../controllers';

const router = Router();

router.post('/', leads.insert);
router.get('/:id', leads.getId);
router.get('/', leads.getAll);

export default router;