function Request(description, status)
{
  this.description = description;
  this.clarification = [];
  this.creationDate = Date.now();
  this.lastModified = this.creationDate;
  this.status = status != null ? status : "started";
}

Request.prototype.print = function () {
  console.log(this.description);
  console.log(this.clarification);
  console.log(this.status);
  console.log(this.creationDate);
};
