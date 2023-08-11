import express from 'express'
import mongoose from 'mongoose'
import handlebars from 'express-handlebars'
import session from 'express-session'
import MongoStore from 'connect-mongo' 
import passport from 'passport'
import initializePassport from './passport.config.js'
import dotenv from 'dotenv';
import { Server } from 'socket.io'
import Sockets from './sockets.js'

import productsRouter from './routers/product.router.js'
import cartsRouter from './routers/carts.router.js'
import viewsRouter from './routers/view.router.js'
import sessionRouter from './routers/session.router.js'
import mockingRouter from './routers/mocking.router.js'
import chatRouter from './routers/chat.router.js'

import errorMiddleware from './middlewares/error.middleware.js';
import CustomError from './services/errors/custom_errors.js';
import EErrors from './services/errors/enums.js';
import { generateDatabaseConnectionErrorInfo, generateRoutingErrorInfo } from './services/errors/info.js';

const app = express();
const PORT = process.env.PORT || 8080

dotenv.config();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//configuracion del motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

//Grabación de las sessions
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        dbName: process.env.MONGO_DBNAME
    }),
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}))
app.use('/sessions', sessionRouter)

//aplicamos passport como middleware en el servidor
initializePassport()

// Configuración de Passport antes del middleware de manejo de errores
app.use(passport.initialize());
app.use(passport.session());

//configuracion de la carpeta publica
app.use(express.static('./src/public'))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/products', viewsRouter)
app.use('/carts', viewsRouter)
app.use('/mockingproducts', mockingRouter);
app.use("/chat", chatRouter)

// Middleware para manejar rutas no definidas
app.all('*', (req, res, next) => {
    const customError = CustomError.createError({
        name: 'Ruta no definida',
        message: 'La ruta solicitada no está definida en la aplicación',
        cause: generateRoutingErrorInfo(),
        code: EErrors.ROUTING_ERROR
    });
    next(customError);
});

// Middleware de manejo de errores después de las rutas y Passport
app.use(errorMiddleware);

mongoose.set('strictQuery', false)

//Conexión a la DB
try {
    await mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DBNAME });
    console.log('DB connected!')

    const server = app.listen(PORT, () => {
        console.log('Server Up');
        const io = new Server(server);
        app.use((req, res, next) => {
            req.io = io;
            next();
        });
        Sockets(io);
    });
} catch (error) {
    console.error("No se pudo conectar con la base de datos:", error);
    process.exit(-1);
}


