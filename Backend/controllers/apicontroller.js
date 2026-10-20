const integrantes = require('../data/integrantes');

function getHealth(req, res){
    res.json(
        {
            status: 'Todo bien',
            message: 'El API esta corriendo correctamente',
        }
    );
}


function getInfo(req, res){
    res.json({
    status: 'Todo bien',
    message: 'El API está funcionando correctamente',
     total_integrantes: integrantes.length,
        integrantes,
    })
}

module.exports = {getHealth, getInfo}