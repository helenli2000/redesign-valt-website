var schedule;

var GROUP_ORDER = ['Time', 'Name', 'Title', 'Affiliates'];

// d3.select('#schedule')
//     .attr('width', '12000px')

d3.json('files/bostonvis2015.json', function(err, d) {
  if(err) return console.log(err);
  schedule = d;
  buildschedule();
});


function buildschedule() {
  // first build by each type
  d3.select('#schedule')
  .append('div')
  .attr('class', 'event-header')
  .attr('width', '200px')
  .append('div')
  .attr('class', 'event-title')
  .append('p')
  .html(schedule[0].Title)


  d3.select('.event-title')
  .append('div')
  .attr('class', 'event-address')
  .html('<a href = \'/directions.html\'>' + schedule[0].Address1 + '<br>' + schedule[0].Address2 + '<br>' + schedule[0].Address3 + '</a>')

  d3.select('#schedule')
  .append('div')
  .append('p')
  .html(schedule[0].Date)
  .attr('class', 'event-time')
  
  var events = schedule.slice(1, schedule.length)

  var eventsSchedule = d3.select('#schedule').selectAll('.events')
      .data(events)
      .enter().append('div')
      .html(function(d, i) { return toString(d, i)})
      .attr('class', 'event')


  d3.select('#schedule')
  .append('p')
  .html('(<b>Talk length</b>: 15 minutes talk, 10 minutes comment)')
  .attr('class', 'tip')

  // d3.select('#schedule')
  // .append('p')
  // .html('(Poster length: 5 minutes talk, 5 minutes comment)')
  // .attr('class', 'tip')
}


  function toString(d, i){
        if(d.Speaker)
          return  '<div class = \'block-' + i%2 +'\'> <font class = \'time\'>' + d.Time + '</font> <font class = \'speaker\'>' + d.Speaker + '</font></p> ' + formatPrograms(d.Program) + '<br> </div>'
        else 
          return  '<div class = \'block-' + i%2 +'\'> <font class = \'time\'>' + d.Time + '</font> ' + formatPrograms(d.Program) + '<br> </div>'
  }

  function formatPrograms(d){
    var string = '';
    if(d)
    d.forEach(function(r){
       string += '<p class = \'program\'>' + r + '</p>';
    });

    return string;
  }