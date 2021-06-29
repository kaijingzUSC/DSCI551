var database = firebase.database();
var statesList = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
var options = {};
content = '';
for (var i = 0; i < statesList.length; ++i) {
	content += '<option>' + statesList[i] + '</option>';
	options[statesList[i]] = [];
}
$('#stateFilter').append(content);

function createOption(ddl, text, value) {
	var opt = document.createElement('option');
	opt.value = value;
	opt.text = text;
	ddl.options.add(opt);
}

function configureDropDownLists(ddl1, ddl2){
	ddl2.options.length = 0;
	var names = [];
	database.ref('project').once('value', function(snapshot){
		if(snapshot.exists()){
			snapshot.forEach(function(data){
				var val = data.val();
				if (val.state === ddl1.value) {
					names.push(val.displayName);
				}
			});
			ddl2.options.length = 0;
			for (var i = 0; i < names.length; ++i){
				createOption(ddl2, names[i], names[i]);
			}
		}
	});
}

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
	w: 400,
	h: 400,
	maxValue: 1.0,
	levels: 5,
	ExtraWidthX: 300
}

document.getElementById("schoolFilterGo").addEventListener('click', function(){
	allData = []
	
	var selectedSchool = $('#nameFilter').val();

	database.ref('project').orderByChild("displayName").once('value', function(snapshot){
		if(snapshot.exists()){
			snapshot.forEach(function(data){
				var val = data.val();
				//console.log(val);
				if (val.displayName === selectedSchool){
					var tmp = [];
					tmp.push({axis:"Average ACT", value:checkValue(val.act,"ACT")});
					tmp.push({axis:"Average SAT", value:checkValue(val.sat,"SAT")});
					tmp.push({axis:"Average GPA", value:checkValue(val.gpa,"GPA")});
					tmp.push({axis:"Bussiness School Score", value:checkValue(val.businessScore,"businessScore")});
					tmp.push({axis:"Engineering School Score", value:checkValue(val.engineeringScore,"engineeringScore")});
					tmp.push({axis:"Acceptance Rate", value:checkValue(val.acceptRate,"acceptRate")});
					allData.push(tmp);
				}
			});
		}
	
		RadarChart.draw(".chart", allData, mycfg);
	});
});
