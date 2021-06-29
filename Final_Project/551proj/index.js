loadRadarChart();
function loadRadarChart(){
    document.getElementById("chartButton").addEventListener('click', function(){
        $("tbody").children().remove();
        var database = firebase.database();
        database.ref('project').orderByChild("overallRank").once('value', function(snapshot){
            if(snapshot.exists()){
                var content = '';
                snapshot.forEach(function(data){
                    var val = data.val();
                    content +='<tr>';
                    createModal(data.key);
                    createRadarChart(val, data.key);
                    var modalName = "#" + data.key + "Modal";
                    content += '<td><a href="#" data-toggle="modal" data-target=' + modalName + '>' + val.displayName + '</a></td>';
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
        alert("Click university name to check its radar plot");
    });
}

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

String.prototype.supplant = function (o) {
    return this.replace(/{([^{}]*)}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};

function createModal(displayName){
    var modalName = displayName + "Modal";
    var graphName = displayName + "Graph";
    $(document.body).append(
        '<div class="modal fade" id={a} tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true"> \
            <div class="modal-dialog" role="document"> \
                <div class="modal-content"> \
                    <div class="modal-header"> \
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"> \
                            <span aria-hidden="true">&times;</span> \
                        </button> \
                    <h4 class="modal-title" id="modalLabel">Radar Chart</h4> \
                </div> \
                <div class="modal-body"> \
                    <div class={b}></div> \
                </div> \
            </div> \
        </div> \
    </div>'.supplant({ a: modalName, b: graphName }));
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

sortColumnAsc('univSortAsc',"displayName","");
sortColumnDec('univSortDec',"displayName","");
sortColumnAsc('citySortAsc',"city","");
sortColumnDec('citySortDec',"city","");
sortColumnAsc('stateSortAsc',"state","");
sortColumnDec('stateSortDec',"state","");
sortColumnAsc('typeSortAsc',"publicOrPrivate","");
sortColumnDec('typeSortDec',"publicOrPrivate","");

stringFilter("typeFilterGo","publicOrPrivate","typeFilter");
stringFilter("stateFilterGo","state","stateFilter");

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

numericalFilter("actSortAsc","actCheck","act","actMin","actMax");
numericalFilter("actSortDec","actCheck","act","actMin","actMax");
numericalFilter("satSortAsc","satCheck","sat","satMin","satMax");
numericalFilter("satSortDec","satCheck","sat","satMin","satMax");
numericalFilter("gpaSortAsc","gpaCheck","gpa","gpaMin","gpaMax");
numericalFilter("gpaSortDec","gpaCheck","gpa","gpaMin","gpaMax");
numericalFilter("enrollSortAsc","enrollCheck","enrollment","enrollMin","enrollMax");
numericalFilter("enrollSortDec","enrollCheck","enrollment","enrollMin","enrollMax");
numericalFilter("accSortAsc","accCheck","acceptRate","accMin","accMax");
numericalFilter("accSortDec","accCheck","acceptRate","accMin","accMax");
numericalFilter("busSortAsc","busCheck","businessScore","busMin","busMax");
numericalFilter("busSortDec","busCheck","businessScore","busMin","busMax");
numericalFilter("engSortAsc","engCheck","engineeringScore","engMin","engMax");
numericalFilter("engSortDec","engCheck","engineeringScore","engMin","engMax");
numericalFilter("tuitionSortAsc","tuitionCheck","tuition","tuitionMin","tuitionMax");
numericalFilter("tuitionSortDec","tuitionCheck","tuition","tuitionMin","tuitionMax");
numericalFilter("rankSortAsc","rankCheck","overallRank","rankMin","rankMax");
numericalFilter("rankSortDec","rankCheck","overallRank","rankMin","rankMax");
function numericalFilter(goId, checkId, colName, minId, maxId) {
    var DesOrder = false;
    if (goId.includes('Dec')){
        DesOrder = true;
    }

    document.getElementById(goId).addEventListener('click', function(){
        var minIn = document.getElementById(minId).value;
        var maxIn = document.getElementById(maxId).value;

        $("tbody").children().remove();
        if (minIn.length === 0 && maxIn.length === 0) {
            var database = firebase.database().ref('project').orderByChild(colName);
            database.once('value', function(snapshot){
                if(snapshot.exists()){
                    var content = '';
                    if (DesOrder == false){
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
                    } else {
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
                    }
                    $('#dataTableBody').append(content);
                }
            })
        } else if (maxIn.length === 0) {
            minIn = Number(minIn);
            var database = firebase.database().ref('project').orderByChild(colName).startAt(minIn);
            database.once('value', function(snapshot){
                if(snapshot.exists()){
                    var content = '';
                    if (DesOrder == false){
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
                    } else {
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
                    }
                    $('#dataTableBody').append(content);
                }
            })
        } else if (minIn.length === 0) {
            maxIn = Number(maxIn);
            var database = firebase.database().ref('project').orderByChild(colName).endAt(maxIn);
            database.once('value', function(snapshot){
                if(snapshot.exists()){
                    var content = '';
                    if (DesOrder == false){
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
                    } else {
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
                    }
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
                    if (DesOrder == false){
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
                    } else {
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
                    }
                    $('#dataTableBody').append(content);
                }
            })
        }
    });
}