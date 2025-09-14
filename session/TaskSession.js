const CommonSession = require("./CommonSession");

class TaskSession extends CommonSession{

    taskSessionPage(){
        let taskInputs = this.req.session.taskInputs;
            
        if(!taskInputs){
            taskInputs = {
                hasError: false,
                errorMessage: {},
                taskName: '',
                taskDescription: '',
                hoursRequired: "",
                daysRequired:"" 
            }
        }

        this.req.session.taskInputs = null;

        return taskInputs;
    }

    taskErrorSessionPage(){

    }
}

module.exports = TaskSession;