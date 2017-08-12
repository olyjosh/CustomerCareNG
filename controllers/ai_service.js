/**
 * Created by olyjosh on 12/08/2017.
 */

let apiai = require('apiai');
let app = apiai("d7f202c252464b62976e3fcb0ace13bb");
class AIService {

    constructor() {

    }


    sendMessage(req, res) {
        var msg = req.query.message;
        if(msg==undefined){
            return res.json({message: "Invalid"});
        }

        var request = app.textRequest(msg, {
            sessionId: '343433534353433432'
        });


        request.on('response', function(response) {
            console.log(response);
            res.json(response)
        });

        request.on('error', function(error) {
            console.log(error);
        });

        request.end();
    }

}

module.exports = AIService