const Lesson = require('../models/lesson');
const Student = require('../models/student');
const moment = require('moment')

module.exports = {
    new: newLesson,
    create,
    show,
    editView,
    update,
    remove
}

//CRUD-less new lesson form 
function newLesson(req, res){
    let planes = Lesson.schema.path('planes').schema.path('plane').enumValues

    res.render('lessons/new',{
        student: req.user,
        flightHours: 0,
        planes,
        hours: 0
    });
}

function create(req,res) {
    //default Date to today
    for (let key in req.body){
        if(req.body[key] === '') delete req.body[key];
    };
    //assign Lesson.student to student id
    req.body.student = req.user.id;
    console.log(req.body)
    let lesson = new Lesson({
        student: req.body.student,
        category: req.body.category,
        date: req.body.date,
        planes: {
            plane: req.body.planes
        },
        hours: req.body.hours,
        instructor: req.body.instructor,
        description: req.body.description
    });
    req.user.totalHours += parseInt(req.body.hours);
    console.log('users total hours: '+ req.user.totalHours)

    lesson.save()
    .then(savedLesson => res.redirect('/students'))
    .catch( e => {res.status(400).send('Please make sure you include Date and category'),
    console.log(e);
    });
}

function show (req,res){
    let id = req.params.id
    Lesson.findById(id)
    .then(lesson=>{
        res.render('lessons/show',{
            lesson,
            student: req.user,
            hours: 0
        });
    })
    .catch(e => {
        res.status(400).send("we can't find this page, sorry"),
        console.log(e)
    });
}




function editView(req,res){
    let planes = Lesson.schema.path('planes').schema.path('plane').enumValues
    let id = req.params.id
    Lesson.findById(id)
    .then(lesson => {
        res.render('lessons/edit',{
            lesson,
            planes,
            lessonIdx: id,
            student: req.user,
            hours: 0
        });
    })
    .catch(e => {
        res.send(400).send('no edit view'),
        console.log(e)
    })
}

function update(req,res){
    Lesson.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(res.redirect('/students'))
    .catch(e => {
        res.status(400).send('unable to save to db'),
        console.log(e)
    });
}

function remove(req,res){

    Lesson.findOneAndDelete({_id: req.params.id})
    .then(res.redirect('/students'))
    .catch(e=> { 
        res.status(400).send('unable to delete'),
        console.log(e)
    });

}


