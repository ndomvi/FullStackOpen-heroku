const morgan = require('morgan')

morgan.token('content', req => (req.method === 'POST' ? JSON.stringify(req.body) : ''))
const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :content')

const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send({ error: 'Incorrect ID' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message })
  }

  next(err)
}

module.exports = { requestLogger, unknownEndpoint, errorHandler }
