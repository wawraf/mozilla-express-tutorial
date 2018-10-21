// Require Mongoose
const mongoose = require('mongoose')
const moment = require('moment')

// Define a schema
const Schema = mongoose.Schema

const AuthorSchema = new Schema(
    {
      first_name: {type: String, required: true, max: 100},
      family_name: {type: String, required: true, max: 100},
      date_of_birth: {type: Date},
      date_of_death: {type: Date}
    }
)

// Virtual for author's full name
AuthorSchema.virtual('name').get(function() {
    return this.first_name + ', ' + this.family_name
})

// Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(function() {
    return this.date_of_death ? 
    (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString() 
    : (new Date().getYear() - this.date_of_birth.getYear()).toString()
})

// Virtual for author's URL
AuthorSchema.virtual('url').get(function() {
    return '/catalog/author/' + this._id;
})

// Virtual for author's birth and death dates
AuthorSchema.virtual('date_of_birth_formatted').get(function() {
    return moment(this.date_of_birth).format('D MMMM YYYY')
})

AuthorSchema.virtual('date_of_death_formatted').get(function() {
    return this.date_of_death ? moment(this.date_of_death).format('D MMMM YYYY') : ''
})

// Virtual for author's birth and death dates
AuthorSchema.virtual('date_of_birth_form').get(function() {
    const date = this.date_of_birth
    let year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate()
    if (month.toString().length == 1) month = '0' + month
    if (day.toString().length == 1) day = '0' + day
    return `${year}-${month}-${day}`
})

AuthorSchema.virtual('date_of_death_form').get(function() {
    if (this.date_of_death) {
        const date = this.date_of_death
        let year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate()
        if (month.toString().length == 1) month = '0' + month
        if (day.toString().length == 1) day = '0' + day
        return `${year}-${month}-${day}`
    } else return undefined
})

module.exports = mongoose.model('Author', AuthorSchema)