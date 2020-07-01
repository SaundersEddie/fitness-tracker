// Browser routes back end code
const router = require('express').Router()
const Workout = require('../models/workout.js')

router.post('/api/workouts', ({ body }, res) => {
  console.log('is everything being grabbed!', { body })
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout)
    })
    .catch(err => {
      res.status(400).json(err)
    })
})

// router.get()
router.get('/api/workouts', (req, res) => {
  Workout.find()
    .then(dbWorkout => res.json(dbWorkout))
    .catch(err => res.json(err))
})
// update put route
router.put('/api/workouts/:id', (req, res) => {
  Workout.findByIdAndUpdate(
    req.params.id,
    { $push: { exercises: req.body } },
    { new: true }
  )
    .then(workout => res.json(workout))
    .catch(err => res.json(err))
})

// get select range of workouts
router.get('/api/workouts/range', (req, res) => {
  Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout)
    })
    .catch(err => res.json(err))
})

// delete route
router.delete('/api/workouts', (req, res) => {})

module.exports = router
