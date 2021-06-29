// bug in enrollment

function triggleBarPlot(eltId, buttonId, selectedData, minId, maxId){
  $(eltId).hide();
  $(document).on("click", buttonId, function(event) {
      d3.select('svg').remove();
      initGraph(eltId,selectedData,'#5D6D7E',1700,440,350,70,60,minId,maxId);
      $(eltId).toggle();
      event.preventDefault();
  });
}
triggleBarPlot(".actBar","#actBarButton","act","actMin","actMax");
triggleBarPlot(".satBar","#satBarButton","sat","satMin","satMax");
triggleBarPlot(".gpaBar","#gpaBarButton","gpa","gpaMin","gpaMax");
triggleBarPlot(".enrollBar","#enrollBarButton","enroll","enrollMin","enrollMax");
triggleBarPlot(".accBar","#accBarButton","acceptRate","accMin","accMax");
triggleBarPlot(".engBar","#engBarButton","engineerScore","engMin","engMax");
triggleBarPlot(".busBar","#busBarButton","businessScore","busMin","busMax");
triggleBarPlot(".tuitionBar","#tuitionBarButton","tuition","tuitionMin","tuitionMax");


var dataAcc = [
    {range: 'unknown',  cnt:0},
    {range: '[1,10]',   cnt:0},
    {range: '(10,20]',  cnt:0},
    {range: '(20,30]',  cnt:0},
    {range: '(30,40]',  cnt:0},
    {range: '(40,50]',  cnt:0},
    {range: '(50,60]',  cnt:0},
    {range: '(60,70]',  cnt:0},
    {range: '(70,80]',  cnt:0},
    {range: '(80,90]',  cnt:0},
    {range: '(90,100]', cnt:0}
];

function accIdx(value) {
    switch(true){
        case (value === 'unknown'):
            return 0;
        case (value <= 10):
            return 1;
        case (value <= 20):
            return 2;
        case (value <= 30):
            return 3;
        case (value <= 40):
            return 4;
        case (value <= 50):
            return 5;
        case (value <= 60):
            return 6;
        case (value <= 70):
            return 7;
        case (value <= 80):
            return 8;
        case (value <= 90):
            return 9;
        case (value <= 100):
            return 10;
    }
};

var dataEngScore = [
    {range: 'unknown',  cnt:0},
    {range: '[0,1]',   cnt:0},
    {range: '(1,2]',   cnt:0},
    {range: '(2,3]',   cnt:0},
    {range: '(3,4]',  cnt:0},
    {range: '(4,5]',  cnt:0}
];

var dataBusScore = [
    {range: 'unknown',  cnt:0},
    {range: '[0,1]',   cnt:0},
    {range: '(1,2]',   cnt:0},
    {range: '(2,3]',   cnt:0},
    {range: '(3,4]',  cnt:0},
    {range: '(4,5]',  cnt:0}
];

function scoreIdx(value) {
    switch(true){
        case (value === 'unknown'):
            return 0;
        case (value <= 1):
            return 1;
        case (value <= 2):
                return 2;
        case (value <= 3):
            return 3;
        case (value <= 4):
            return 4;
        case (value <= 5):
            return 5;
    }
};

var dataEnroll = [
    {range: 'unknown',  cnt:0},
    {range: '<= 10000',   cnt:0},
    {range: '(10000, 20000]',  cnt:0},
    {range: '(20000, 30000]',  cnt:0},
    {range: '(30000, 40,000]',  cnt:0},
    {range: '(40000, 50,000]',  cnt:0},
    {range: '> 50,000',  cnt:0}
];

var dataTuition = [
    {range: 'unknown',  cnt:0},
    {range: '<= 10000',   cnt:0},
    {range: '(10000, 20000]',  cnt:0},
    {range: '(20000, 30000]',  cnt:0},
    {range: '(30000, 40,000]',  cnt:0},
    {range: '(40000, 50,000]',  cnt:0},
    {range: '> 50,000',  cnt:0}
];

function EnrollTuitionIdx(value) {
    switch(true){
        case (value === 'unknown'):
            return 0;
        case (value <= 10000):
            return 1;
        case (value <= 20000):
            return 2;
        case (value <= 30000):
            return 3;
        case (value <= 40000):
            return 4;
        case (value <= 50000):
            return 5;
        case (value > 50000):
            return 6;
    }
};

var dataAct = [
    {range:'unknown', cnt:0},{range:'15', cnt:0},{range:'16', cnt:0},{range:'17', cnt:0},{range:'18', cnt:0},{range:'19', cnt:0},{range:'20', cnt:0},
    {range:'21', cnt:0},{range:'22', cnt:0},{range:'23', cnt:0},{range:'24', cnt:0},{range:'25', cnt:0},{range:'26', cnt:0},
    {range:'27', cnt:0},{range:'28', cnt:0},{range:'29', cnt:0},{range:'30', cnt:0},{range:'31', cnt:0},{range:'32', cnt:0},
    {range:'33', cnt:0},{range:'34', cnt:0}
];

