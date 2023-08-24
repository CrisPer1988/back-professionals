const Job = require("./jobs.model")
const Professional = require("./professionals.model")
const Review = require("./reviews.model")
const User = require("./users.model")
const Category = require("./category.model")

const initModel = () => {
    User.hasMany(Review, {foreignKey: 'user_id'})
    Review.belongsTo(User, {foreignKey: 'user_id'})

    // Category.belongsTo(Professional, {foreignKey: 'professional_id'})
    // Professional.hasMany(Category, {foreignKey: 'professional_id'})

    Category.belongsToMany(Professional, { through: 'CategoryProfessional' });
    // En tu modelo de Professional.js
    Professional.belongsToMany(Category, { through: 'CategoryProfessional' });

    Professional.hasMany(Review, {foreignKey: 'professional_id'})
    Review.belongsTo(Professional, {foreignKey: 'professional_id'})

    Professional.hasMany(Job, {foreignKey: 'professional_id'})
    Job.belongsTo(Professional, {foreignKey: 'professional_id'})

}

module.exports = initModel;
