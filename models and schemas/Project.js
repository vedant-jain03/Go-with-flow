const mongoose = require('mongoose')
const project = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    projectname:{
        type:String,
        required: true
    },
    elements: {
        type: String,
        required: true
    }
})

const ProjectModel = mongoose.model('PROJECT',project);
module.exports = ProjectModel;