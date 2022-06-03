module.exports = (req, res, next) => {
    var db = require('../config/db')
    var id = req.params.id

    if (id) {
        db.query('SELECT * FROM todo WHERE id = ?', id, function (err, result) {
            if (err) throw err
            if (result.length) {
                next()
            } else {
                res.status(404).json({"msg": "Not found"})
            }
        })
    }
}