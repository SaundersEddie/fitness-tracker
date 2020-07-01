const mongoose = require('mongoose')
const Schema = mongoose.Schema
const workoutSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now
    },
    exercises: [
      {
        exerciseType: {
          type: String,
          trim: true
          // required: "Enter an exercise type",
        },
        exerciseName: {
          type: String,
          trim: true
          // required: "Enter the name of an exercise",
        },
        duration: {
          type: Number
          // required: "Enter the total duration of the exercise",
        },
        weight: {
          type: Number
          // required: "Enter total weight",
        },
        reps: {
          type: Number
          // required: "Enter total reps",
        },
        sets: {
          type: Number
          // required: "Enter the number of sets",
        },
        distance: {
          type: Number
        }
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
)
workoutSchema.virtual('totalDuration').get(function () {
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration
  }, 0)
})
const Workout = mongoose.model('Workout', workoutSchema)
module.exports = Workout
