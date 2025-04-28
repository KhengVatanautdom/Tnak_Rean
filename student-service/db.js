const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://darluch:utdom@utdom.rkrwl8d.mongodb.net/studentdb?retryWrites=true&w=majority&appName=utdom', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('Connection error:', err));
