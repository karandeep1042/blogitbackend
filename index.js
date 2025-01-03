const express = require('express');
const mongoose = require('mongoose');
const User = require('./Models/UserModel.js');
const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://karan2356:karandeep2356@cluster0.qbvj8xd.mongodb.net/blog', {
}).then(() => {
    console.log('Connected to the Database successfully');
}).catch((err) => {
    console.error('Error connecting to the Database. ',err);
});

app.get('/', async (req, res) => {
    const user = await User.create({
        username: 'karan2356',
        email: 'ks1895304@gmail.com',
        password: 'karandeep2356',
        isAdmin: true,
    })

    if (await user.save()) {
        res.send('User created successfully');
    };
    console.log(user);
})

app.listen(8800, () => {
    console.log('Server is running');
})