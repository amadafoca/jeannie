function Request(description, status)
{
  this.description = description;
  this.clarification = [];
  this.creationDate = Date.now();
  this.lastModified = this.creationDate;
  this.status = status == null ? "started" : status;
}

Request.prototype.print = function () {
  console.log(this.description);
  console.log(this.clarification);
  console.log(this.status);
  console.log(this.creationDate);
};

function Comment(description, type)
{
  this.description = description;
  this.type = type == null ? "info" : type; // info | question
  this.menu = [];
  this.selected = "";
}
