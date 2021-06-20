const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const orderSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    order: {
        type: Number,
        required: true
    },
    list: [
        {
            name:{ 
                type: String,
                required: true
            },
            quantity:{
                type: Number,
                required: true
            },
            cost:{
                type: Number,
                required: true
            }
        }
    ],
    user: {
        ref: 'user',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('order', orderSchema);