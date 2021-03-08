/** 
 * 0 Obter um usuário
 * 1 Obter o numero de telefone de um usuário a partir de seu id
 * 2 Obter o endereço do usuário pelo id
*/

function getUser(callback) {
    setTimeout(() => {
        return callback(null, {
            id: 1,
            name: 'Aladin',
            birthDate: new Date()
        })
    }, 1000)
}

function getPhone(userId, callback) {
    setTimeout(() => {
        return callback(null, {
            phone: '111233669',
            ddd: 11
        })
    }, 2000)
}

function getAddress(userId, callback) {
    setTimeout(() => {
        return callback(null, {
            street: 'dos bobos',
            number: 0
        })
    }, 2000)
}

function userSolved(erro, user) {
    console.log("user", user)
}

getUser(function userSolved(error, user) {
    if(error) {
        console.error('deu ruim em usuário', error)
        return;
    }

    getPhone(user.id, function phoneSolved(error1, phone) {
        if(error1) {
            console.error('deu ruim em telefone', error1)
            return;
        }

        getAddress(user.id, function addressSolved(error2, address) {
            if(error2) {
                console.error('deu ruim em endereço', error1)
                return;
            }
            console.log(`
                nome: ${user.name},
                endereço: ${address.street}, ${address.number},
                telefone: ${phone.ddd} - ${phone.phone}
            `)
        })
    })
})
// const phone = getPhone(user.id)

// console.log("telefone", telefone)