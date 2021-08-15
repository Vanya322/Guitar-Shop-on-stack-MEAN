const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const cartSchema = new Schema({
    userId: {
        ref: 'user',
        type: Schema.Types.ObjectId
    },
    products: [
        {
            productId: {
                ref: 'product',
                type: Schema.Types.ObjectId
            },
            countInCart: {
                type: Number,
                required: true,
            }
        }
    ]
})

module.exports = mongoose.model('cart', cartSchema);