// Create Radar Chart
function checkValue(num,scoreName) {
	if (num === "unknown") return 0;
	switch(scoreName){
		case "ACT":
			return num/36;
		case "SAT":
			return num/1600;
		case "GPA":
			return num/4;
		case "businessScore":
			return num/5;
		case "engineeringScore":
			return num/5;
		case "acceptRate":
			return num/100;
	}
}

var allData = [];
var mycfg = {
	w: 300,
	h: 300,
	maxValue: 1.0,
	levels: 5,
	ExtraWidthX: 300
}

function createRadarChart(val, key){
    var graphClass = "." + key + "Graph";
	allData = [];
	var tmp = [];
	tmp.push({axis:"Average ACT", value:checkValue(val.act,"ACT")});
	tmp.push({axis:"Average SAT", value:checkValue(val.sat,"SAT")});
	tmp.push({axis:"Average GPA", value:checkValue(val.gpa,"GPA")});
	tmp.push({axis:"Bussiness School Score", value:checkValue(val.businessScore,"businessScore")});
	tmp.push({axis:"Engineering School Score", value:checkValue(val.engineeringScore,"engineeringScore")});
	tmp.push({axis:"Acceptance Rate", value:checkValue(val.acceptRate,"acceptRate")});
	allData.push(tmp);
	RadarChart.draw(graphClass, allData, mycfg);
}

