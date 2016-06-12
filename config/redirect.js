/**
    @fileOverview
        将/xxx/重定向到/xxx
 */
module.exports = function () {
    return function (req, res, next) {
        var path, path_length, url, fixed_path;

        if (req.path === '/') {
            return next(null);
        }
        else if (req.path.match(/\/$/)) {
            url = req.url;
            path = req.path;
            path_length = req.path.length;
            fixed_path = path.substring(0, path_length - 1);

            return res.redirect(url.replace(path, fixed_path));
        }
        else {
            return next(null);
        }
    };
};