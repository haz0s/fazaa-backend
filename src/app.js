const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.get('/', (req, res) => res.send('Fazaa Backend is running!'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(Server running on port ));
