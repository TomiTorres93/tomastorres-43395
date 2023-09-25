import { Router } from 'express';
import {isValidPassword, generateJWToken, createHash} from '../util.js';
//Service import
import StudentService from '../services/db/students.service.js';
import passport from "passport";
const router = Router();
const studentService = new StudentService();

// router.post("/register", passport.authenticate('register', {
//     failureRedirect: '/api/jwt'
//   }), async (req, res) => {
//     console.log('Registrando nuevo usuario.');
//     res.status(201).send({ status: "success", message: "Usuario creado con éxito." });
//   });

  router.post("/register", async (req, res) => {
    const {name, lastName, email, age, password} = req.body;
    const studentFound = await studentService.findByUsername(email);

    try {
        if(!studentFound) {
            const hashPassword = createHash(password)
            const student = await studentService.save({name, lastName, email, age, password: hashPassword})
         res.send(student) 
  
        }
        return res.status(404).send({status: "error", error: "Ese usuario a existe"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({status: "error", error: "Error interno de la app."})
    }
  } );



router.post("/login", async (req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await studentService.findByUsername(email);
        console.log("Usuario encontrado para login:");
        console.log(user);
        if (!user) {
            console.warn("User doesn't exists with username: " + email);
            return res.status(400).send({error: "Not found", message: "Usuario no encontrado con username: " + email});
        }
        if (!isValidPassword(user, password)) {
            console.warn("Invalid credentials for user: " + email);
            return res.status(401).send({status:"error",error:"El usuario y la contraseña no coinciden!"});
        }
        const tokenUser= {
            name : `${user.name} ${user.lastName}`,
            email: user.email,
            age: user.age,
            role: user.role
        };
        const access_token = generateJWToken(tokenUser);
        console.log(access_token);
        //Con Cookie
        res.cookie('jwtCookieToken', access_token, {
            maxAge: 60000,
            httpOnly: true
        });
        res.send({message: "Login successful!"});
        //const access_token = generateJWToken(tokenUser); //-->Con access_token
    } catch (error) {
        console.error(error);
        return res.status(500).send({status:"error",error:"Error interno de la applicacion."});
    }
});

//TODO: agregar metodo de registrar estudiante:

export default router;