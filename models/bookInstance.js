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

// Virtual for form
BookInstanceSchema.virtual('due_back_form').get(function() {
    const date = this.due_back
    let year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate()
    if (month.toString().length == 1) month = '0' + month
    if (day.toString().length == 1) day = '0' + day
    return `${year}-${month}-${day}`
})

module.exports = mongoose.model('BookInstance', BookInstanceSchema)