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
  pubs = structure(d);
  buildYears(pubs);
});

function structure(data) {
  // nest on type and year
  data = d3.nest()
    .key(function(d) { return d.Year; })
    .sortKeys(d3.descending)
    .key(function(d) { return d.Category; })
    .sortKeys(function(a,b) { return GROUP_ORDER.indexOf(a) - GROUP_ORDER.indexOf(b); })
    .entries(data);

  return data;
}

function buildYears(data) {
  // first build by each type
  var years = d3.select('#pubs').selectAll('.pubYear')
      .data(data)
      .enter().append('div')
      .classed('year', true);

  // append year as header
  years.append('h3').text(function(d) { return d.key; });

  years.each(buildGroups);
}

function buildGroups() {
  var groups = d3.select(this).selectAll('.pubGroup')
    .data(function(d) { return d.values; })
    .enter().append('div')
    .classed('type', true);

  groups.append('h4').text(function(d) { return d.key; });

  groups.each(buildPubs)
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
    .attr('href', function(d) { return null; }) //'publications/'+d.Key+'/'; })
  .append('img')
    .attr('src', function(d) { 
      if(d.img) return d.img;
      else return 'img/preview/preview-logo.png'; 
    });
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
