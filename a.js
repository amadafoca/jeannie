function Jeannie(description)
{
  this.description = description;
}

Jeannie.prototype.print = function()
{
  console.log(this.description);
  bla();
}

function bla()
{
  console.log("bla");
}

module.exports = Jeannie;
