const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const { email, password } = request.body;

        const EmailAlreadyExists = await connection('restaurant')
        .where('email', email)
        .select('email')
        .first();

        if(!EmailAlreadyExists){
            return response.status(200).json( { message: "Email não cadastrado" } );

        } else{
            const restaurant = await connection('restaurant')
            .where('email', email)
            .select('password')
            .first();

            if(restaurant.password === password){
                return response.status(200).json( { message: "Senha correta" } )
            } else {
                return response.json( { error: "Senha incorreta" } );
            }
        }
    }
};

