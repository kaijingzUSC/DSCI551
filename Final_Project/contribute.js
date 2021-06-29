var database = firebase.database();

var statesList = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

content = '';
for (var i = 0; i < statesList.length; ++i) {
	content += '<option>' + statesList[i] + '</option>';
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
    var namekeys = [];
	database.ref('project').once('value', function(snapshot){
		if(snapshot.exists()){
			snapshot.forEach(function(data){
                var val = data.val();
				if (val.state === ddl1.value) {
                    names.push(val.displayName);
                    namekeys.push(data.key);
				}
			});
			ddl2.options.length = 0;
			for (var i = 0; i < names.length; ++i){
				createOption(ddl2, names[i], namekeys[i]);
			}
		}
	});
}

document.getElementById("submit").addEventListener('click', function(){
    //console.log($("#nameFilter").val());
    //console.log($("#variableFilter").val());
    //console.log(document.getElementById("inputValue").value);
    if ($("#nameFilter").val() === null){
        window.alert("Please select the university");
        return;
    }
    if ($("#variableFilter").val() === ""){
        window.alert("Please select the variable");
        return;
    }
    if (document.getElementById("inputValue").value === ""){
        window.alert("Please provide the value");
        return;
    }
    var primaryKey = $("#nameFilter").val();
    var updateVariable = $("#variableFilter").val();
    var updateVal = Number(document.getElementById("inputValue").value);

    database.ref("project/" + primaryKey).update({
        [updateVariable]: updateVal
    });
    window.alert("Data is sucessfully updated.")
    document.getElementById("inputValue").value = "";
});