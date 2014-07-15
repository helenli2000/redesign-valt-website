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
  pubs = structure(d);
  buildVenue(pubs);
});


function filter(data) {
  data = data.sort(function(a, b) { return b.Year - a.Year; });
  return data.slice(0, 9);
}

function structure(data) {
  // nest on type and year
  data = d3.nest()
    .key(function(d) { return d.Journal; })
    .entries(data);

  return data;
}

function buildVenue(data) {
  // first build by each type
  var venue = d3.select('#recentpubs').selectAll('.pubvenue')
      .data(data)
      .enter().append('div')
      .classed('venue', true);

  // append year as header
  venue.append('h3').text(function(d) { return d.key; });

  venue.each(buildPubs);
}

function buildPubs() {
  // Make pub divs
  var divs = d3.select(this).selectAll('.pub')
    .data(function(d) { return d.values; })
    .enter().append('div')
    .classed('pub', true);

  // Add preview image
  divs.each(buildPreviews)

  var info = divs.append('div')
    .classed('info', true);

  // append pub details
  info.append('div')
    .classed('title', true)
    .text(function(d) { return d.Title; });

  info.append('div')
    .classed('author', true)
    .text(function(d) { return d.Author; });

  info.append('div')
    .classed('journal', true)
    .text(function(d) { return d.Journal + ", " + d.Year; });

  info.each(buildSupplemental)
}

function buildPreviews() {
  var preview = d3.select(this).append('div')
    .classed('preview', true);

  preview.append('a')
    .attr('href', function(d) { return 'publications/'+d.Key+'/'; })
  .append('img')
    //.attr('src', function(d) { return 'img/' + d.key + '-preview.png'; });
    .attr('src', function(d) { return 'img/placekitten.png'; });
}

function buildSupplemental() {
  // only add supplemental if the entry has it
  var _d = d3.select(this).datum();

  if( ! _d.supplemental ) return;

  var len = _d.supplemental.length;

  var supp = d3.select(this).append('div')
    .classed('supplemental', true);

  supp.selectAll('.suppEntry')
    .data(function(d) { return d.supplemental; })
  .enter().append('span')
    .classed('suppEntry', true)
    .html(function(d, i) {
      var str = '';
      if( d.ref )
        str = str + '<a href=\"'+d.ref+'\">'+d.name+'</a>';
      else
        str = str + '<span>'+d.name+'</span>';
      if(i !== len-1)
        str = str + ' | ';
      return str;
    });
}
