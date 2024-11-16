const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.send('Hello Namesh!!');
})

app.get('/custom', (req, res) => {
	// res.status(418);
	// res.set('x-my-header', 'abcd');
	res.status(418).set('x-my-header', 'abcd').send('Hello Custom!!');
});

app.listen(port, () => console.log(`App listening no port ${port}`));
