const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const planeSchema = new Schema({
    plane: {
        type: String,
        enum: ['Cessna 152', 'Cessna 172']
    }
});


const lessonSchema = new Schema ({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
    category: String,
    date: {
        type: Date,
        required: true
    },
    instructor: String,
    hours: {
       type: Number, 
       required: true,
       default: 0
    } ,
    planes: planeSchema,
    description: String,
    weightAndBalance: Number
},{
timestamps: true
});


module.exports =  mongoose.model('Lesson', lessonSchema)

lessonSchema.method.getAllHours = function getAllHours () {
    let today = new Date();
    Lesson.find({student: student._id,  date: {$lt: today}}, (lessons)=>
    {
        this.totalHours = lessons.reduce((total, lessons) => total += lessons.hours, 0)
    })

}
