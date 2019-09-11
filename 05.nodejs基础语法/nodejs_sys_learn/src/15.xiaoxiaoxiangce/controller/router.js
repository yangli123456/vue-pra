/**
 * Created by yangli on 2019/9/7.
 */

'use strict'

const file = require('./../models/file');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

// 从这里可以看出数据回来都是异步的，这个时候可以使用promise或者callback来回调到数据再执行
exports.showIndex = function (req, res, next) {
    // res.render('index',{albums:file.getAllAlbums()});
    file.getAllAlbums((err, allAlbums)=> {
        if (err) {
            next()
            return;
        }
        res.render('index', {albums: allAlbums});
    })
}

exports.showAlbum = function (req, res, next) {
    let {albumName} = req.params;
    // res.send(albumName);
    // 获取相册中的所有图片
    // 具体业务交给model
    file.getAllImagesByAlbumName(albumName, function (err, images) {
        if (err) {
            next();
            return;
        }
        res.render('albums', {
            albumname: albumName,
            albums: images
        })
    });
}

exports.uploader = function (req, res, next) {
    file.getAllAlbums((err, albums)=> {
        if (err) {
            next();
            return;
        }
        res.render('upload', {
            albums
        })
    });
}

exports.doPost = function (req, res, next) {
    var form = new formidable.IncomingForm();
    // 所有的上传文件先搞一个临时文件夹存储一下
    form.uploadDir = path.join(__dirname, '../tempup');
    form.parse(req, function (err, fields, files) {
        if (err) {
            next();
            return; // 这里要写return;
        }
        // console.log(fields);
        // console.log(files);
        let {size} = files.img;
        if (parseInt(size) > 1024) {
            fs.unlink(files.img.path,(err) => {
                if (err) {
                    next();
                    return ;
                }
                res.send('图片尺寸要小于1M');
            })
            return ;
        }
        let extname = path.extname(files.img.name);
        let oldPath = files.img.path;
        let newPath = path.join(__dirname, '../uploads', fields.wenjianjia,parseInt(Math.random()*100000)+extname);
        // console.log(newPath);
        fs.rename(oldPath, newPath, (err)=> {
            if (err) {
                next();
                return;
            }
            res.send('success')
        })
    });
}
