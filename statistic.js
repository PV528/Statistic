const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
const PORT = process.env.PORT;

mongoose.connect('mongodb://mongologs:27017/logs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Povezava na MongoDB vzpostavljena'))
.catch(error => console.error('Napaka pri povezovanju:', error));

const Log = require('./models/log');

app.get('/endpoint-counts', async (req, res) => {
    try {
      const counts = await Log.aggregate([
        { $group: { _id: { url: '$url', method: '$method' }, count: { $sum: 1 } } }
      ]);
  
      res.json(counts);
    } catch (error) {
      console.error('Error counting endpoints:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
app.listen(PORT, () => {
  console.log(`Microservice is running on port ${PORT}`);
});
