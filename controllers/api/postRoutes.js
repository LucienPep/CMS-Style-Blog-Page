const router = require('express').Router();
const { Post , Comments, User} = require('../../models');
const { withAuth, withApiAuth }= require('../../utils/auth');


//POST method to create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Delete method to delete a post by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No Posts Found' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//PUT method to update a current post by id
router.put('/update/:id', async (req, res) => {
  console.log('update')
  try {
      const updatePost = await Post.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
    
      if (!updatePost) {
        res.status(404).send("Incorrect ID Inputted");
        return;
      }
      res.status(200).json(updatePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//POST method to create a new comment on a post by id
router.post('/comment/:id', withApiAuth, async (req, res) => {
  const userData = await User.findByPk(req.params.id, {
  });

  const user = userData.get({ plain: true });
  const name = user.name

  
    try {
      if (req.session){
        const newComment = await Comments.create({
          ...req.body,
          user_name: name,
          post_id: req.params.id
        });

        res.status(200).json(newComment);
      }else{alert("Please Log-In")}
    } catch (err) {
      res.status(400).json(err);
    }  
});

module.exports = router;
