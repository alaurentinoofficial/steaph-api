import { Server } from "../../server"
import { EnvironmentSchema } from "../models/environment"
import { EnvironmentScheduleSchema } from "../models/environment_schedule"
import { Strings } from "../configs/strings"

var body = {}

body.get = (req, res) => {
    EnvironmentScheduleSchema.find({environment: req.params.id}, (err, doc) => {
        if(err)
            return res.json(Strings.INVALID_ENVIRONMENT)
        
        res.json(doc)
    })
}

body.add = (req, res) => {
    EnvironmentSchema.findOne({_id: req.params.id}, (err, e) => {
        if(err)
            return res.json(Strings.INVALID_ENVIRONMENT)

        var b = {
            environment: e._id,
            start: new Date(req.body.start),
            end: new Date(req.body.end),
            status: req.body.status
        }
    
        EnvironmentScheduleSchema.create(b, (err, e) => {
            if(err)
                return res.json(Strings.INVALID_ENVIRONMENT_SCHEDULE)
            
            return res.json(Strings.SUCCEFULY)
        })
    })
}

body.deleteById = (req, res) => {
    EnvironmentScheduleSchema.remove({_id: req.params.id}, (err, d) => {
        if(err)
            return res.json(Strings.INVALID_ENVIRONMENT_SCHEDULE)
        
        res.json(Strings.SUCCEFULY)
    })
}


exports.EnvironmentScheduleController = body