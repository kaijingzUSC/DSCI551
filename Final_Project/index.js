loadTable();
function loadTable(){
    var database = firebase.database();
    database.ref('project').orderByChild("overallRank").once('value', function(snapshot){
        if(snapshot.exists()){
            var content = '';
            snapshot.forEach(function(data){
                var val = data.val();
                content +='<tr>';
                content += '<td>' + val.displayName + '</td>';
                content += '<td>' + val.city + '</td>';
                content += '<td>' + val.state + '</td>';
                content += '<td>' + val.publicOrPrivate + '</td>';
                content += '<td>' + val.act + '</td>';
                content += '<td>' + val.sat + '</td>';
                content += '<td>' + val.gpa + '</td>';
                content += '<td>' + val.enrollment + '</td>';
                if (val.acceptRate === "unknown") {
                    content += '<td>' + val.acceptRate + '</td>';
                } else {
                    content += '<td>' + val.acceptRate + '% </td>';
                }
                content += '<td>' + val.businessScore + '</td>';
                content += '<td>' + val.engineeringScore + '</td>';
                if (val.tuition === "unknown"){
                    content += '<td>' + val.tuition + '</td>';
                } else {
                    content += '<td> $' + val.tuition + '</td>';
                }
                content += '<td>' + val.overallRank + '</td>';
                content += '</tr>';
            });
            $('#dataTableBody').append(content);
        }
    });
}

addStateOptions();
function addStateOptions(){
    var statesList = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
    content = '';
    for (var i = 0; i < statesList.length; ++i) {
        content += '<option>' + statesList[i] + '</option>';
    }
    $('#stateFilter').append(content);
}

function sortColumnAsc(eltId,colName,checkId){
    document.getElementById(eltId).addEventListener('click', function(){
        $("tbody").children().remove();
        var database = firebase.database().ref('project').orderByChild(colName);
        database.once('value', function(snapshot){
            if(snapshot.exists()){
                var content = '';
                snapshot.forEach(function(data){
                    var val = data.val();
                    if(checkId !== "" && document.getElementById(checkId).checked == true){
                        if (val[colName] === "unknown") return;
                    }
                    content +='<tr>';
                    content += '<td>' + val.displayName + '</td>';
                    content += '<td>' + val.city + '</td>';
                    content += '<td>' + val.state + '</td>';
                    content += '<td>' + val.publicOrPrivate + '</td>';
                    content += '<td>' + val.act + '</td>';
                    content += '<td>' + val.sat + '</td>';
                    content += '<td>' + val.gpa + '</td>';
                    content += '<td>' + val.enrollment + '</td>';
                    if (val.acceptRate === "unknown") {
                        content += '<td>' + val.acceptRate + '</td>';
                    } else {
                        content += '<td>' + val.acceptRate + '% </td>';
                    }
                    content += '<td>' + val.businessScore + '</td>';
                    content += '<td>' + val.engineeringScore + '</td>';
                    content += '<td> $' + val.tuition + '</td>';
                    content += '<td>' + val.overallRank + '</td>';
                    content += '</tr>';
                });
                $('#dataTableBody').append(content);
            }
        });
    });
}

function sortColumnDec(eltId,colName,checkId){
    document.getElementById(eltId).addEventListener('click', function(){
        $("tbody").children().remove();
        var database = firebase.database().ref('project').orderByChild(colName);
        database.once('value', function(snapshot){
            if(snapshot.exists()){
                var content = '';
                var tmp = '';
                snapshot.forEach(function(data){
                    var val = data.val();
                    if(checkId !== "" && document.getElementById(checkId).checked == true){
                        if (val[colName] === "unknown") return;
                    }
                    tmp = '';
                    tmp +='<tr>';
                    tmp += '<td>' + val.displayName + '</td>';
                    tmp += '<td>' + val.city + '</td>';
                    tmp += '<td>' + val.state + '</td>';
                    tmp += '<td>' + val.publicOrPrivate + '</td>';
                    tmp += '<td>' + val.act + '</td>';
                    tmp += '<td>' + val.sat + '</td>';
                    tmp += '<td>' + val.gpa + '</td>';
                    tmp += '<td>' + val.enrollment + '</td>';
                    if (val.acceptRate === "unknown") {
                        tmp += '<td>' + val.acceptRate + '</td>';
                    } else {
                        tmp += '<td>' + val.acceptRate + '% </td>';
                    }
                    tmp += '<td>' + val.businessScore + '</td>';
                    tmp += '<td>' + val.engineeringScore + '</td>';
                    tmp += '<td> $' + val.tuition + '</td>';
                    tmp += '<td>' + val.overallRank + '</td>';
                    tmp += '</tr>';
                    content = tmp + content;
                });
                $('#dataTableBody').append(content);
            }
        });
    });
}

