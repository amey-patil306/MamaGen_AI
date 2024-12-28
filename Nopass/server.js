import express from 'express';
import cors from 'cors';
import { Groq } from 'groq-sdk';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://0.0.0.0/calender')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// MongoDB Schemas
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const recommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  trimester: Number,
  age: Number,
  bmi: Number,
  medicalConditions: Boolean,
  fitnessLevel: Number,
  previousPregnancies: Number,
  recommendation: String,
  createdAt: { type: Date, default: Date.now }
});

const messageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  createdAt: { type: Date, default: Date.now }
});

const wellnessScoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  score: Number,
  createdAt: { type: Date, default: Date.now }
});

const resourceSchema = new mongoose.Schema({
  title: String,
  type: String,
  description: String,
  url: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// MongoDB Models
const User = mongoose.model('User', userSchema);
const Recommendation = mongoose.model('Recommendation', recommendationSchema);
const Message = mongoose.model('Message', messageSchema);
const WellnessScore = mongoose.model('WellnessScore', wellnessScoreSchema);
const Resource = mongoose.model('Resource', resourceSchema);

// Llama AI Integration
const apiKey = "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";
const groq = new Groq({ apiKey });

// Routes
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: "llama-3.2-90b-vision-preview",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: true,
      stop: null,
    });

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    for await (const chunk of chatCompletion) {
      res.write(chunk.choices[0]?.delta?.content || "");
    }
    res.end();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Something went wrong");
  }
});

// API Routes
app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/recommendations', async (req, res) => {
  try {
    const recommendation = new Recommendation(req.body);
    await recommendation.save();
    res.status(201).json(recommendation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/recommendations/:userId', async (req, res) => {
  try {
    const recommendations = await Recommendation.find({ userId: req.params.userId });
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/messages', async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/messages/:userId', async (req, res) => {
  try {
    const messages = await Message.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/resources', async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});