//处理comment
var _ = require('underscore');
var Comment = require('../models/comment');
var User = require('../models/user');

// post comment
exports.save = function(req, res) {
    var _comment = req.body.comment;
    var movieId = _comment.movie;

    User.update({_id: _comment.from}, {$inc: {score:1}}, function(err) {
        if (err) {
            console.log(err);
        }   
        User.findById(_comment.from, function(err, user) {
            if (err) {
                console.log(err);
            }
            req.session.user = user;
            req.session.save();//session保存到数据库

            if (_comment.cid) {
                Comment.findById(_comment.cid, function(err, comment) {
                    var reply = {
                        from: _comment.from,
                        to: _comment.tid,
                        content: _comment.content
                    }

                    comment.reply.push(reply);

                    comment.save(function(err, comment) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect('/movie/' + movieId)
                        }
                    })
                })
            } else {
                var comment = new Comment(_comment);


                comment.save(function(err, comment) {
                    if (err) {
                        console.log(err);
                    }

                    res.redirect('/movie/' + movieId)
                })
            }
        })   
    });
}