require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Registration = require('./models/Registration')

const PORT = process.env.PORT || 4000
const MONGODB_URL = process.env.MONGODB_URL

async function connectToDatabase() {
  if (!MONGODB_URL) {
    console.warn(
      'MONGODB_URL is not set. Please define it in backend/.env before starting the server.',
    )
    return
  }

  try {
    await mongoose.connect(MONGODB_URL, {
      dbName: process.env.MONGODB_DB || 'reward_app',
    })
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Failed to connect to MongoDB', error)
  }
}

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ,
    methods: ['GET', 'POST', 'OPTIONS'],
  }),
)

app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.post('/api/registrations', async (req, res) => {
  try {
    const { name, phone, email, city, language } = req.body || {}

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required.' })
    }

    const doc = await Registration.create({
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : undefined,
      city: city ? String(city).trim() : undefined,
      language: language === 'bn' ? 'bn' : 'en',
      userAgent: req.headers['user-agent'],
      ipAddress:
        (req.headers['x-forwarded-for'] || '')
          .toString()
          .split(',')[0]
          .trim() || req.socket.remoteAddress,
    })

    console.log('New registration stored', {
      id: doc._id.toString(),
      name: doc.name,
      phone: doc.phone,
      city: doc.city,
      language: doc.language,
      createdAt: doc.createdAt.toISOString(),
    })

    res.status(201).json({
      ok: true,
      registrationId: doc._id,
      createdAt: doc.createdAt,
    })
  } catch (error) {
    console.error('Error creating registration', error)
    res.status(500).json({ error: 'Failed to save registration.' })
  }
})

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Reward backend listening `)
  })
})

