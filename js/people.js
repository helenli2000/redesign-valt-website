var people;

d3.json('files/people.json', function(err, d) {
  if(err) return console.log(err);
  people = d;
  buildpeople();
});

function buildpeople() {
  var divs = d3.select('#people').selectAll('.dweller')
    .data(people)
    .enter().append('div')
    .classed('dweller', true);

  divs.append('div')
    .classed('headshot', true)
    .text(function(d) { return d.img; });
}
