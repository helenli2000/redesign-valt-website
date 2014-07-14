var updates;

d3.json('files/updates.json', function(err, d) {
  if(err) return console.log(err);
  updates = d;
  buildUpdates();
});

function buildUpdates() {
  var divs = d3.select('#news').selectAll('.update')
    .data(updates)
    .enter().append('div')
    .classed('update', true);

  divs.append('div')
    .classed('date', true)
    .text(function(d) { return d.date; });

  divs.append('div')
    .classed('updateText', true)
    .html(function(d) { return d.text; });
}
