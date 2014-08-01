var people;

var GROUP_ORDER = ['Members', 'Alumni', 'Affiliates', 'Collaborators'];

d3.json('files/people.json', function(err, d) {
  if(err) return console.log(err);
  people = d;
  people = structure(people);
  buildgroups();
});

function structure(data) {
  // nest on type and year
  data = d3.nest()
    .key(function(d) { return d.group; })
    .sortKeys(function(a,b) { return GROUP_ORDER.indexOf(a) - GROUP_ORDER.indexOf(b); })
    .entries(data);

  return data;
}

function buildgroups() {
  // first build by each type
  var groups = d3.select('#people').selectAll('.peopleGroup')
      .data(people)
      .enter().append('div')
      .classed('peopleGroup', true);

  // append year as header
  groups.append('h1').text(function(d) { return d.key; });

  groups.each(buildpeople);
}

function buildpeople() {
  var divs = d3.select(this).selectAll('.dweller')
    .data(function(d) { return d.values; })
    .enter().append('div')
    .classed('dweller', true)
    .append('a')
    .attr('href', function(d) { 
      if(d.link) return d.link; 
      else return "";
    });

  divs.append('div')
    .classed('headshot', true)
    .append('img')
    .attr('src', function(d) { return d.img; });

  divs.append('div')
    .classed('info', true)
    .html(function(d) { return d.name + '<br>' + d.title; });
}
