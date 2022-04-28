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
app.use(rollbar.errorHandler())
app.listen(port, () => console.log(`Take us to warp ${port}!`))
