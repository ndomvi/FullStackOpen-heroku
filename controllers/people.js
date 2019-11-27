const peopleRouter = require('express').Router()
const Person = require('../models/person')

peopleRouter.get('/info', (_, res) => {
  Person.countDocuments({}).then(size => {
    res.send(`
            <h1>The Phonebook backend!</h1>
            <div>The phonebook has info for ${size} people.</div>
            <div>${Date()}</div>
            `)
  })
})

peopleRouter.get('/', (_, res) => {
  Person.find({}).then(persons => res.json(persons.map(person => person.toJSON())))
})

peopleRouter.get('/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => (person ? res.json(person.toJSON()) : res.status(404).end()))
    .catch(err => next(err)) // res.status(400).send({ error: 'Incorrect ID' })
})

peopleRouter.post('/', (req, res, next) => {
  const body = req.body

  // if (!body.name) return res.status(400).json({ error: 'Missing name!' })
  // if (!body.number) return res.status(400).json({ error: 'Missing number!' })

  const person = new Person({ name: body.name, number: body.number })

  person
    .save()
    .then(newPerson => res.json(newPerson.toJSON()))
    .catch(err => next(err))
})

peopleRouter.put('/:id', (req, res, next) => {
  const body = req.body
  const person = { name: body.name, number: body.number }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => res.json(updatedPerson))
    .catch(err => next(err))
})

peopleRouter.delete('/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => next(err))
})

module.exports = peopleRouter