function stringFilter(eltId, colName, selectId){
    document.getElementById(eltId).addEventListener('click', function(){
        var values = $('#'+selectId).val();
        console.log(values);
        
        $("tbody").children().remove();
        
        for (var i = 0; i < values.length; ++i) {
            var database = firebase.database().ref('project').orderByChild(colName).equalTo(values[i]);
            database.once('value', function(snapshot){
                if(snapshot.exists()){
                    var content = '';
                    snapshot.forEach(function(data){
                        var val = data.val();
                        content +='<tr>';
                        content += '<td>' + val.displayName + '</td>';
                        content += '<td>' + val.city + '</td>';
                        content += '<td>' + val.state + '</td>';
                        content += '<td>' + val.publicOrPrivate + '</td>';
                        content += '<td>' + val.act + '</td>';
                        content += '<td>' + val.sat + '</td>';
                        content += '<td>' + val.gpa + '</td>';
                        content += '<td>' + val.enrollment + '</td>';
                        if (val.acceptRate === "unknown") {
                            content += '<td>' + val.acceptRate + '</td>';
                        } else {
                            content += '<td>' + val.acceptRate + '% </td>';
                        }
                        content += '<td>' + val.businessScore + '</td>';
                        content += '<td>' + val.engineeringScore + '</td>';
                        content += '<td> $' + val.tuition + '</td>';
                        content += '<td>' + val.overallRank + '</td>';
                        content += '</tr>';
                    });
                    $('#dataTableBody').append(content);
                }
            })
        }
    });
}

function numericalFilter(goId, colName, minId, maxId) {
    document.getElementById(goId).addEventListener('click', function(){
        var minIn = document.getElementById(minId).value;
        var maxIn = document.getElementById(maxId).value;
        if (minIn.length === 0 && maxIn.length === 0) {
            alert("At least input one of min/max value for range filter!");
        }
        
        
        console.log(minIn);
        $("tbody").children().remove();
        if (maxIn.length === 0) {
            minIn = Number(minIn);
            var database = firebase.database().ref('project').orderByChild(colName).startAt(minIn);
            database.once('value', function(snapshot){
                if(snapshot.exists()){
                    var content = '';
                    snapshot.forEach(function(data){
                        var val = data.val();
                        content +='<tr>';
                        content += '<td>' + val.displayName + '</td>';
                        content += '<td>' + val.city + '</td>';
                        content += '<td>' + val.state + '</td>';
                        content += '<td>' + val.publicOrPrivate + '</td>';
                        content += '<td>' + val.act + '</td>';
                        content += '<td>' + val.sat + '</td>';
                        content += '<td>' + val.gpa + '</td>';
                        content += '<td>' + val.enrollment + '</td>';
                        if (val.acceptRate === "unknown") {
                            content += '<td>' + val.acceptRate + '</td>';
                        } else {
                            content += '<td>' + val.acceptRate + '% </td>';
                        }
                        content += '<td>' + val.businessScore + '</td>';
                        content += '<td>' + val.engineeringScore + '</td>';
                        content += '<td> $' + val.tuition + '</td>';
                        content += '<td>' + val.overallRank + '</td>';
                        content += '</tr>';
                    });
                    $('#dataTableBody').append(content);
                }
            })
        } else if (minIn.length === 0) {
            maxIn = Number(maxIn);
            var database = firebase.database().ref('project').orderByChild(colName).endAt(maxIn);
            database.once('value', function(snapshot){
                if(snapshot.exists()){
                    var content = '';
                    snapshot.forEach(function(data){
                        var val = data.val();
                        content +='<tr>';
                        content += '<td>' + val.displayName + '</td>';
                        content += '<td>' + val.city + '</td>';
                        content += '<td>' + val.state + '</td>';
                        content += '<td>' + val.publicOrPrivate + '</td>';
                        content += '<td>' + val.act + '</td>';
                        content += '<td>' + val.sat + '</td>';
                        content += '<td>' + val.gpa + '</td>';
                        content += '<td>' + val.enrollment + '</td>';
                        if (val.acceptRate === "unknown") {
                            content += '<td>' + val.acceptRate + '</td>';
                        } else {
                            content += '<td>' + val.acceptRate + '% </td>';
                        }
                        content += '<td>' + val.businessScore + '</td>';
                        content += '<td>' + val.engineeringScore + '</td>';
                        content += '<td> $' + val.tuition + '</td>';
                        content += '<td>' + val.overallRank + '</td>';
                        content += '</tr>';
                    });
                    $('#dataTableBody').append(content);
                }
            })
        } else {
            minIn = Number(minIn);
            maxIn = Number(maxIn);
            if (minIn > maxIn) {
                alert("Min value must be smaller than Max.");
            }
            var database = firebase.database().ref('project').orderByChild(colName).startAt(minIn).endAt(maxIn);
            database.once('value', function(snapshot){
                if(snapshot.exists()){
                    var content = '';
                    snapshot.forEach(function(data){
                        var val = data.val();
                        content +='<tr>';
                        content += '<td>' + val.displayName + '</td>';
                        content += '<td>' + val.city + '</td>';
                        content += '<td>' + val.state + '</td>';
                        content += '<td>' + val.publicOrPrivate + '</td>';
                        content += '<td>' + val.act + '</td>';
                        content += '<td>' + val.sat + '</td>';
                        content += '<td>' + val.gpa + '</td>';
                        content += '<td>' + val.enrollment + '</td>';
                        if (val.acceptRate === "unknown") {
                            content += '<td>' + val.acceptRate + '</td>';
                        } else {
                            content += '<td>' + val.acceptRate + '% </td>';
                        }
                        content += '<td>' + val.businessScore + '</td>';
                        content += '<td>' + val.engineeringScore + '</td>';
                        content += '<td> $' + val.tuition + '</td>';
                        content += '<td>' + val.overallRank + '</td>';
                        content += '</tr>';
                    });
                    $('#dataTableBody').append(content);
                }
            })
        }
    });
}

