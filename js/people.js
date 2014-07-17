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
    .classed('dweller', true)
    .append('a')
    .attr('href', function(d) { return d.link; });

  divs.append('div')
    .classed('headshot', true)
    .append('img')
    .attr('src', function(d) { return d.img; });

  divs.append('div')
    .classed('info', true)
    .html(function(d) { return d.name + '<br>' + d.title; });
}
