const { app } = require('./core'); 
const { db, update } = require('./db');

app.listen(3000, () => {
    console.log('API for smart home 1.1 up n running.')
})

/* CODE YOUR API HERE */

app.get('/lights/:id', (req, res) => {
    const state = req.query.state === 'on' ? true : false;
    const color = '#' + req.query.color;

    db.get('devices')
    .find({type: 'Light', id: req.params.id})
    .assign({on: state, color: color})
    .value();

    update();

    res.send(`${req.params.id} är ${req.query.state}`)
})


app.get('/ac', (req, res) => {
    const state = req.query.state === 'on' ? true : false;
    const temp = req.query.temp;

    db.get('devices')
    .find({type: 'AC'})
    .assign({on: state, temperature: temp})
    .value();

    update();

    res.send(`AC:n är ${req.query.state}`)
})

app.get('/blinds', (req, res) => {
    const state = req.query.state === 'down' ? true : false;

    db.get('devices')
    .find({type: 'Blind'})
    .assign({on: state})
    .value();

    update();

    res.send(`The blinds are ${req.query.state}`)
})


app.get('/camera', (req, res) => {
    const state = req.query.state === 'on' ? true : false;

    db.get('devices')
    .find({type: 'Camera'})
    .assign({on: state})
    .value();

    update();

    res.send(`The camera is ${req.query.state}`)
})


app.get('/vacuum', (req, res) => {
    const state = req.query.state === 'cleaning' ? true : false;

    db.get('devices')
    .find({type: 'Vacuum'})
    .assign({on: state})
    .value();

    update();

    res.send(`The vacuum is ${req.query.state}`)
})


app.get('/speaker', (req, res) => {
    const state = req.query.state === 'on' ? true : false;

    db.get('devices')
    .find({type: 'Speaker'})
    .assign({on: state})
    .value();

    update();

    res.send(`The speaker is ${req.query.state}`)
})

