const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('dist'));
app.use(express.json());

app.post('/analyze', async (req, res) => {
    const { text } = req.body;
    const apiKey = process.env.AYLIEN_API_KEY;

    try {
        const response = await axios.post('https://api.aylien.com/api/v1/sentiment', {
            text: text,
        }, {
            headers: {
                'X-AYLIEN-TextAPI-Application-ID': process.env.AYLIEN_APP_ID,
                'X-AYLIEN-TextAPI-Application-Key': apiKey,
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error analyzing text' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