// ["displayName","city","state","publicOrPrivate","act","sat","gpa","enrollment",
// "acceptRate","businessScore","engineeringScore","tuition","overallRank"];

sortColumnAsc('univSortAsc',"displayName","");
sortColumnDec('univSortDec',"displayName","");
sortColumnAsc('citySortAsc',"city","");
sortColumnDec('citySortDec',"city","");
sortColumnAsc('stateSortAsc',"state","");
sortColumnDec('stateSortDec',"state","");
sortColumnAsc('typeSortAsc',"publicOrPrivate","");
sortColumnDec('typeSortDec',"publicOrPrivate","");
sortColumnAsc('actSortAsc',"act","actCheck");
sortColumnDec('actSortDec',"act","actCheck");
sortColumnAsc('satSortAsc',"sat","satCheck");
sortColumnDec('satSortDec',"sat","satCheck");
sortColumnAsc('gpaSortAsc',"gpa","gpaCheck");
sortColumnDec('gpaSortDec',"gpa","gpaCheck");
sortColumnAsc('enrollSortAsc',"enrollment","enrollCheck");
sortColumnDec('enrollSortDec',"enrollment","enrollCheck");
sortColumnAsc('accSortAsc',"acceptRate","accCheck");
sortColumnDec('accSortDec',"acceptRate","accCheck");
sortColumnAsc('busSortAsc',"businessScore","busCheck");
sortColumnDec('busSortDec',"businessScore","busCheck");
sortColumnAsc('engSortAsc',"engineeringScore","engCheck");
sortColumnDec('engSortDec',"engineeringScore","engCheck");
sortColumnAsc('tuitionSortAsc',"tuition","");
sortColumnDec('tuitionSortDec',"tuition","");
sortColumnAsc('rankSortAsc',"overallRank","rankCheck");
sortColumnDec('rankSortDec',"overallRank","rankCheck");

stringFilter("typeFilterGo","publicOrPrivate","typeFilter");
stringFilter("stateFilterGo","state","stateFilter");

numericalFilter("actFilterGo","act","actMin","actMax");
numericalFilter("satFilterGo","sat","satMin","satMax");
numericalFilter("gpaFilterGo","gpa","gpaMin","gpaMax");
numericalFilter("accFilterGo","acceptRate","accMin","accMax");
numericalFilter("enrollFilterGo","enrollment","enrollMin","enrollMax");
numericalFilter("busFilterGo","businessScore","busMin","busMax");
numericalFilter("engFilterGo","engineeringScore","engMin","engMax");
numericalFilter("tuitionFilterGo","tuition","tuitionMin","tuitionMax");
numericalFilter("rankFilterGo","overallRank","rankMin","rankMax");