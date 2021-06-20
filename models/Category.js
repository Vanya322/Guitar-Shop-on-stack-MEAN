const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        default: ''
    },
    user: {
        ref: 'user',
        type: Schema.Types.ObjectId,
        required: true
    }
})

module.exports = mongoose.model('categories', categorySchema);