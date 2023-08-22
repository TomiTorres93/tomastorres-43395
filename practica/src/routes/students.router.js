import { Router } from 'express';

// Si queremos cambiar de persistencia - solo descomentar/comentar
//import del service para Students. (Se puede probar con el service del file system o el de mongoose)
import StudentService from '../services/filesystem/students.service.js';

const router = Router();
const studentService = new StudentService();

router.get('/', async (req, res) => {
    try {
        let students = await studentService.getAll();
        res.send(students);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener a los estudiantes." });
    }

})

router.post('/',async(req,res)=>{
    try {
        let result = await studentService.save(req.body);
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({error:  error, message: "No se pudo guardar al estudiante."});
    }
})

export default router;