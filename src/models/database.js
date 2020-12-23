import mongoose from 'mongoose'
import * as config from '../config/config'

mongoose.connect(`mongodb://${config.DB_HOST}/${config.DB_NAME}`, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false,
    useCreateIndex:true
})
    .then(() => console.log('DB connected'))
    .catch(error => console.log(error))