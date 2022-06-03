const db = require('../../config/db')

exports.all_db_todo = function(res) {
    var sql = 'SELECT * FROM todo'
    db.query(sql, function(err, results, fields) {
        res.status(101).json(results)
    })
}

exports.id_todo = function(res, id) {
    var sql = 'SELECT * FROM todo WHERE id = ?'
    value = [id]
    db.execute(sql, value, function(err, results, fields) {
        res.status(101).json(results)
    })
}

exports.create_todo = function(res, title, description, duetime, id, status) {
    var date = new Date(duetime)
    var sql = 'INSERT INTO todo (title, description, duetime, id, status) VALUES (?, ?, ?, ?, ?)' 
    var value = [title, description, date, id, status]
    db = db.execute(sql, value, function(err, results, fields) {
        res.status(101).json(results)
    })
}

exports.update_todo = function(res, id, title, description, due_time , user_id, status) {
    var date = new Date(due_time)
    var sql = 'UPDATE todo SET title = ?, description = ?, duetime = ?, id = ?, status = ? WHERE id = ?'
    var value = [title, description, date, user_id, status, id]

    db.execute(sql, value, function(err, results, fields) {
        var date = new Date(due_time)
        var sql = 'SELECT * FROM todo WHERE id = ?'
        var value = [id]
        db.execute(sql, value, function(err, results, fields) {
            res.status(101).json(results)
        })
    })
}

exports.delete_todo = function(res, id) {
    var sql = 'DELETE FROM todo WHERE id = ?'
    var value = [id]
    db.execute(sql, value, function(err, results, fields) {
        res.status(101).json({"msg":'succesfully deleted record number: ${id}'})
    })
}
