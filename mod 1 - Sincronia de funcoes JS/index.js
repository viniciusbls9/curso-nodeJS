/** 
 * 0 Obter um usuário
 * 1 Obter o numero de telefone de um usuário a partir de seu id
 * 2 Obter o endereço do usuário pelo id
*/

// importamos um modulo interno do nodeJS
const util = require('util')
const obterEnderecoAsync = util.promisify(getAddress)


function getUser() {
    // quando der algum problema -> reject (ERRO)
    // quando for sucesso, -> RESOLV
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            // return reject(new Error('deu ruim de verdade'))
            return resolve({
                id: 1,
                name: 'Aladin',
                birthDate: new Date()
            })
        }, 1000)
    })
}

function getPhone(userId) {
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                phone: '111233669',
                ddd: 11
            })
        }, 2000)
    })
}

function getAddress(userId, callback) {
    setTimeout(() => {
        return callback(null, {
            street: 'dos bobos',
            number: 0
        })
    }, 2000)
}

const usuarioPromise = getUser()
// para manipular o sucesso, usamos a função .then
// para manupular erros, usamos o .catch
// usuário -> telefone -> telefone
usuarioPromise
    .then(function (usuario) {
        return getPhone(usuario.id)
            .then(function resolverTelefone(result) {
                return {
                    usuario: {
                        name: usuario.name,
                        id: usuario.id
                    },
                    telefone: result
                }
            })
    })
    .then(function (resultado) {
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function (resultado) {
        console.log(`
            nome: ${resultado.usuario.name}
            endereco: ${resultado.endereco.street}, ${resultado.endereco.number}
            telefone: ${resultado.telefone.ddd} ${resultado.telefone.phone}
        `)
    })
    .catch(function (error) {
        console.error('deu ruim', error)
    })
// getUser(function userSolved(error, user) {
//     if(error) {
//         console.error('deu ruim em usuário', error)
//         return;
//     }

//     getPhone(user.id, function phoneSolved(error1, phone) {
//         if(error1) {
//             console.error('deu ruim em telefone', error1)
//             return;
//         }

//         getAddress(user.id, function addressSolved(error2, address) {
//             if(error2) {
//                 console.error('deu ruim em endereço', error1)
//                 return;
//             }
//             console.log(`
//                 nome: ${user.name},
//                 endereço: ${address.street}, ${address.number},
//                 telefone: ${phone.ddd} - ${phone.phone}
//             `)
//         })
//     })
// })
// const phone = getPhone(user.id)