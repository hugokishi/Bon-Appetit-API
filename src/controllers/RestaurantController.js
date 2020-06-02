const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response){
        const restaurant = await connection('restaurant').select('*');
        return response.json(restaurant);
    },

    async create(request, response){
        const { name, password, email, telephone, street, number, city, uf, cnpj, category} = request.body;
        const id = crypto.randomBytes(5).toString('HEX');
        const data = { id, name, password, email, telephone, street, number, city, uf, cnpj, category};

        
        try{
            await connection('restaurant').insert(data);
            return response.status(200).json({
                id: id,
                ... data
            });
        } catch (err){
            return response.status(401).json( { error: "Email já cadastrado" } );
        }
    }
};

// COMPLETO