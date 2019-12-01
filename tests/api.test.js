const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Person = require('../models/person')
const testHelper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Person.deleteMany({})

  for (const person of testHelper.initialDatabase) {
    const newPerson = new Person(person)
    await newPerson.save()
  }
  //   initialDatabase.forEach(async person => {
  //     const newPerson = new Person(person)
  //     await newPerson.save()
  //   })
})

describe('GET', () => {
  test('returns initial list correctly', async () => {
    const res = await api.get('/api/persons')

    expect(res.body.length).toBe(testHelper.initialDatabase.length)
  })

  test('retuned list is JSON', async () => {
    await api
      .get('/api/persons')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})
describe('POST', () => {
  test('a valid person can be added', async () => {
    const newPerson = { name: 'testperson', number: '123321123' }
    await api
      .post('/api/persons')
      .send(newPerson)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/persons')
    expect(res.body.length).toBe(testHelper.initialDatabase.length + 1)

    const names = res.body.map(person => person.name)
    expect(names).toContain('testperson')
  })

  test('a person without name can not be added', async () => {
    const newPerson = { number: '123321123321' }

    await api
      .post('/api/persons')
      .send(newPerson)
      .expect(400)

    const res = await api.get('/api/persons')
    expect(res.body.length).toBe(testHelper.initialDatabase.length)
  })

  test('a person without number can not be added', async () => {
    const newPerson = { name: 'testperson' }

    await api
      .post('/api/persons')
      .send(newPerson)
      .expect(400)

    const res = await api.get('/api/persons')
    expect(res.body.length).toBe(testHelper.initialDatabase.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
