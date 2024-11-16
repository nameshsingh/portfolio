const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.send('Hello Namesh!!');
})

app.get('/custom', (req, res) => {
	res.send('Hello Custom!!');
});

app.listen(port, () => console.log(`App listening no port ${port}`));
