initGraph('.engScore_bar', 'engineerScore',"#5D6D7E",500,450,350,70,60);
initGraph('.busScore_bar','businessScore','#283747',1000,450,350,70,60);
initGraph('.acc_bar','acceptRate','#5D6D7E',1500,440,350,70,60);
initGraph('.enroll_bar','enroll','#2C3E50',2000,600,340,20,20);
initGraph('.tuition_bar','tuition','#2C3E50',2500,600,340,20,20);



function initGraph(selectedClass, selectedData, selectedColor, selectedTime, widthIn, heightIn, marginBotIn, marginTopIn){
  var dataAcc = [
    {range: '1 - 10',   cnt:0, id:[]},
    {range: '11 - 20',  cnt:0, id:[]},
    {range: '21 - 30',  cnt:0, id:[]},
    {range: '31 - 40',  cnt:0, id:[]},
    {range: '41 - 50',  cnt:0, id:[]},
    {range: '51 - 60',  cnt:0, id:[]},
    {range: '61 - 70',  cnt:0, id:[]},
    {range: '71 - 80',  cnt:0, id:[]},
    {range: '81 - 90',  cnt:0, id:[]},
    {range: '91 - 100', cnt:0, id:[]},
    {range: 'unknown',  cnt:0, id:[]}
  ];
  
  function accIdx(value) {
    switch(true){
      case (value <= 10):
        return 0;
      case (value <= 20):
        return 1;
      case (value <= 30):
        return 2;
      case (value <= 40):
        return 3;
      case (value <= 50):
        return 4;
      case (value <= 60):
        return 5;
      case (value <= 70):
        return 6;
      case (value <= 80):
        return 7;
      case (value <= 90):
        return 8;
      case (value <= 100):
        return 9;
      case (value === 'unknown'):
        return 10;
    }
  };
  
  var dataEngScore = [
    {range: '0 - 3',   cnt:0, id:[]},
    {range: '3 - 4',  cnt:0, id:[]},
    {range: '4 - 5',  cnt:0, id:[]},
    {range: 'unknown',  cnt:0, id:[]}
  ];
  
  var dataBusScore = [
    {range: '0 - 3',   cnt:0, id:[]},
    {range: '3 - 4',  cnt:0, id:[]},
    {range: '4 - 5',  cnt:0, id:[]},
    {range: 'unknown',  cnt:0, id:[]}
  ];
  
  function scoreIdx(value) {
    switch(true){
      case (value <= 3):
        return 0;
      case (value <= 4):
        return 1;
      case (value <= 5):
        return 2;
      case (value === 'unknown'):
        return 3;
    }
  };
  
  var dataEnroll = [
    {range: '< 10,000',   cnt:0, id:[]},
    {range: '10,000 - 20,000',  cnt:0, id:[]},
    {range: '20,000 - 30,000',  cnt:0, id:[]},
    {range: '30,000 - 40,000',  cnt:0, id:[]},
    {range: '40,000 - 50,000',  cnt:0, id:[]},
    {range: '>= 50,000',  cnt:0, id:[]},
    {range: 'unknown',  cnt:0, id:[]}
  ];
  
  var dataTuition = [
    {range: '< 10,000',   cnt:0, id:[]},
    {range: '10,000 - 20,000',  cnt:0, id:[]},
    {range: '20,000 - 30,000',  cnt:0, id:[]},
    {range: '30,000 - 40,000',  cnt:0, id:[]},
    {range: '40,000 - 50,000',  cnt:0, id:[]},
    {range: '>= 50,000',  cnt:0, id:[]},
    {range: 'unknown',  cnt:0, id:[]}
  ];
  
  function EnrollTuitionIdx(value) {
    switch(true){
      case (value < 10000):
        return 0;
      case (value < 20000):
        return 1;
      case (value < 30000):
        return 2;
      case (value < 40000):
        return 3;
      case (value < 50000):
        return 4;
      case (value >= 50000):
        return 5;
      case (value === 'unknown'):
        return 6;
    }
  };

  var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

  // select the svg container first
  // const svg = d3.select('.canvas')
  const svg = d3.select(selectedClass)
    .append('svg')
      .attr('class', "img-responsive align-items-start")
      .attr('width', widthIn)
      .attr('height', heightIn);

  // create margins & dimensions
  const margin = {top: marginTopIn, right: 50, bottom: marginBotIn, left: 35};
  const graphWidth = widthIn - margin.left - margin.right;
  const graphHeight = heightIn - margin.top - margin.bottom;

  const graph = svg.append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // create axes groups
  const xAxisGroup = graph.append('g')
    .attr('transform', `translate(0, ${graphHeight})`)

  xAxisGroup.selectAll('text')
    .attr('fill', selectedColor)
    .attr('transform', 'rotate(-40)')
    .attr('text-anchor', 'end');

  const yAxisGroup = graph.append('g');

  const y = d3.scaleLinear()
      .range([graphHeight, 0]);

  const x = d3.scaleBand()
    .range([0, graphWidth])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  // create & call axes
  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y)
    .ticks(5)
    .tickFormat(d => d);
  
  // the update function
  // const update = (data) => {
  function update(data){
    // join the data to circs
    const rects = graph.selectAll('rect')
      .data(data);

    console.log(rects);

    // remove unwanted rects
    rects.exit().remove();

    // update the domains
    y.domain([0, d3.max(data, d => d.cnt)]);
    x.domain(data.map(item => item.range));

    // add attrs to rects already in the DOM
    rects.attr('width', x.bandwidth)
      .attr('fill', selectedColor)
      .attr('x', d => x(d.range))
      .transition().duration(selectedTime)
        .attr("height", d => graphHeight - y(d.cnt))
        .attr('y', d => y(d.cnt));

    // append the enter selection to the DOM
    rects.enter()
      .append('rect')
        .attr('width', x.bandwidth)
        .attr("height", d => 0)
        .attr('fill', selectedColor)
        .attr('x', (d) => x(d.range))
        .attr('y', d => graphHeight)
        .transition().duration(selectedTime)
          .attr("height", d => graphHeight - y(d.cnt))
          .attr('y', d => y(d.cnt));
    
    yAxisGroup.call(yAxis);

    if (selectedData === 'acceptRate') {
      xAxisGroup.call(xAxis)
                .selectAll("text")  
                .style("text-anchor", "end")
                .attr("transform", "rotate(-15)");
    } else {
      xAxisGroup.call(xAxis);
    }

    // add events
    graph.selectAll('rect')
         .on('mouseover', handleMouseOver)
         .on('mouseout', handleMouseOut);

  };

  var database = firebase.database();
  database.ref('project').orderByChild("overallRank").once('value', function(snapshot){
    if(snapshot.exists()){
      snapshot.forEach(function(data){
        var val = data.val();
        const acc_idx = accIdx(val.acceptRate);
        const bus_idx = scoreIdx(val.businessScore);
        const eng_idx = scoreIdx(val.engineeringScore);
        const enroll_idx = EnrollTuitionIdx(val.enrollment);
        const tuition_idx = EnrollTuitionIdx(val.tuition);
        dataAcc[acc_idx].cnt += 1;
        dataBusScore[bus_idx].cnt += 1;
        dataEngScore[eng_idx].cnt += 1;
        dataEnroll[enroll_idx].cnt += 1;
        dataTuition[tuition_idx].cnt += 1;
      });
    }
    switch (selectedData) {
      case 'tuition':
        update(dataTuition);
        break;
      case 'enroll':
        update(dataEnroll);
        break; 
      case 'engineerScore':
        update(dataEngScore);
        break;
      case 'businessScore':
        update(dataBusScore);
        break;
      case 'acceptRate':
        update(dataAcc);
        break; 
      default:
        break;
    }
  });

  // event handlers
  const handleMouseOver = (d,i,n) => {
    //console.log(d);

    d3.select(n[i])
      .transition('changeSliceFill').duration(200)
        .attr('fill', selectedColor);
      
    div.transition()		
        .duration(200)		
        .style("opacity", .9);		
    div	.html("count: "  + d.cnt)	
        .style("left", (d3.event.pageX) + "px")		
        .style("top", (d3.event.pageY - 28) + "px");	
  };

  const handleMouseOut = (d,i,n) => {
    //console.log(n[i]);
    d3.select(n[i])
      .transition('changeSliceFill').duration(300)
        .attr('fill', selectedColor);
    div.transition()		
        .duration(500)		
        .style("opacity", 0);
  };
}
  /*db.collection('project').onSnapshot(res => {
    
    res.docChanges().forEach(change => {

      const doc = {...change.doc.data(), id: change.doc.id};
      //console.log(doc);

      const acc_idx = accIdx(doc.acceptRate);
      const bus_idx = scoreIdx(doc.businessScore);
      const eng_idx = scoreIdx(doc.engineeringScore);
      const enroll_idx = EnrollTuitionIdx(doc.enrollment);
      const tuition_idx = EnrollTuitionIdx(doc.tuition);

      switch (change.type) {

        case 'added':
          dataAcc[acc_idx].cnt += 1;
          dataAcc[acc_idx].id.push(doc.id);
          dataBusScore[bus_idx].cnt += 1;
          dataBusScore[bus_idx].id.push(doc.id);
          dataEngScore[eng_idx].cnt += 1;
          dataEngScore[eng_idx].id.push(doc.id);
          dataEnroll[enroll_idx].cnt += 1;
          dataEnroll[enroll_idx].id.push(doc.id);
          dataTuition[tuition_idx].cnt += 1;
          dataTuition[tuition_idx].id.push(doc.id);
          break;

        case 'modified':
          // need modify!!!
          // console.log(change.getOldIndex());
          // console.log(change.getNewIndex());
          for (var i = 0; i < dataAcc.length; ++i) {
            const index = dataAcc[i].findIndex(item => item.id == doc.id);
            if (index != -1) {
              dataAcc[i].cnt -= 1;
              dataAcc[i].splice(index, 1);
              break;
            }
          }
          dataAcc[acc_idx].cnt += 1;
          dataAcc[acc_idx].id.push(doc.id);
          dataBusScore[bus_idx].cnt += 1;
          dataBusScore[bus_idx].id.push(doc.id);
          dataEngScore[eng_idx].cnt += 1;
          dataEngScore[eng_idx].id.push(doc.id);
          dataEnroll[enroll_idx].cnt += 1;
          dataEnroll[enroll_idx].id.push(doc.id);
          dataTuition[tuition_idx].cnt += 1;
          dataTuition[tuition_idx].id.push(doc.id);
          break;

        case 'removed':
          // need modify!!!
          //dataAcc = dataAcc.filter(item => item.id !== doc.id);
          for (var i = 0; i < dataAcc.length; ++i) {
            const index = dataAcc[i].findIndex(item => item.id == doc.id);
            if (index != -1) {
              dataAcc[i].cnt -= 1;
              dataAcc[i].splice(index, 1);
              break;
            }
          }
          break;

        default:
          break;
      }
    });
    
    switch (selectedData) {
      case 'tuition':
        update(dataTuition);
        break;
      case 'enroll':
        update(dataEnroll);
        break; 
      case 'engineerScore':
        update(dataEngScore);
        break;
      case 'businessScore':
        update(dataBusScore);
        break;
      case 'acceptRate':
        update(dataAcc);
        break; 
      default:
        break;
    }
  });*/