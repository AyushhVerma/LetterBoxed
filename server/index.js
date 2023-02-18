const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.set('strictQuery', true);
async function main() {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.liam6.mongodb.net/?retryWrites=true&w=majority`);
}

main().catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    watchlist: { type: [Number], required: true }
});

var User = mongoose.model('User', userSchema);

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username:username, email:email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
    return res.status(200).json({ token });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    console.log(user, email)
    if (!user) {
        return res.status(400).json({ error: 'Email or password is incorrect' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Email or password is incorrect' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({ token });
});

app.delete('/movie-in-watchlist', async (req, res) => {
    const { user_id, movie_id } = req.body;
    const user = await User.findOne({ _id: user_id });
    if (!user) {
        return res.status(400).json({ error : 'user not present with the name ' + user });
    } else {
        if (user.watchlist.find((x) => x === Number(movie_id)) !== undefined) {
            user.watchlist.splice(user.watchlist.indexOf(movie_id), 1);
            user.save();
        }
    }
    return res.status(200).json(user.watchlist);
});

app.post('/movie-in-watchlist', async (req, res) => {
    const { user_id, movie_id } = req.body;
    const decoded = jwt.verify(user_id, process.env.JWT_SECRET);
    var id = decoded.userId;
	console.log(decoded);
    const user = await User.findOne({ _id: id });
    if (!user) {
        return res.status(400).json({ error : 'user not present with the name ' + user });
    } else {
        if (user.watchlist.find((x) => x === Number(movie_id)) === undefined) { 
            user.watchlist.push(movie_id);
            user.save();
					console.log(user);
        }
    }
    return res.status(200).json(user.watchlist);
});

app.get('/watchlist/:token', async (req, res) => {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    var id = decoded.userId;
    var user = await User.findOne({ _id: id });
		console.log(user);
    return res.status(200).json(user.watchlist);
});

const port = 4444;
app.listen(port, () => console.log(`Server running on port ${port}`));
