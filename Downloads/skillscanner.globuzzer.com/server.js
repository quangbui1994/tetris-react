const express = require('express');
const app = express();

app.use(require('prerender-node').set('prerenderServiceUrl', 'https://service.prerender.io/').set('prerenderToken', 'EfZcDAZF1hTrQJJ9BI3U'));
app.use(express.static('./'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`The app is running on port ${PORT}`);
});