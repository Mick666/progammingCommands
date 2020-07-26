const commandsRouter = require('express').Router()
const Command = require('../models/command')

commandsRouter.get('/', async (request, response) => { 
    const commands = await Command.find({})
    console.log(commands)
    response.json(commands)
})

commandsRouter.get('/:id', async (request, response) => {
    const command = await Command.findById(request.params.id)
    if (command) {
      response.json(command)
    } else {
      response.status(404).end()
    }
  })

commandsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const command = new Command(body)
  const savedCommand = await command.save()
  response.json(savedCommand)
})

commandsRouter.delete('/:id', async (request, response) => {
    await Command.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })

commandsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const command = {body}

  Command.findByIdAndUpdate(request.params.id, command, { new: true })
    .then(updatedCommand => {
      response.json(updatedCommand.toJSON())
    })
    .catch(error => next(error))
})

module.exports = commandsRouter