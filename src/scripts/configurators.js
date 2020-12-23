import Role from '../models/role.model'

const createRoles = async () =>{
    try {
        if (!await Role.estimatedDocumentCount()) {
            const values = await Promise.all([
                    new Role({name: 'ROLE_USER'}).save(),
                    new Role({name: 'ROLE_ADMIN'}).save(),
                    new Role({name: 'ROLE_MODERATOR'}).save()
                ]
            )
            console.log(values)
        }
    }catch (error){
        console.error(error)
    }
}

export {
    createRoles
}