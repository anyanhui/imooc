/**
    @fileOverview
        全局的错误处理中间件
 */
module.exports = function () {
    return function (err, req, res, next) {
        console.error(err);
        res.send('HTTP 500.');
    };
};