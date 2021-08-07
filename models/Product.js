const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false
    },
    categoryList: [
        {
            ref: 'category',
            type: Schema.Types.ObjectId
        }
    ],
    count: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('product', userSchema);