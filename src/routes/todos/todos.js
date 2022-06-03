const auth = require('../../middleware/auth');
const notFound = require('../../middleware/notFound');
const {all_db_todo, id_todo, create_todo, update_todo, delete_todo} = require('../../routes/todos/todos.query');

module.exports = function(app, bcrypt) {
    app.get('/todo', auth, (req, res) => {
        all_db_todo(res)
    });
    app.get('/todo/:id', auth, notFound, (req, res) => {
        var id = req.params.id;
        id_todo(res, id);
    });
    app.post('/todo', auth, (req, res) => {
        var user_id = req.body["user_id"];
        var title = req.body["title"];
        var description = req.body["description"];
        var status = req.body["status"];
        var due_time = req.body["due_time"];
        if (user_id === undefined || title === undefined || description === undefined || status === undefined || due_time === undefined) {
            res.status(404).json({"msg":"internal server error"})
            return;
        }
        create_todo(res, title, description, due_time, my_id, status)
    });
    app.delete('/todo/:id', auth, (req, res) => {
        var id = req.params.id;
        delete_todo(res, id);
    });
    app.put('/todo/:id', auth, (req, res) => {
        var id = req.params.id;
        var user_id = req.body["user_id"];
        var description = req.body["description"];
        var due_time = req.body["due_time"];
        var title = req.body["title"];
        var status = req.body["status"];
        if (id === undefined || user_id === undefined || description === undefined || due_time === undefined || title === undefined || status === undefined) {
            res.status(404).json({"msg":"internal server error"});
            return;
        }
        update_todo(res, id, title, description, due_time, user_id, status)
    });
}