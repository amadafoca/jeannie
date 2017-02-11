var Request = require('./entity.js').Request;
var Comment = require('./entity.js').Comment;

// jeannie core
function Jeannie()
{
	this.conn;
  this.requests = [];
	this.request_id_count = 0;
	this.comment_id_count = 0;
}

Jeannie.prototype.register = function(conn)
{
	console.log("Connection registered: " + conn.id)
	this.conn = conn;
}

Jeannie.prototype.handleMessage = function(messageStr)
{
	if (messageStr == null || messageStr == "")
  {
      return {"type" : "error", "text" : "Message cannot be empty or null."};
  }

  var messageJson = JSON.parse(messageStr);

	var result = {'type' : 'ok', 'data' : {}}

  switch (messageJson.action)
  {
      case "get-board":
					result.data.requests = getBoard(this, messageJson);
          break;

      case "create-request":
					result.data.requestId = createRequest(this, messageJson);
					notifyUpdate(this);
          break;

      case "create-comment":
					var commId = createComment(this, messageJson);

					if (commId > 0)
					{
						result.data.commentId = commId;
						notifyUpdate(this);
					}
					else
					{
							result.type = "error"
							result.error_message = "Error creating comment"
					}

          break;

      case "answer-comment":
				var output = answerComment(this, messageJson);

				if (output == 0)
					notifyUpdate(this);
				else
				{
						result.type = "error"
						result.error_message = "Error creating comment"
				}

				break;

      default:
          result.type = "error";
					result.error_message = "Undefined action \'" + messageJson.action + "\'";
  }

  responseJson = messageJson;
  responseJson.result = result;

	console.log(result);

  this.conn.write(JSON.stringify(responseJson));
}

module.exports = Jeannie;

// auxialiar functions

function getBoard(jeannie, messageJson)
{
		return jeannie.requests;
}

function createRequest(jeannie, messageJson)
{
		var request = new Request(messageJson.description);
    jeannie.requests.push(request);
		request.id = jeannie.request_id_count++;

		console.log(request);

	  return request.id;
}

function createComment(jeannie, messageJson)
{
		var reqId = messageJson.data.requestId;
		var comment = new Comment(messageJson.data.description);
		comment.id = comment_id_count++;

		for (var i = 0; i < jeannie.requests.length; i++)
			if (jeannie.requests[i].id == reqId)
			{
				jeannie.requests[i].clarification.push(comment);
				return comment.id;
			}

		return -1;
}

function answerComment(jeannie, messageJson)
{
	var reqId = messageJson.data.requestId;
	var commId = messageJson.data.commentId;

	for (var i = 0; i < jeannie.requests.length; i++)
		if (jeannie.requests[i].id == reqId)
			for  (var j = 0; jeannie.requests[i].clarification.length; j++)
				if (jeannie.requests[i].clarification[j].id == commId)
				{
					jeannie.requests[i].clarification[j].selected = messageJson.data.selected;
					return 0;
				}

	return -1;
}

function notifyUpdate(jeannie)
{
	jeannie.conn.write({'action' : 'update-board', 'data' : { 'requests' : jeannie.requests}});
}
