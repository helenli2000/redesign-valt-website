/*
 * Author: "Daniel Afergan, Evan M. Peck, Erin Solovey, Sam Hincks, AJ Jenkins, Eli T. Brown, Remco Chang, Robert Jacob"
 * Award: "Honorable Mention Award"
 * Category: "Conference"
 * Journal: "ACM SIGCHI Conference on Human Factors in Computing Systems (CHI)"
 * Key: "afergan2014dynamic"
 * Title: "Dynamic Difficulty Using Brain Metrics of Workload"
 * Year: "2014"
 */

var pubs;

d3.json('files/pubs.json', function(err, d) {
  if(err) console.log(err);
  else {
    pubs = structure(d);
    buildYears(pubs);
  }
});

function structure(data) {
  // nest on type and year
  data = d3.nest()
    .key(function(d) { return d.Year; })
    .key(function(d) { return d.Category; })
    .entries(data);

  return data;
}

function buildYears(data) {
  // first build by each type
  var years = d3.select('#pubs').selectAll('.pubYear')
      .data(data)
      .enter().append('div')
      .classed('pubYear', true);

  // append year as header
  years.append('h4').text(function(d) { return d.key; });

  years.each(buildGroups);
}

function buildGroups() {
  var groups = d3.select(this).selectAll('.pubGroup')
    .data(function(d) { return d.values; })
    .enter().append('div')
    .classed('pubGroup', true);

  groups.append('h4').text(function(d) { return d.key; });

  groups.each(buildPubs)
}

function buildPubs() {
  // Make pub divs
  var divs = d3.select(this).selectAll('.pub')
    .data(function(d) { return d.values; })
    .enter().append('div')
    .classed('pub', true);

  // append pub details
  divs.append('div')
    .classed('pubTitle', true)
    .text(function(d) { return d.Title; });

  divs.append('div')
    .classed('pubAuthor', true)
    .text(function(d) { return d.Author; });

  divs.append('div')
    .classed('pubJournal', true)
    .text(function(d) { return d.Journal; });

  divs.append('div')
    .classed('pubYear', true)
    .text(function(d) { return d.Year; });
}
