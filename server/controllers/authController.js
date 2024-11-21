const { auth, db } = require('../firebase');

exports.signup = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const user = await auth.createUser({
            email,
            password,
            displayName: username,
        });

        await db.collection('users').doc(user.uid).set({
            username,
            email,
            createdAt: new Date(),
        });

        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        res.status(200).json({ message: 'Logged in' });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};