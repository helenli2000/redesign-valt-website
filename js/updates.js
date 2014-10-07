var updates;

d3.json('files/updates.json', function(err, d) {
  if(err) return console.log(err);
  updates = d;
  buildUpdates();
  masonify();
});

function buildUpdates() {
  var divs = d3.select('#news').selectAll('.update')
    .data(updates)
    .enter().append('div')
    .classed('update', true);

  divs.append('div')
    .classed('updateImg', true)
    .append('img')
    .attr('src', function(d) { return d.img; });

  var info = divs.append('div')
    .classed('updateInfo', true);

  info.append('div')
    .classed('date', true)
    .text(function(d) { return d.date; });

  info.append('div')
    .classed('updateHead', true)
    .text(function(d) { return d.head; });

  info.append('div')
    .classed('updateText', true)
    .html(function(d) { return d.text; });
}

function masonify() {
  var container = document.querySelector('#news')
    , msnry;
  imagesLoaded( container, function(d) {
    msnry = new Masonry( container, {
      // options
      columnWidth: 240,
      itemSelector: '.update'
    });
  });
}