function ActIdx(value){
    if (value === 'unknown') return 0;
    return value - 14;
}

var dataSat = [
    {range: 'unknown',  cnt:0},
    {range: '<= 900', cnt: 0},
    {range: '(900,1000]', cnt: 0},
    {range: '(1000,1100]', cnt: 0},
    {range: '(1100,1200]', cnt: 0},
    {range: '(1200,1300]', cnt: 0},
    {range: '(1300,1400]', cnt: 0},
    {range: '> 1400', cnt: 0}
];

function SatIdx(value){
    switch(true){
        case (value === 'unknown'):
            return 0;
        case (value <= 900):
            return 1;
        case (value <= 1000):
            return 2;
        case (value <= 1100):
            return 3;
        case (value <= 1200):
            return 4;
        case (value <= 1300):
            return 5;
        case (value <= 1400):
            return 6;
        case (value > 1400):
            return 7;
    }
}

var dataGpa = [
    {range: 'unknown',  cnt:0},
    {range: '< 3', cnt: 0},
    {range: '3.0', cnt: 0},
    {range: '3.1', cnt: 0},
    {range: '3.2', cnt: 0},
    {range: '3.3', cnt: 0},
    {range: '3.4', cnt: 0},
    {range: '3.5', cnt: 0},
    {range: '3.6', cnt: 0},
    {range: '3.7', cnt: 0},
    {range: '3.8', cnt: 0},
    {range: '3.9', cnt: 0},
    {range: '4.0', cnt: 0}
]

function GpaIdx(value){
    switch(true){
        case (value === 'unknown'):
            return 0;
        case (value < 3):
            return 1;
        case (value === 3):
            return 2;
        case (value === 3.1):
            return 3;
        case (value === 3.2):
            return 4;
        case (value === 3.3):
            return 5;
        case (value === 3.4):
            return 6;
        case (value === 3.5):
            return 7;
        case (value === 3.6):
            return 8;
        case (value === 3.7):
            return 9;
        case (value === 3.8):
            return 10;
        case (value === 3.9):
            return 11;
        case (value === 4.0):
            return 12;
    }
}


function clearData(){
    for (var i = 0; i < dataAct.length; ++i){
        dataAct[i].cnt = 0;
    }
    for (var i = 0; i < dataSat.length; ++i){
        dataSat[i].cnt = 0;
    }
    for (var i = 0; i < dataGpa.length; ++i){
        dataGpa[i].cnt = 0;
    }
    for (var i = 0; i < dataAcc.length; ++i){
        dataAcc[i].cnt = 0;
    }
    for (var i = 0; i < dataBusScore.length; ++i){
        dataBusScore[i].cnt = 0;
    }
    for (var i = 0; i < dataEngScore.length; ++i){
        dataEngScore[i].cnt = 0;
    }
    for (var i = 0; i < dataEnroll.length; ++i){
        dataEnroll[i].cnt = 0;
    }
    for (var i = 0; i < dataTuition.length; ++i){
        dataTuition[i].cnt = 0;
    }
}

function readData(val) {
    const act_idx = ActIdx(val.act);
    const sat_idx = SatIdx(val.sat);
    const gpa_idx = GpaIdx(val.gpa);
    const acc_idx = accIdx(val.acceptRate);
    const bus_idx = scoreIdx(val.businessScore);
    const eng_idx = scoreIdx(val.engineeringScore);
    const enroll_idx = EnrollTuitionIdx(val.enrollment);
    const tuition_idx = EnrollTuitionIdx(val.tuition);
    dataAct[act_idx].cnt += 1;
    dataSat[sat_idx].cnt += 1;
    dataGpa[gpa_idx].cnt += 1;
    dataAcc[acc_idx].cnt += 1;
    dataBusScore[bus_idx].cnt += 1;
    dataEngScore[eng_idx].cnt += 1;
    dataEnroll[enroll_idx].cnt += 1;
    dataTuition[tuition_idx].cnt += 1;
}




