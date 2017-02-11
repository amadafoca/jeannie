module.exports = {
    handler: function(sender, message) {
        if (message == null || message == "")
        {
            message.result = "error";
            return message;
        }

        console.log(message);

        switch (message.action) {
            case "board-subscribe":
                return subscribeBoard(sender, message);

            case "thread-subscribe":
                return subscribeThread(sender, message);

            case "thread-create":
                return createThread(sender, message);

            case "comment-create":
                return createComment(sender, message);

            case "comment-answer":
                return answerComment(sender, message);

            default:
                message.result = "error";

                return message;
        }
    }
}

var threads = [];
var thread_id_seq = 1;
var comment_id_seq = 1;

function subscribeBoard(sender, message) {
    return message;
}

function subscribeThread(sender, message) {
    return message;
}

function createThread(sender, message) {
    var thread = {
        'id': thread_id_seq++,
        'text': message.data.text,
        'created': Date.now(),
        'last-modified': Date.now(),
        'estimated-duration': '2 min',
        'scheduled-date': '',
        'state': 'pending_user'
    };

    threads.push(thread);
    console.log(thread);

    message.result = "success";

    notify(sender, 'board-update');

    return message;
}

function createComment(sender, message) {
    return message;
}

function answerComment(sender, message) {
    return message;
}

function notify(sender, update_type)
{
  if (update_type == 'board-update')
  {
      var message = {'update': 'board-update', 'threads' : threads};
      sender(message);
  }
}
