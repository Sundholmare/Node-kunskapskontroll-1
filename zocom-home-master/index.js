const { app } = require('./core'); 
const { db, update } = require('./db');

app.listen(3000, () => {
    console.log('API for smart home 1.1 up n running.')
})

/* CODE YOUR API HERE */

// path till alla lights.
app.get('/lights/:id', (req, res) => {
    // variabel för att bedöma om lampan är av eller på.
    const state = req.query.state === 'on' ? true : false;
    // variabel för färg. '#' tillagt för att det går ej att skriva i URLen.
    const color = `#${req.query.color}`

    //variabel för att förenkla id:et i urlen.
    let id = `LIG${req.params.id}`

    // if-statement baserat på om urlen innehåller 'color'.
    if(req.url.includes('color')){
        db.get('devices')
        .find({type: 'Light', id: id})
        .assign({on: state, color: color})// objektet letar efter state och color.
        .value();
        
        update();
    }else{
        // uppdaterar objektet med ny info.
        db.get('devices')
        .find({type: 'Light', id: id})
        .assign({on: state}) // objektet letar efter state.
        .value();
        // kallar på update() functionen som uppdaterar statet.
        update();
    }
    
    // Skickar tillbaka ett response efter ett godkänt request.
    res.send(`${req.params.id} is ${req.query.state}`)
})


// path till AC:n.
app.get('/ac', (req, res) => {
    const state = req.query.state === 'on' ? true : false;
    // variabel för AC:ns temperatur.
    const temp = req.query.temp;

    db.get('devices')
    .find({type: 'AC'})
    .assign({on: state, temperature: temp})
    .value();

    update();

    res.send(`The AC is ${req.query.state}`)
})

// Path till blinds.
app.get('/blinds', (req, res) => {
    const state = req.query.state === 'down' ? true : false;

    db.get('devices')
    .find({type: 'Blind'})
    .assign({on: state})
    .value();

    update();

    res.send(`The blinds are ${req.query.state}`)
})

// Path till kameran.
app.get('/camera', (req, res) => {
    const state = req.query.state === 'on' ? true : false;

    db.get('devices')
    .find({type: 'Camera'})
    .assign({on: state})
    .value();

    update();

    res.send(`The camera is ${req.query.state}`)
})

// Path till dammsugaren.
app.get('/vacuum', (req, res) => {
    const state = req.query.state === 'cleaning' ? true : false;

    db.get('devices')
    .find({type: 'Vacuum'})
    .assign({on: state})
    .value();

    update();

    res.send(`The vacuum is ${req.query.state}`)
})

// Path till högtalaren.
app.get('/speaker', (req, res) => {
    const state = req.query.state === 'on' ? true : false;

    db.get('devices')
    .find({type: 'Speaker'})
    .assign({on: state})
    .value();

    update();

    res.send(`The speaker is ${req.query.state}`)
})

// Path till dörren.
app.get('/door', (req, res) => {
    const state = req.query.state === 'open' ? true : false;

    db.get('devices')
    .find({type: 'Lock'})
    .assign({locked: state})
    .value();

    update();

    if(state === true){
        res.send('Unlocked.')
    }else if(state === false){
        res.send('Locked.')
    }
})
