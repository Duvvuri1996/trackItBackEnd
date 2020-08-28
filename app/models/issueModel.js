const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Issue = new Schema ({
    
    issueId : String,

    status : {
        type : String,
        default : 'Backlog'
    },

    userId : String,

    assigneeId : String,

    userName : String,

    assigneeName : String,

    issueTitle : {
        type : String,
        default : ''
    },
    issueDescription : {
        type : String,
        default: ''
    },
    image : [],

    createdOn : {
        type :Date,
        default : ''
    },
    modifiedOn : {
        type: Date,
        default : ''
    },

    numOfDays : {
        type : String,
        default : 0
    }

})
User.index({ '$**' : 'text' })

module.exports = mongoose.model('Issue', Issue)