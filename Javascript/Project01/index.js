import express from 'express';

import dotenv from 'dotenv';

import cors from 'cors';
import e from 'express';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'https://localhost:4000',
    methods: ['GET', 'POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    options: ['*']
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Cohort!')
})
app.get('/students', (req, res) => {
  res.send('This is the student page')
}
)
app.get('/students/:id', (req, res) => {
  res.send('This is the id of student page')
}
)
console.log(process.env.PORT);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

