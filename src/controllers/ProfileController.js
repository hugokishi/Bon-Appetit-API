const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const restaurant_id = request.headers.authorization;
        
        const menu = await connection('menu')
        .where('restaurant_id', restaurant_id)
        .select('*');

        return response.json(menu)
    }
};

