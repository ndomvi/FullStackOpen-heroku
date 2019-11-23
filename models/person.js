const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('Connecting to mongoDB...')
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to MongoDB successfuly!')
  })
  .catch(err => {
    console.log('An error during MongoDB connection has occured: ', err)
  })

const personSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true, unique: true, uniqueCaseInsensitive: true },
  number: { type: String, minlength: 8, required: true }
})
personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (_, returnedDocument) => {
    returnedDocument.id = returnedDocument._id.toString()
    delete returnedDocument._id
    delete returnedDocument.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
