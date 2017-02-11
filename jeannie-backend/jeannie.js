function Jeannie()
{
	this.conn;
  this.request_id;
}

Jeannie.prototype.register = function(conn)
{
	this.conn = conn;
}

Jeannie.prototype.handleMessage(messageStr)
{
  if (messageStr == null || messageStr == "")
  {
      return {"type" : "error", "text" : "Message cannot be empty or null."};
  }

  messageJson = JSON.parse(messageStr);

  switch (input.action)
  {
      case "board-subscribe":
          result = subscribeBoard(messageJson);
          break;

      case "thread-subscribe":
          result = subscribeThread(messageJson);
          break;

      case "thread-create":
          result = createThread(messageJson);
          break;

      case "comment-create":
          result = createComment(messageJson);
          break;

      case "comment-answer":
          result = answerComment(messageJson);
          break;

      default:
          result = {"type" : "error", "text" : "Undefined action \'" + messageJson.action + "\'"};
  }

  responseJson = messageJson;
  responseJson.result = result;

  conn.write(JSON.stringify(responseJson));
}

function subscribeBoard(request) {
    return message;
}

function subscribeThread(request) {
    return message;
}

function createThread(sender, request) {
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

function createComment(request) {
    return message;
}

function answerComment(request) {
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