// The following is the template comes from https://github.com/alangrafu/radar-chart-d3
// made some additions for better visualization to fit our dataset
var RadarChart = {
  draw: function(id, d, options){

  var cfg = {
	 radius: 5,
	 w: 600,
	 h: 600,
	 factor: 1,
	 factorLegend: .85,
	 levels: 3,
	 maxValue: 0,
	 radians: 2 * Math.PI,
	 opacityArea: 0.5,
	 ToRight: 5,
	 TranslateX: 80,
	 TranslateY: 30,
	 ExtraWidthX: 100,
	 ExtraWidthY: 100,
	 color: d3.scaleOrdinal(d3.schemeCategory10)
	};
	
	if('undefined' !== typeof options){
	  for(var i in options){
		if('undefined' !== typeof options[i]){
		  cfg[i] = options[i];
		}
	  }
	}
	cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i){return d3.max(i.map(function(o){return o.value;}))}));
	//console.log(d[0]);
	var allAxis = (d[0].map(function(i, j){
			return i.axis;
	}));
	var total = allAxis.length;
	var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
	var Format = d3.format('.0%');
	//Format = d3.format(' ');
	d3.select(id).select("svg").remove();
	
	var g = d3.select(id)
			.append("svg")
			.attr("width", cfg.w+cfg.ExtraWidthX)
			.attr("height", cfg.h+cfg.ExtraWidthY)
			.append("g")
			.attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");
			;

	var tooltip;
	
	//Circular segments
	for(var j=0; j<cfg.levels-1; j++){
	  var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
	  g.selectAll(".levels")
	   .data(allAxis)
	   .enter()
	   .append("svg:line")
	   .attr("x1", function(d, i){return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
	   .attr("y1", function(d, i){return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
	   .attr("x2", function(d, i){return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
	   .attr("y2", function(d, i){return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
	   .attr("class", "line")
	   .style("stroke", "grey")
	   .style("stroke-opacity", "0.75")
	   .style("stroke-width", "0.3px")
	   .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
	}

	//Text indicating at what % each level is
	for(var j=0; j<cfg.levels; j++){
	  var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
	  g.selectAll(".levels")
	   .data([1]) //dummy data
	   .enter()
	   .append("svg:text")
	   .attr("x", function(d){return levelFactor*(1-cfg.factor*Math.sin(0));})
	   .attr("y", function(d){return levelFactor*(1-cfg.factor*Math.cos(0));})
	   .attr("class", "legend")
	   .style("font-family", "sans-serif")
	   .style("font-size", "10px")
	   .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
	   .attr("fill", "#737373")
	   .text(Format((j+1)*cfg.maxValue/cfg.levels));
	}

	for(var j=0; j<cfg.levels; j++){
		var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
		g.selectAll(".levels")
		 .data([1]) //dummy data
		 .enter()
		 .append("svg:text")
		 .attr("x", function(d){return levelFactor*(1-cfg.factor*Math.sin(2*cfg.radians/total));})
		 .attr("y", function(d){return levelFactor*(1-cfg.factor*Math.cos(2*cfg.radians/total));})
		 .attr("class", "legend")
		 .style("font-family", "sans-serif")
		 .style("font-size", "10px")
		 .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
		 .attr("fill", "#737373")
		 .text(Format((j+1)*cfg.maxValue/cfg.levels));
	}

	for(var j=0; j<cfg.levels; j++){
		var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
		g.selectAll(".levels")
		 .data([1]) //dummy data
		 .enter()
		 .append("svg:text")
		 .attr("x", function(d){return levelFactor*(1-cfg.factor*Math.sin(4*cfg.radians/total));})
		 .attr("y", function(d){return levelFactor*(1-cfg.factor*Math.cos(4*cfg.radians/total));})
		 .attr("class", "legend")
		 .style("font-family", "sans-serif")
		 .style("font-size", "10px")
		 .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
		 .attr("fill", "#737373")
		 .text(Format((j+1)*cfg.maxValue/cfg.levels));
	}
	
	series = 0;

	var axis = g.selectAll(".axis")
			.data(allAxis)
			.enter()
			.append("g")
			.attr("class", "axis");

	axis.append("line")
		.attr("x1", cfg.w/2)
		.attr("y1", cfg.h/2)
		.attr("x2", function(d, i){return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
		.attr("y2", function(d, i){return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
		.attr("class", "line")
		.style("stroke", "grey")
		.style("stroke-width", "1.5px");

	axis.append("text")
		.attr("class", "legend")
		.text(function(d){return d})
		.style("font-family", "sans-serif")
		.style("font-size", "11px")
		.attr("text-anchor", "middle")
		.attr("dy", "1.5em")
		.attr("transform", function(d, i){return "translate(0, -10)"})
		.attr("x", function(d, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-60*Math.sin(i*cfg.radians/total);})
		.attr("y", function(d, i){return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);});

 
	d.forEach(function(y, x){
	  dataValues = [];
	  g.selectAll(".nodes")
		.data(y, function(j, i){
		  //console.log(y);
		  dataValues.push([
			cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
			cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
		  ]);
		});
	  dataValues.push(dataValues[0]);
	  g.selectAll(".area")
					 .data([dataValues])
					 .enter()
					 .append("polygon")
					 .attr("class", "radar-chart-serie"+series)
					 .style("stroke-width", "2px")
					 .style("stroke", '#283747')
					 .attr("points",function(d) {
						 var str="";
						 for(var pti=0;pti<d.length;pti++){
							 str=str+d[pti][0]+","+d[pti][1]+" ";
						 }
						 return str;
					  })
					 //.style("fill", function(j, i){return cfg.color(series)})
					 .style("fill",'#5D6D7E')
					 .style("fill-opacity", cfg.opacityArea)
					 .on('mouseover', function (d){
										z = "polygon."+d3.select(this).attr("class");
										g.selectAll("polygon")
										 .transition(200)
										 .style("fill-opacity", 0.1); 
										g.selectAll(z)
										 .transition(200)
										 .style("fill-opacity", .7);
									  })
					 .on('mouseout', function(){
										g.selectAll("polygon")
										 .transition(200)
										 .style("fill-opacity", cfg.opacityArea);
					 });
	  series++;
	});
	series=0;


	d.forEach(function(y, x){
	  g.selectAll(".nodes")
		.data(y).enter()
		.append("svg:circle")
		.attr("class", "radar-chart-serie"+series)
		.attr('r', cfg.radius)
		.attr("alt", function(j){return Math.max(j.value, 0)})
		.attr("cx", function(j, i){
		  dataValues.push([
			cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)), 
			cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
		]);
		return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
		})
		.attr("cy", function(j, i){
		  return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
		})
		.attr("data-id", function(j){return j.axis})
		//.style("fill", cfg.color(series))
		.style("fill",'#5D6D7E')
		.style("fill-opacity", .9)
		.on('mouseover', function (d){
					newX =  parseFloat(d3.select(this).attr('cx')) - 10;
					newY =  parseFloat(d3.select(this).attr('cy')) - 5;
					
					tooltip
						.attr('x', newX)
						.attr('y', newY)
						.text(Format(d.value))
						.transition(200)
						.style('opacity', 1);
						
					z = "polygon."+d3.select(this).attr("class");
					g.selectAll("polygon")
						.transition(200)
						.style("fill-opacity", 0.1); 
					g.selectAll(z)
						.transition(200)
						.style("fill-opacity", .7);
				  })
		.on('mouseout', function(){
					tooltip
						.transition(200)
						.style('opacity', 0);
					g.selectAll("polygon")
						.transition(200)
						.style("fill-opacity", cfg.opacityArea);
				  })
		.append("svg:title")
		.text(function(j){return Math.max(j.value, 0)});

	  series++;
	});
	//Tooltip
	tooltip = g.append('text')
			   .style('opacity', 0)
			   .style('font-family', 'sans-serif')
			   .style('font-size', '13px');
  }
};