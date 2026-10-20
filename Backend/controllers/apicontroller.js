const integrantes = require();

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
    })
}

module.exports = {getHealth, getInfo}