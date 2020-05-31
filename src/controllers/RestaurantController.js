const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response){
        const restaurant = await connection('restaurant').select('*');
        return response.json(restaurant);
    },

    async create(request, response){
        const { name, password, email, telephone, street, number, city, uf, cnpj, category } = request.body;
        const id = crypto.randomBytes(5).toString('HEX');
        
        try{
            await connection('restaurant').insert({
                id,
                name,
                email,
                password,
                telephone,
                street,
                number,
                city,
                uf,
                cnpj,
                category
            });
            return response.json( { message: "Restaurante cadastrado com sucesso!" } );
        } catch (err){
            return response.json( { error: "Email já cadastrado" } );
        }
    }
};

// COMPLETO