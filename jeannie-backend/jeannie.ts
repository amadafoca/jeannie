import {Request, Comment} from './entity';
import SockJS = require('sockjs');

// jeannie core
export class Jeannie {
    conn: any;
    requests: Array<any>;
    request_id_count: number;
    comment_id_count: number;

    constructor() {
        this.conn;
        this.requests = [];
        this.request_id_count = 0;
        this.comment_id_count = 0;
    }

    register(conn) {
        console.log("Connection registered: " + conn.id)
        this.conn = conn;
    }

    handleMessage(messageStr) {
        if (messageStr == null || messageStr == "") {
            return { "type": "error", "text": "Message cannot be empty or null." };
        }

        var messageJson = JSON.parse(messageStr);

        var result: { type: string, data: any, error_message: string };

        switch (messageJson.action) {
            case "get-board":
                result.data.requests = getBoard(this, messageJson);
                break;

            case "create-request":
                result.data.requestId = createRequest(this, messageJson);
                notifyUpdate(this);
                break;

            case "create-comment":
                var commId = createComment(this, messageJson);

                if (commId > 0) {
                    result.data.commentId = commId;
                    notifyUpdate(this);
                } else {
                    result.type = "error"
                    result.error_message = "Error creating comment"
                }

                break;

            case "answer-comment":
                var output = answerComment(this, messageJson);

                if (output == 0)
                    notifyUpdate(this);
                else {
                    result.type = "error"
                    result.error_message = "Error creating comment"
                }

                break;

            default:
                result.type = "error";
                result.error_message = "Undefined action \'" + messageJson.action + "\'";
        }

        var responseJson = messageJson;
        responseJson.result = result;

        console.log(result);

        this.conn.write(JSON.stringify(responseJson));
    }
}
// auxialiar functions

function getBoard(jeannie, messageJson) {
    return jeannie.requests;
}

function createRequest(jeannie, messageJson) {
    var request = new Request(messageJson.description);
    jeannie.requests.push(request);
    request.id = jeannie.request_id_count++;

    console.log(request);

    return request.id;
}

function createComment(jeannie, messageJson) {
    var reqId = messageJson.data.requestId;
    var comment = new Comment(messageJson.data.description);
    comment.id = jeannie.comment_id_count++;

    for (var i = 0; i < jeannie.requests.length; i++)
        if (jeannie.requests[i].id == reqId) {
            jeannie.requests[i].clarification.push(comment);
            return comment.id;
        }

    return -1;
}

function answerComment(jeannie, messageJson) {
    var reqId = messageJson.data.requestId;
    var commId = messageJson.data.commentId;

    for (var i = 0; i < jeannie.requests.length; i++)
        if (jeannie.requests[i].id == reqId)
            for (var j = 0; jeannie.requests[i].clarification.length; j++)
                if (jeannie.requests[i].clarification[j].id == commId) {
                    jeannie.requests[i].clarification[j].selected = messageJson.data.selected;
                    return 0;
                }

    return -1;
}

function notifyUpdate(jeannie) {
    jeannie.conn.write(JSON.stringify({
        'action': 'update-board',
        'data': {
            'requests': jeannie.requests
        }
    }));
}
