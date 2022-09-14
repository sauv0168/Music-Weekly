const { Comment } = require("../models/");
const commentController = {
  createComment: (req, res) => {
    Comment.create({
        ...req.body,
        user_id: req.session.user_id
    })
      .then((newComment) => {
        console.log(">>>>>COMMENT CREATED!");
        res.json(newComment);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
    updateComment: (req, res) => {
            console.log(">>>>>REQ BODY=" + JSON.stringify(req.body))
            Comment.update({
                    ...req.body
                },
                {
                    where: {
                        id: req.params.id,
                    }
                }).then((updatedComment) => {
                res.json(updatedComment);
            }).catch((err) => {
                res.status(500).json(err);
            })


    },
    deleteComment: (req, res) => {
        console.log(">>>>>REQ BODY="+JSON.stringify(req.body))
        Comment.destroy(
            {
                where: {
                    id: req.params.id,
                }
            }).then((result)=>{
            res.json(result);
        }).catch((err)=>{
            res.status(500).json(err);
        })
    },
};
module.exports = commentController;
