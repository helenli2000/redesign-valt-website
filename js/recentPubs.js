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

var GROUP_ORDER = ['Journal', 'Conference', 'Book Chapter', 'Miscellaneous'];

d3.json('files/pubs.json', function(err, d) {
  if(err) return console.log(err);
  d = filter(d);
  pubs = d;
  buildPubs(pubs);
});

function filter(data) {
  data = data.sort(function(a, b) { return b.Year - a.Year; });
  return data.slice(0, 6);
}

function buildPubs(data) {
  // Make pub divs
  var divs = d3.select('#recentpubs').selectAll('.pub')
    .data(data)
    .enter().append('div')
    .classed('pub', true);

  var info = divs.append('div')
    .classed('info', true);

  // append pub details
  info.append('div')
    .classed('title', true)
    .text(function(d) { return d.Title; });

  info.append('div')
    .classed('author', true)
    .text(function(d) { return d.Author.split(',')[0]; });

  info.append('div')
    .classed('journal', true)
    .text(function(d) { return d.Journal + ", " + d.Year; });
}
