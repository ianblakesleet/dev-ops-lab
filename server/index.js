const express = require('express')
const path = require('path')
const app = express()
app.use(express.json())

const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: 'd2198af577cd40a78f5ff2f78c35a2bb',
  captureUncaught: true,
  captureUnhandledRejections: true,
})
rollbar.log('Hello world!')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'))
  rollbar.info('file served')
})
const port = process.env.PORT || 4545

let inputText = ['1', 'b', 'hello']

app.get('/user/api', (req, res) => {
  rollbar.log('succesfully recieved input text')
  res.status(200).send(inputText)
})

try {
  nonExistentFunction()
} catch (error) {
  rollbar.error(error)
}
try {
  nonExistentFunction()
} catch (error) {
  rollbar.critical('critical error')
}
try {
  nonExistentFunction()
} catch (error) {
  rollbar.warning('im warning you!')
}

app.use(rollbar.errorHandler())
app.listen(port, () => console.log(`Take us to warp ${port}!`))
