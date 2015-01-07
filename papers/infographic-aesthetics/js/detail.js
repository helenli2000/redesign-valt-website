console.log(d3);
var pubs;

d3.json('../../files/pubs.json', function(err, d) {
  if(err) return console.log(err);
  pubs = d.filter(function(d) { return d.Key === "harrison2014infographic"; });
  console.log(pubs);
  buildDivs(pubs);
});

/*
 * Author: "Lane Harrison, Fumeng Yang, Steven Franconeri, Remco Chang"
 * Category: "Conference"
 * Journal: "To Appear: IEEE Conference on Visual Analytics (VAST)"
 * Key: "harrison2014ranking"
 * Title: "Ranking Visualizations of Correlation using Weber's Law"
 * Year: "2014"
 * abstract: "..."
 * img: "img/preview/harrison2014ranking.png"
 * supplemental: Array[1]
 * teaser: "img/teaser/brown2014finding.png"
 */

function buildDivs(data) {
  var el = d3.select('.main')
    .classed('detail', true);

  // build divs then call individual functions to populate them
  [ 
    {'name': 'header', 'func': header},
    {'name': 'teaser', 'func': teaser},
    {'name': 'summary', 'func': summary},
    {'name': 'abstract', 'func': abstract},
    {'name': 'materials', 'func': materials},
    {'name': 'bibtex', 'func': bibtex},
  ].forEach(function(d) {
    el.selectAll('.'+d.name)
      .data(data)
    .enter().append('div')
      .classed(d.name, true).each(d.func);
  });
}

function header() {
  var el = d3.select(this)
    , d  = el.datum();

  el.append('h1').text(function(d) { return d.Title; })
  el.append('h3').text(function(d) { return d.Author; })
}

function teaser() {
  var el = d3.select(this)
    , d  = el.datum();

  el.append('img')
    .attr('src', function(d) { return '../../'+d.teaser; })

  el.append('div')
    .classed('caption', true)
    .text(function(d) { return d.caption ? d.caption : ''; } );
}

function summary() {
  var el = d3.select(this)
    , d  = el.datum();

  if(!d.summary) return;

  el.append('h4')
    .text('Summary');

  el.append('div')
    .html(function(d) { return d.summary; });
}

function abstract() {
  var el = d3.select(this)
    , d  = el.datum();

  if(!d.abstract) return;

  el.append('h4')
    .text('Abstract');

  el.append('div')
    .html(function(d) { return d.abstract; });
}

function materials() {
  var el = d3.select(this)
    , d  = el.datum();

  if( ! d.supplemental ) return;

  el.append('h4')
    .text('Supplemental');

  var len = d.supplemental.length;

  var supp = el.append('div')
    .classed('supplemental', true);

  supp.selectAll('.suppEntry')
    .data(function(d) { return d.supplemental; })
  .enter().append('span')
    .classed('suppEntry', true)
    .html(function(d, i) {
      var str = '';
      if( d.ref.indexOf('http') != -1 )
        str = str + '<a href=\"'+d.ref+'\">'+d.name+'</a>';
      else if( d.ref )
        str = str + '<a href=\"../../'+d.ref+'\">'+d.name+'</a>';
      else
        str = str + '<span>'+d.name+'</span>';
      if(i !== len-1)
        str = str + ' | ';
      return str;
    });

}

function bibtex() {
  var el = d3.select(this)
    , d  = el.datum();

  el.append('h4')
    .text('BibTeX');

  el.append('pre')
    .text(function(d) { 
      var str = '';
      str+='@article{' + d.Key + ',';
      str+='\n  title = {' + d.Title + '},';
      str+='\n  author = {' + d.Author.replace(/, /g, ' AND ') + '},';
      str+='\n  journal = {' + d.Journal + '},';
      str+='\n  year = {' + d.Year + '}';
      str+='\n}';
      return str; 
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
