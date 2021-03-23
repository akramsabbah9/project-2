const router = require('express').Router();
const { Revision, Article, User } = require('../../models');

router.get('/', (req, res) => {
    Revision.findAll()
        .then(revisionData => res.json(revisionData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.get('/:id', (req, res) => {
    Revision.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                    model: User,
                    attributes: ['id', 'username']
                },
                {
                    model: Article,
                    attributes: ['id', 'title', 'content', 'created_at'],
                }
            ]
        })
        .then(revisionData => res.json(revisionData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.post('/', (req, res) => {
    // input: {"changes": "A bunch of edits","user_id": 1, "article_id": 2}
    Revision.create({
            changes: req.body.changes,
            user_id: req.body.user_id,
            article_id: req.body.article_id
        })
        .then(revisionData => res.json(revisionData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Revision.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(revisionData => {
            if (!revisionData) {
                res.status(404).json({
                    message: 'No revision found with this id!'
                });
                return;
            }
            res.json(revisionData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;