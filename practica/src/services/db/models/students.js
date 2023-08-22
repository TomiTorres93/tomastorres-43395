//TODO: Implementar Modelo con Mongoose:
import mongoose from 'mongoose';

const studentCollection = 'students';


const studentSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        required: [true, 'Correo es requerido']
    }
})


// Definimos el modelo
export const studentModel = mongoose.model(studentCollection, studentSchema);