import { Router } from 'express';
import { leads } from '../controllers';

const router = Router();

router.post('/', leads.insert);

export default router;