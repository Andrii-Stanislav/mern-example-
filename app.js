const express = require('express')
const path = require('path')
const cors = require('cors')
const logger = require('morgan')

require('dotenv').config()
const port = process.env.PORT || 5000

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const settingsRouter = require('./routes/settings')
const billingRouter = require('./routes/billing')
const appsRouter = require('./routes/apps')
const licensesRouter = require('./routes/license')
const subPartnersRouter = require('./routes/subPartners')
const affiliateRouter = require('./routes/affiliate')

const app = express()

app.use(logger('dev'))

app.use(cors())
app.use(express.json({ limit: 100000 }))

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/settings', settingsRouter)
app.use('/api/billing', billingRouter)
app.use('/api/apps', appsRouter)
app.use('/api/license', licensesRouter)
app.use('/api/subpartners', subPartnersRouter)
app.use('/api/affiliate', affiliateRouter)

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ message: err.message })
})

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(port, () => console.log(`Listening on port ${port}`))
