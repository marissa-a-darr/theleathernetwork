const express = require('express');
const db = require('./config/connection');
const userRouter = require('./routes/userRouter');
const thoughtsReactionsRouter = require('./routes/thoughtsReactionsRouter');

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', userRouter);
app.use('/api', thoughtsReactionsRouter);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
});
