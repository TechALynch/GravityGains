const mongoose = require('mongoose')

const ExerciseSchema = require('./Exercise')
const SkillSchema = require('./Skill')
const UserSchema = require('./User')
const WorkoutSchema = require('./Workout')
const CategorySchema = require('./Category')

const Exercise = mongoose.model('Exercise', ExerciseSchema)
const Skill = mongoose.model('Skill', SkillSchema)
const User = mongoose.model('User', UserSchema)
const Workout = mongoose.model('Workout', WorkoutSchema)
const Category = mongoose.model('Category', CategorySchema)

module.exports = {
    Exercise,
    Skill,
    User,
    Workout,
    Category
};
