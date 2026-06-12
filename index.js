const express = require('express');
const app = express();
const db = require('./db'); // Import the database connection
const port = 3000;

const Person = require('./models/person'); // Import the Person model

// Middleware to parse JSON bodies
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.get('/about', (req, res) => {
  res.send('This is the about page.');
});

app.post('/person', async (req, res) => {
    try {
        const data = req.body;
        const person = new Person(data);
        await person.save();
        res.status(201).json({ message: 'Person created successfully', person });
    } catch (error) {
        res.status(400).json({ message: 'Error creating person', error: error.message });
    }
});

app.get('/person', async (req, res) => {
    try {
        const people = await Person.find(); 
        res.status(200).json(people);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching people', error: error.message });
    }
});

app.get('/person/:id', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }
        res.status(200).json(person);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching person', error: error.message });
    }
});

app.put('/person/:id', async (req, res) => {
    try {
        const updatedPerson = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPerson) {
            return res.status(404).json({ message: 'Person not found' });
        }   
        res.status(200).json({ message: 'Person updated successfully', person: updatedPerson });
    } catch (error) {   
        res.status(400).json({ message: 'Error updating person', error: error.message });
    }
});

app.delete('/person/:id', async (req, res) => {
    try {
        const deletedPerson = await Person.findByIdAndDelete(req.params.id);
        if (!deletedPerson) {
            return res.status(404).json({ message: 'Person not found' });
        }   
        res.status(200).json({ message: 'Person deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting person', error: error.message });
    }
});

app.patch('/person/:id', async (req, res) => {
    try {
        const updatedPerson = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPerson) {
            return res.status(404).json({ message: 'Person not found' });
        }
        res.status(200).json({ message: 'Person updated successfully', person: updatedPerson });
    } catch (error) {
        res.status(400).json({ message: 'Error updating person', error: error.message });
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});