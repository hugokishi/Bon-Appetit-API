const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const { page = 1 } = request.query; 
        const [count] = await connection('menu').count();

        const menu = await connection('menu')
        .join('restaurant', 'restaurant_id', '=', 'menu.restaurant_id')
        .limit(50)
        .offset((page - 1) * 5)
        .select(['menu.id','menu.menuname', 'menu.price', 'menu.restaurant_id','menu.comments' ,'restaurant.name', 'restaurant.email', 'restaurant.telephone']);

        response.header('X-Total-Count', count['count(*)']);
        return response.json(menu);
    },

    async create(request, response){
        const { menuname, price, comments } = request.body; 
        const restaurant_id = request.headers.authorization;

        const [menu] = await connection('menu').insert({
            menuname,
            price,
            comments,
            restaurant_id
        })

        return response.json( { menu } )
    },

    async delete(request, response){
        const { id } = request.params;
        const restaurant_id = request.headers.authorization;
        
        const menu = await connection('menu')
        .where('id', id)
        .select('restaurant_id')
        .first();

        if(menu.restaurant_id != restaurant_id){
            return response.status(401).json({error: 'Operation not permitted.'});
        }

        await connection('menu').where('id', id).delete();
        return response.status(204).send();
    }
};