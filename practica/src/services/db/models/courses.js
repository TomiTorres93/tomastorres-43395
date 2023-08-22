//TODO: Completar Modelo con Mongoose:
import mongoose from 'mongoose';

const collectionName = 'courses';

const stringTypeSchemaUniqueRequired = {
    type: String,
    unique: true,
    required: true
};

const stringTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};


const courseSchema = new mongoose.Schema({
    name: stringTypeSchemaUniqueRequired,
    teacher: stringTypeSchemaNonUniqueRequired,
    students: []
});




// exportar
export const coursesModel = mongoose.model(collectionName, courseSchema);