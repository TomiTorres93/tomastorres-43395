import passport from "passport";
//Para usar JWT como estrategia.
import jwtStrategy from 'passport-jwt'
import studentsModel from "../services/db/models/students";


const JWTStrategy = jwtStrategy.Strategy
const extractJWT = jwtStrategy.ExtractJwt

const localStrategy = passportLocal.Strategy
const initializePassport = () => {

    passport.use('register', new localStrategy({passReqToCallback: true, usernameField: 'email'},
    async (req, username, password, done) => {
      const { name, lastName, email, age } = req.body;
      try {
        const exists = await studentsModel.findOne({ email });
        if (exists) {
            return done(null, false, { message: "El usuario ya existe." });
        }
        const user = {
            name,
            lastName,
            email,
            age,
            password: createHash(password) //////////
        };
    
        const result = await studentsModel.create(user);
    
        return done(null, result)
      } catch (error){
        return done("Error registrando al usuario: " + error)
      }
    }
    ))


    //TODO generar las reglas para extraer el token y las autorizaciones necesarias.
    //REGISTER
passport.use('register', new JWTStrategy({
    jwtFromRequest: extractJWT.fromExtractors([cookieExtractor]), 
    secretOrKey: PRIVATE_KEY
},
async (jwt_payload, done) => {
            
    try {
        
        return done(null, jwt_payload.user)
    } catch (error) {
        console.error(error);
        return done(error);
    }
}

))
    //Funciones de Serializacion y Desserializacion
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await studentsModel.findById(id);
            done(null, user);
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    });
};

/**
 * Metodo utilitario en caso de necesitar extraer cookies con Passport
 * @param {*} req el request object de algun router.
 * @returns El token extraido de una Cookie
 */
const cookieExtractor = req => {
    let token = null;
    console.log("Entrando a Cookie Extractor");
    if (req && req.cookies) { //Validamos que exista el request y las cookies.
        console.log("Cookies presentes: ");
        console.log(req.cookies);
        token = req.cookies['jwtCookieToken']; //-> Tener presente este nombre es el de la Cookie.
        console.log("Token obtenido desde Cookie:");
        console.log(token);
    }
    return token;
};

export default initializePassport;