const router = require('express').Router();
const { User, Article, Comment, Revision, Image, Vote } = require('../../models');


// get all users
router.get('/', (req, res) => {
    User.findAll({
            attributes: { exclude: ['password'] }
        })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get a specific user by ID
router.get('/:id', (req, res) => {
    User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            include: [{
                    model: Article,
                    attributes: ['id', 'title', 'created_at']
                },
                // We can add or remove values for this as needed
                {
                    model: Revision,
                    attributes: ['id', 'created_at'],
                    include: {
                        model: Article,
                        attributes: ['title']
                    }
                },
                {
                    model: Article,
                    attributes: ['title'],
                    through: Vote,
                    as: 'voted_articles'
                },
                {
                    model: Article,
                    attributes: ['title'],
                    through: Image,
                    as: 'image_posts'
                },
                {
                    model: Article,
                    attributes: ['title'],
                    through: Comment,
                    as: 'comment_posts'
                }

            ]
        })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with that id' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create a new user
router.post('/', (req, res) => {
    User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        .then(userData => {
            // For session use
            /*            req.session.save(() => {
                            req.session.user_id = userData.id;
                            req.session.username = userData.username;
                            req.session.loggedIn = true;
            */
            res.json(userData);
        });
    /*})*/
});

// user login route
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(userData => {
        if (!userData) {
            res.status(400).json({ message: 'No user found with that email address' });
            return;
        }

        const validPassword = userData.passwordCheck(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Password incorrect' });
            return;
        }
        /*
                req.session.save(() => {
                    // declare session variables
                    req.session.user_id = userData.id;
                    req.session.username = userData.username;
                    req.session.loggedIn = true;*/

        res.json({ user: userData, message: 'Login successful' });
        /*});*/
    });
});

/*// user log out route
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
*/

// update user
router.put('/:id' /*, withAuth*/ , (req, res) => {

    User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        })
        .then(userData => {
            if (!userData[0]) {
                res.status(404).json({ message: 'No user found with that id' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// delete user by ID
router.delete('/:id', /* withAuth,*/ (req, res) => {
    User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with that id' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;