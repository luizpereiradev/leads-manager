import { Router } from 'express';
import { leads } from '../controllers';

const router = Router();

router.post('/', leads.insert);
router.get('/', leads.getAll);
router.get('/:id', leads.getId);
router.put('/:id', leads.updateLead);

export default router;