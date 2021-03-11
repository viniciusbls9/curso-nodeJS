const EventEmitter = require('events');

class MeuEmissor extends EventEmitter {

}

const meuEmissor = new MeuEmissor()
const nomeEvento = 'usuairo:click'
meuEmissor.on(nomeEvento, function (click) {
    console.log('um usuario clicou', click)
})

const stdin = process.openStdin()
function main() {
    return new Promise(function (resolve, reject) {
        stdin.addListener('data', function (value) {
            // console.log('voce digitou', value.toString().trim())
            return resolve(value)
        })
    })
}

main().then(function (resultado) {
    console.log('resultado', resultado.toString())
})

// meuEmissor.emit(nomeEvento, 'na barra de rolagem')
// meuEmissor.emit(nomeEvento, 'no ok')

// let count = 0
// setInterval(() => {
//     meuEmissor.emit(nomeEvento, 'no ok' + (count ++))
// }, 1000);