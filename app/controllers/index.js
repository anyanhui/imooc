var Movie = require('../models/movie');
var Catetory = require('../models/catetory');

//负责和首页交互
exports.index = function(req, res) {
    Catetory
        .find({})
        .populate({path:'movies', options:{limit:5}})
        .exec(function(err, catetories) {
            if (err) {
                console.log(err);
            }
            res.render('index', {
                title: 'imooc 首页',
                catetories: catetories
            })
        })
}

exports.search = function(req, res) {
    var catId = req.query.cat;
    var q = req.query.q;
    var page = parseInt(req.query.p) || 0;
    var count = 2;
    var index = page * count;

    if (catId) {
        Catetory
            .find({_id: catId})
            .populate({
                path:'movies'
            })
            .exec(function(err, catetories) {
                if (err) {
                    console.log(err);
                }
                var catetory = catetories[0] || {};
                var movies = catetory.movies || [];
                var results = movies.slice(index, index + count);

                res.render('results', {
                    title: 'imooc 结果列表页面',
                    keyword: catetory.name,
                    query: 'cat=' + catId,
                    currentPage: (page + 1),
                    totalPage: Math.ceil(movies.length/2),
                    movies: results
                })
            })
    } else {
        Movie
            .find({title: new RegExp((q + '.*'), 'i')})
            .exec(function(err, movies) {
                if (err) {
                    console.log(err);
                }

                var results = movies.slice(index, index + count);

                res.render('results', {
                    title: 'imooc 搜索结果页',
                    keyword: q,
                    query: 'q=' + q,
                    currentPage: (page + 1),
                    totalPage: Math.ceil(movies.length/2),
                    movies: results
                }); 
            })
    }
    
}