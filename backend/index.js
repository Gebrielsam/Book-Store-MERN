import express from "express";
import { PORT } from "./config.js";
import { mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// MiddleWare for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Allow all origins with Default cors(*)
app.use(cors());

// Allow custom origins
/* app.use(cors({
    origin: 'http://127.0.0.1:5173/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));
*/

app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send('Welcome To MERN Project')
});

app.use('/books', booksRoute);

mongoose.connect(mongoDBURL).then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
        console.log(`App is listening to ${PORT}`);
    });
})
.catch((err) => {
    console.log(err);
});
