const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.send('Hello Namesh!!');
})

app.get('/custom', (req, res) => {
	res.status(418);
	res.set('x-my-header', 'abcd');
	res.send('Hello World!!');
})

app.listen(port, () => console.log(`App listening no port ${port}`));
