const mongoose = require('mongoose')

const registrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 40,
    },
    email: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    city: {
      type: String,
      trim: true,
      maxlength: 120,
    },
    language: {
      type: String,
      enum: ['en', 'bn'],
      default: 'en',
    },
    userAgent: {
      type: String,
      maxlength: 500,
    },
    ipAddress: {
      type: String,
      maxlength: 120,
    },
  },
  {
    timestamps: true,
  },
)

registrationSchema.index({ phone: 1, createdAt: -1 })

module.exports = mongoose.models.Registration || mongoose.model('Registration', registrationSchema)

