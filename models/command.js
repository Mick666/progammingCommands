const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const commandSchema = new mongoose.Schema({
  command: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
})

commandSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Command', commandSchema)