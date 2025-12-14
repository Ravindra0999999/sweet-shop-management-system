require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const start = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  await connectDB(MONGO_URI);
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`Server running on ${port}`));
};

start().catch(err => {
  console.error(err);
  process.exit(1);
});
