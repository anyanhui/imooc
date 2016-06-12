/**
    @fileOverview
        memcached管理器
 */
var path = require('path');
var Memcached = require('memcached');
var _ = require('lodash');

var cache = {};


var memconfig = {
    "ip": "127.0.0.1",
    "port": 11211,
    "lifetime": 604800
};

/**
    memcached包装器
    @param mem {Object} memcached对象
    @param lifetime {Number} memcached对象的过期时间，单位秒
    @param dir {String} 调用者路径
    @returns {Function}
        Function(key, cb) 读操作
        Function(key, value, cb) 写操作
 */
function wrap(mem, lifetime, dir) {
    var wrapper = function () {
        var key, value, cb;

        if (arguments.length === 2) {
            key = arguments[0];

            if (arguments[1] instanceof Function) {
                cb = arguments[1];
                mem.get(key, function (err, data) {
                    // mem.end();
                    if (err) {
                        
                        cb(err, null);
                    }
                    else {
                        cb(err, data);
                    }
                });
            }
            else {
                value = arguments[1];
                cb = function () {};
                mem.set(key, value, lifetime, function (err) {
                    // mem.end();
                    cb(err);
                });
            }
        }
        else if (arguments.length === 3) {
            key = arguments[0];
            value = arguments[1];
            cb = arguments[2];
            mem.set(key, value, lifetime, function (err) {
                // mem.end();
                cb(err);
            });
        }
        else {
            throw new Error('memcached 的调用方式不正确。');
        }
    };

    wrapper.remove = function (key, cb) {
        mem.del(key, cb);
    };

    wrapper.flush = function (cb) {
        mem.flush(cb);
    }

    return wrapper;
}



module.exports = function (key) {

    if (!cache[key]) {
        

        cache[key] = wrap(
            new Memcached(memconfig.ip + ':' + memconfig.port), memconfig.lifetime
        );
    }

    return cache[key];
};



