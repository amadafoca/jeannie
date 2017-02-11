function Request(description, status)
{
  this.id = 0;
  this.description = description;
  this.clarification = [];
  this.creationDate = Date.now();
  this.lastModified = this.creationDate;
  this.status = status == null ? "started" : status;
}

Request.prototype.print = function () {
  console.log(this.description);
  console.log(this.clarification);
  console.log(this.creationDate);
  console.log(this.lastModified);
  console.log(this.status);
};

function Comment(description, type)
{
  this.description = description;
  this.type = type == null ? "info" : type; // info | question
  this.options = [];
  this.selected = "";
}

exports.Request = Request;
exports.Comment = Comment;
