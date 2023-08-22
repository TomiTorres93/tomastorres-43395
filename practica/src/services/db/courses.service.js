import { coursesModel } from "./models/courses.js";

export default class StudentService {
    #courses;
    #dirPath;
    #filePath;
    #fileSystem;


    constructor() {
        this.#courses = new Array();
        this.#dirPath = __dirname + '/files';
        this.#filePath = this.#dirPath + "/courses.json";
        this.#fileSystem = fileSystem;
    }

    #prepararDirectorioBase = async () => {

        await this.#fileSystem.promises.mkdir(this.#dirPath, { recursive: true });
        if (!this.#fileSystem.existsSync(this.#filePath)) {

            await this.#fileSystem.promises.writeFile(this.#filePath, "[]");
        }
    }
    getAll = async () => {
        let courses = await coursesModel.find();
        return courses.map(course => course.toObject());
    }
    save = async (course) => {

        try {
            await this.#prepararDirectorioBase();
            this.#courses = await this.getAll();
            this.#courses.push(course);
            await this.#fileSystem.promises.writeFile(this.#filePath, JSON.stringify(this.#courses));

        } catch (error) {
            throw Error(`Error guardando recurso: ${JSON.stringify(usuarioNuevo)}, detalle del error: ${error}`);
        }
    }
}
