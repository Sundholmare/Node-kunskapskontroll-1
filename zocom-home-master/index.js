const { app } = require('./core'); 
const { db, update } = require('./db');

app.listen(3000, () => {
    console.log('API for smart home 1.1 up n running.')
})

/* CODE YOUR API HERE */

app.get('/lights/:id', (req, res) => {
    const state = req.query.state === 'on' ? true : false;

    db.get('devices')
    .find({type: 'Light', id: req.params.id})
    .assign({on: state})
    .value();

    update();

    res.send(`${req.params.id} är ${req.query.state}`)
})


app.get('/AC', (req, res) => {
    const state = req.query.state === 'on' ? true : false;
    const temp = req.query.temp;

    db.get('devices')
    .find({type: 'AC'})
    .assign({on: state, temperature: temp})
    .value();

    update();

    res.send(`AC:n är ${req.query.state}`)
})