import { Router } from 'express';

// Si queremos cambiar de persistencia - solo descomentar/comentar
// import CourseService from '../services/filesystem/courses.service.js';
import CourseService from '../services/db/courses.service.js';

const router = Router();
const coursesService = new CourseService();


// Completar Router
router.get('/', async (req, res) => {

})

router.post('/', async (req, res) => {

})

export default router;