function initGraph(selectedClass, selectedData, selectedColor, selectedTime, widthIn, heightIn, marginBotIn, marginTopIn, minId, maxId){
    clearData();
    var div = d3.select("body").append("div")	
      .attr("class", "tooltip")				
      .style("opacity", 0);
  
    const svg = d3.select(selectedClass)
      .append('svg')
        .attr('class', "img-responsive align-items-start")
        .attr('width', widthIn)
        .attr('height', heightIn);
  
    const margin = {top: marginTopIn, right: 20, bottom: marginBotIn, left: 35};
    const graphWidth = widthIn - margin.left - margin.right;
    const graphHeight = heightIn - margin.top - margin.bottom;
  
    const graph = svg.append('g')
      .attr('width', graphWidth)
      .attr('height', graphHeight)
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
    const xAxisGroup = graph.append('g')
      .attr('transform', `translate(0, ${graphHeight})`)
  
    xAxisGroup.selectAll('text')
      .attr('fill', selectedColor)
      .attr('transform', 'rotate(-40)')
      .attr('text-anchor', 'end');
  
    const yAxisGroup = graph.append('g');

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 5)
      .attr("x",0 - (graphHeight / 1.3))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("count"); 

    const y = d3.scaleLinear()
        .range([graphHeight, 0]);
  
    const x = d3.scaleBand()
      .range([0, graphWidth])
      .paddingInner(0.2)
      .paddingOuter(0.2);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y)
      .ticks(5)
      .tickFormat(d => d);
    
    function update(data){
      const rects = graph.selectAll('rect')
        .data(data);
  
      rects.exit().remove();
  
      y.domain([0, d3.max(data, d => d.cnt)]);
      x.domain(data.map(item => item.range));
  
      rects.attr('width', x.bandwidth)
        .attr('fill', selectedColor)
        .attr('x', d => x(d.range))
        .transition().duration(selectedTime)
          .attr("height", d => graphHeight - y(d.cnt))
          .attr('y', d => y(d.cnt));
  
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

      xAxisGroup.call(xAxis)
                .selectAll("text")  
                .style("text-anchor", "end")
                .attr("transform", "rotate(-15)");
      /*if (selectedData === 'acceptRate') {
        xAxisGroup.call(xAxis)
                  .selectAll("text")  
                  .style("text-anchor", "end")
                  .attr("transform", "rotate(-15)");
      } else {
        xAxisGroup.call(xAxis);
      }*/
  
      graph.selectAll('rect')
           .on('mouseover', handleMouseOver)
           .on('mouseout', handleMouseOut);
  
    };

    function switchVariable(selectedData) {
        switch (selectedData) {
            case 'act':
                update(dataAct);
                break;
            case 'sat':
                update(dataSat);
                break;
            case 'gpa':
                update(dataGpa);
                break;
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
    }

    var minIn = document.getElementById(minId).value;
    var maxIn = document.getElementById(maxId).value;

    if (minIn.length === 0 && maxIn.length === 0){
        var database = firebase.database().ref('project').orderByChild(selectedData);
        database.once('value', function(snapshot){
            if(snapshot.exists()){
                snapshot.forEach(function(data){
                    var val = data.val();
                    readData(val);
                });
            }
            switchVariable(selectedData);
        });
    } else if (maxIn.length === 0) {
        //console.log("only input min");
        //console.log(dataAct);
        minIn = Number(minIn);
        var database = firebase.database().ref('project').orderByChild(selectedData).startAt(minIn);
        database.once('value', function(snapshot){
            if(snapshot.exists()){
                snapshot.forEach(function(data){
                    var val = data.val();
                    if (val[selectedData] === 'unknown') return;
                    readData(val);
                });
            }
            switchVariable(selectedData);
        });
    } else if (minIn.length === 0) {
        //console.log("only input max");
        maxIn = Number(maxIn);
        var database = firebase.database().ref('project').orderByChild(selectedData).endAt(maxIn);
        database.once('value', function(snapshot){
            if(snapshot.exists()){
                snapshot.forEach(function(data){
                    var val = data.val();
                    readData(val);
                });
            }
            switchVariable(selectedData);
        });
    } else {
        //console.log(minIn + " - " + maxIn);
        minIn = Number(minIn);
        maxIn = Number(maxIn);
        var database = firebase.database().ref('project').orderByChild(selectedData).startAt(minIn).endAt(maxIn);
        database.once('value', function(snapshot){
            if(snapshot.exists()){
                snapshot.forEach(function(data){
                    var val = data.val();
                    readData(val);
                });
            }
            switchVariable(selectedData);
        });
    }
  
    const handleMouseOver = (d,i,n) => {  
      d3.select(n[i])
        .transition('changeSliceFill').duration(200)
          .attr('fill', selectedColor);   
      div.transition()		
          .duration(200)		
          .style("opacity", .9);		
      div.html("count: "  + d.cnt)	
          .style("left", (d3.event.pageX) + "px")		
          .style("top", (d3.event.pageY - 28) + "px");	
    };
  
    const handleMouseOut = (d,i,n) => {
      d3.select(n[i])
        .transition('changeSliceFill').duration(300)
          .attr('fill', selectedColor);
      div.transition()		
          .duration(500)		
          .style("opacity", 0);
    };
  }
