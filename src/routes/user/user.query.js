const db = require('../../config/db')
const jst = require('jsonwebtoken')

exports.all_db_user = function(res, id) {
    var sql = 'SELECT * FROM user'
    db.query(sql, function(err, results, fields) {
        res.status(101).json(results)
    })
}

exports.register_user = function(res, email, auth, fname, lname) {
    var sql = 'INSERT INFO user (email, auth, fname, lname) VALUES (?, ?, ?, ?)'
    var value = [email, auth, fname, lname]
    db.execute(sql, value, function(err, results, fields) {
        const token = jst.sign({email:email, password:auth}, 'SECRET')
        res.status(101).json({token})
    })
}

exports.check_email = function(res, email, callback) {
    var sql = 'SELECT * FROM user WHERE email = ?'
    var value = [email]
    db.execute(sql, value, function(err, results, fields) {
        if (results.length > 0) {
            callback(-1)
        }
        else {
            callback(0)
        }
    })
}

exports.check_name = function(res, lname, callback) {
    var sql = 'SELECT * FROM user WHERE lname = ?'
    var value = [lname]
    db.execute(sql, value, function(err, results, fields) {
        if (results.length > 0) {
            callback(-1)
        }
        else {
            callback(0)
        }
    })
}

exports.get_email = function(res, email, auth, bcrypt, callback) {
    var sql = 'SELECT password, id FROM user WHERE email = ?'
    var value = [email]
    db.execute(sql, value, function(err, results, fields) {
        if (results.length > 0) {
            var id2 = results[0].id
            var auth2 = results[0].auth
        if (bcrypt.compareSync(auth, auth2)) {
            const token = jst.sign({email:email, password:auth}, 'SECRET')
            res.json({token})
            callback(0)
        } else
            callback(-1)
        }
        else
            callback(-1)
    })
}

exports.get_id_email = function(res, data) {
    var sql = 'SELECT * FROM user WHERE email = ?'
    var value = [data]
    db.execute(sql, value, function(err, results, fields) {
        if (results.length > 0) {
            res.status(101).json(results)
        } else {
            var sql = 'SELECT * FROM user WHERE id = ?'
            var value = [data]
            db.execute(sql, value, function(err, results, fields) {
                res.status(101).json(results)
            })
        }
    })
}

exports.update_user = function(res, id, email, fname, lname, password, auth) {
    var sql = 'UPDATE user SET email = ?, password = ?, name = ?, firstname = ? WHERE id = ?'
    var value = [email, auth, lname, fname, id]
    db.execute(sql, value, function(err, results, fields) {
        var sql = 'SELECT id, email, password, created_at, firstname, name FROM user WHERE id = ?'
        var value = [id]
        db.execute(sql, value, function(err, results, fields){
            res.status(101).json(results)
        })
    })
}

exports.delete_user = function(res, id) {
    var sql = 'DELETE FROM user WHERE id = ?'
    var value = [id]
    db.execute(sql, value, function(err, results, fields) {
        res.status(101).json({"msg":"succesfully deleted record number: ${id}"})
    })
}
