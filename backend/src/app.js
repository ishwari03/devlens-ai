const express = require('express');
const cors = require('cors');

const aiRoutes = require('./routes/ai.routes')
const authRoutes = require('./routes/auth.routes')
const reviewRoutes = require("./routes/review.routes");

const app = express()

//middlewares
app.use(cors())
app.use(express.json())

app.get('/', (req,res) => {
    res.send("DevLens AI backend running.")
})

app.use('/ai',aiRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/reviews", reviewRoutes);

module.exports = app;