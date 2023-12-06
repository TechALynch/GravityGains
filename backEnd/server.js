const PORT = process.env.PORT || 3001
const db = require('./db/index.js')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')

// include controller name and path here
const userController = require('./controllers/userController.js')
const exerciseController = require('./controllers/exerciseController.js')
const skillController = require('./controllers/skillController.js')
const workoutController = require('./controllers/workoutController.js')
const categoryController = require('./controllers/categoriesController.js')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(logger('dev'))

// New route for user login
app.post('/login', userController.login);

//Routes
app.get('/exercises', exerciseController.getAllExercises)
app.get('/skills', skillController.getAllSkills)
app.get('/users', userController.getAllUsers)
app.get('/workouts', workoutController.getAllWorkouts)

// New routes to search by name
app.get('/exercises/search', exerciseController.searchExercisesByName);
app.get('/skills/search', skillController.searchSkillsByName);
app.get('/user/search', userController.searchUsersByName);
app.get('/workouts/search', workoutController.searchWorkoutsByName);

app.get('/category/:id', categoryController.getOneCategory) // New route for fetching a category by its ID

app.get('/exercise/:id', exerciseController.getOneExercise)
app.get('/skills/:id', skillController.getOneSkill)
app.get('/user/:authenticationId', userController.getUserWithAuth0Id);
app.get('/user/:id', userController.getOneUser)
app.get('/workout/:id', workoutController.getOneWorkout)

app.post('/exercise', exerciseController.createExercise)
app.post('/skills', skillController.createSkill)
app.post('/user', userController.createUser)
app.post('/workout', workoutController.createWorkout)

app.put('/exercise/:id', exerciseController.updateExercise)
app.put('/skills/:id', skillController.updateSkill)
app.put('/user/:id', userController.updateUser)
app.put('/workout/:id', workoutController.updateWorkout)

app.delete('/exercises/:id', exerciseController.deleteExercise);
app.delete('/skills/:id', skillController.deleteSkill);
app.delete('/user/:id', userController.deleteUser);
app.delete('/workout/:id', workoutController.deleteWorkout);

app.get('/', (req, res) => {
    res.send('Landing root! Lets Get Started!!!')
  })

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`)
  })  

