const auth = require('../../middleware/auth');

const {all_db_user, register_user, check_email, check_name, get_email, get_id_email, update_user, delete_user} = require('./user.query')

module.exports = function(app, bcrypt) {
    app.post('/register', (req, res) => {
        var email = req.body["email"];
        var auth = req.body["auth"];
        var fname = req.body["fname"];
        var lname = req.body["lname"];
        register_user(res, email, auth, fname, lname);
    });
    app.post('/login', (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
    });
    app.get('/user', (req, res) => {
        all_db_user(res);
    });
    app.get('/users/:id', (req, res) => {
        var id = req.params.id;
        get_id_email(res, id);
    });
    app.get('/users/:email', (req, res) => {
        var email = req.params.email;
        get_email(res, email, auth, bcrypt, callback);
    });
    app.put('/users/:id', auth, (req, res) => {
        var id = req.params.id;
        var email = req.body["email"];
        var fname = req.body["fname"];
        var lname = req.body["lname"];
        var password = req.body["password"]
        update_user(res, id, email, fname, lname, password, auth)
    });
    app.delete('/users/:id', (req, res) => {
        var user_id = req.params.id;
        delete_user(res, user_id);
    });
}
