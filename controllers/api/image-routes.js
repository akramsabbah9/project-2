const router = require('express').Router();
const { Article, User, Image } = require('../../models');

router.get('/', (req, res) => {
    Image.findAll()
        .then(imageData => res.json(imageData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.get('/:id', (req, res) => {
    Image.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                    model: User,
                    attributes: ['id', 'username']
                },
                {
                    model: Article,
                    attributes: ['id', 'title', 'created_at'],
                },


            ]
        })
        .then(imageData => res.json(imageData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.post('/', withAuth, (req, res) => {
    // input: {"image_url": "https://myimage.com","user_id": 1, "article_id": 2}
    Image.create({
            image_url: req.body.image_url,
            user_id: req.body.user_id,
            article_id: req.body.article_id
        })
        .then(imageData => res.json(imageData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    Image.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(imageData => {
            if (!imageData) {
                res.status(404).json({
                    message: 'No image found with this id!'
                });
                return;
            }
            res.json(imageData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;