const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/avinya').then(async () => {
  const db = mongoose.connection.db;
  const jobs = await db.collection('jobs').find().limit(50).toArray();
  console.log('Distinct Salaries:', [...new Set(jobs.map(j => j.salary))]);
  const internships = await db.collection('internships').find().limit(50).toArray();
  console.log('Distinct Stipends:', [...new Set(internships.map(i => i.stipend))]);
  mongoose.disconnect();
}).catch(console.error);
