// Require Mongoose
const mongoose = require('mongoose')
const moment = require('moment')

// Define a schema
const Schema = mongoose.Schema

const BookInstanceSchema = new Schema(
    {
        book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }, //reference to the associated book
        imprint: {type: String, required: true},
        status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
        due_back: {type: Date, default: Date.now}
    }
)

// Virtual for book's URL
BookInstanceSchema.virtual('url').get(function() {
    return '/catalog/bookInstance/' + this._id
})

// Virtual for date
BookInstanceSchema.virtual('due_back_formatted').get(function() {
    return moment(this.due_back).format('MMMM Do, YYYY')
})

module.exports = mongoose.model('BookInstance', BookInstanceSchema)