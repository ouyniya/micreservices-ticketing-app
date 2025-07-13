import express from "express";

const app = express();
app.use(express.json());

app.get('/api/users/currentuser', (req, res) => {
    res.send('Hi there!!!!')
})

const PORT = 3500;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
