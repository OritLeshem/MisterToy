const colors = require('colors')
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
// const toyService = require('./services/toy.service')
const path = require('path')

const app = express()
const http = require('http').createServer(app)

// Express App Config
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
  // Express serve static files on production environment
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  // Configuring CORS
  const corsOptions = {
    // Make sure origin contains the url your frontend is running on
    origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true
  }
  app.use(cors(corsOptions))
}
const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const reviewRoutes = require('./api/review/review.routes')

const toyRoutes = require('./api/toy/toy.routes')
const { setupSocketAPI } = require('./services/socket.service')
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
app.all('*', setupAsyncLocalStorage)

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/review', reviewRoutes)
app.use('/api/toy', toyRoutes)
setupSocketAPI(http)

// app.get('/api/toy', (req, res) => {
//   console.log(req.query)
//   const { filterBy, sortBy } = req.query.params
//   toyService.query(filterBy, sortBy)
//     .then(toys => {
//       res.send(toys)
//     })
//     .catch(err => {
//       console.log('Had issues getting toys', err);
//       res.status(400).send({ msg: 'Had issues getting toys' })
//     })
// })

// app.get('/api/toy/:id', (req, res) => {

//   const toyId = req.params.id
//   toyService.getById(toyId)
//     .then(toy => {
//       res.send(toy)
//     })
//     .catch(err => {
//       console.log('Had issues getting toy', err);
//       res.status(400).send({ msg: 'Had issues getting toy' })
//     })
// })

// app.delete('/api/toy/:id', (req, res) => {
//   const toyId = req.params.id
//   toyService.remove(toyId)
//     .then(() => {
//       res.end('Done!')
//     })
//     .catch(err => {
//       console.log('Had issues deleting toy', err);
//       res.status(400).send({ msg: 'Had issues deleteing toy' })
//     })
// })

// app.post('/api/toy', (req, res) => {
//   const toy = req.body
//   toyService.save(toy)
//     .then(savedToy => {
//       res.send(savedToy)
//     })
//     .catch(err => {
//       console.log('Had issues adding toy', err);
//       res.status(400).send({ msg: 'Had issues adding toy' })
//     })
// })

// app.put('/api/toy/:id', (req, res) => {
//   const toy = req.body
//   toyService.save(toy)
//     .then(savedToy => {
//       res.send(savedToy)
//     })
//     .catch(err => {
//       console.log('Had issues updating toy', err);
//       res.status(400).send({ msg: 'Had issues updating toy' })
//     })
// })



app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
const logger = require('./services/logger.service')
const port = 3030
http.listen(port, () => {
  console.log(`Server is up and listening to ${port}`.rainbow);
})
logger.info('Server is running on port: ' + port)
