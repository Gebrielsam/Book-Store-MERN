import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Routes for saving a new book
router.post('/', async (req, res) => {
    try {
        const body = req.body;
        const { title, author, publishYear } = body;

        if (!title || !author || !publishYear) {
            return res.status(400).send({ message: 'Send all required fields: title, author, publishYear' })
        }

        const newBook = {
            title: title,
            author: author,
            publishYear: publishYear,
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

// Route to Get All Books from database
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message })
    }
});

// Route to Get Single Book from database
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        return res.status(200).json(book);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
});

// Update book
router.put('/:id', async (req, res) => {
    try {
        const body = req.body;
        const { title, author, publishYear } = body;
        const { id } = req.params;

        if (!title || !author || !publishYear) {
            return res.status(400).send({ message: 'Send all required fields: title, author, publishYear' })
        }

        const result = await Book.findByIdAndUpdate(id, body);

        if (!result) {
            return res.status(404).json({ message: "Book not found" })
        }

        return res.status(200).send({ message: 'Book successfully updated' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
});

// Delete book
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" })
        }

        return res.status(200).send({ message: 'Book successfully Deleted' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
});

export default router;