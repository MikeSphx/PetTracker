$(document).ready(function(){
    registerEventHandlers();
    $('#editmedModal').on('shown.bs.modal', function (e) {
        data_id = $(e.relatedTarget).data('myvalue');
     });
    $('#editsympModal').on('shown.bs.modal', function (e) {
        data_id = $(e.relatedTarget).data('myvalue');
     });
});

function registerEventHandlers() {
    $("#masterfab").click(fabClick);
    $("#addMed").click(addMedClick);
    $("#logSymp").click(logSympClick);
    $("#save2").click(appendSympClick);
    $("#save1").click(appendMedClick);
    $("#remove").click(removeClick);
    $("#edit1").click(editSympClick);
    $("#edit2").click(editMedClick);
    $('.nav-home').click(navHomeClick);
    $(".backdrop").click(backdropClick);
}

var ctr = 5;


function navHomeClick() {
    window.location = '../index.html';
}

function backdropClick() {
    fabClick();
}

function fabClick() {
    console.log('Clicked FAB'); 
    if($(".backdrop").is(":visible")){
			$(".backdrop").fadeOut(125);
			$(".fab.child")
				.stop()
				.animate({
					bottom	: $("#masterfab").css("bottom"),
					opacity	: 0
				},125,function(){
					$(this).hide();
				});
            $("#plus-text").show();
            $("#undo-icon").hide();
		}else{
			jQuery(".backdrop").fadeIn(125);
			$(".fab.child").each(function(){
				$(this)
					.stop()
					.show()
					.animate({
						bottom	: (parseInt($("#masterfab").css("bottom")) + parseInt($("#masterfab").outerHeight()) + 70 * $(this).data("subitem") - $(".fab.child").outerHeight()) + "px",
						opacity	: 1
					},125);
			});
            $("#plus-text").hide();
            $("#undo-icon").show();
		}
}

function addMedClick() {
    console.log('Clicked Add Medicine');
    // Display modal for adding medicine
    $('#medModal').on('show.bs.modal', function (event) {
        var modal = $(this)
        })
    fabClick();
}

function logSympClick() {
    console.log('Clicked Log Symptom');
    // Display modal for adding a symptom
    $('#sympModal').on('show.bs.modal', function (event) {
        var modal = $(this)
        })
    fabClick();
}

function appendSympClick() {
    console.log('append');
    var options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC' };
    // Display modal for adding a symptom
    var date = $("#sympModal #new-date2").val().trim();
    date = new Date(date);
    date = date.toLocaleDateString("en-US", options);
    var name = $("#sympModal #name").val().trim();
    $("h").prepend('<div class="oval" id='+ctr+'><div class="text-date"><p id=date'+ctr+'>'+date+'</p><div class="text-block"><p id=p'+ctr+'><b>Symptom:</b> '+name+'</p></div></div><div class="edit-block"><button type="button" class="btn btn-secondary" id= "edit3" data-toggle="modal" data-target="#editmedModal" data-myvalue="'+ctr+'">Edit</button> <button type="button" class="btn btn-secondary" id= "remove" onclick="removeClick('+ctr+')">Remove</button></div></div>');
    ctr++
}

function appendMedClick() {
    console.log('append');
    // Display modal for adding a symptom
    var options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC' };
    var date = $("#medModal #new-date1").val().trim();
    date = new Date(date);
    date = date.toLocaleDateString("en-US", options);
    var name = $("#sympModal #name").val().trim();
    var name = $("#medModal #name").val().trim();
    $("h").prepend('<div class="oval" id='+ctr+'><div class="text-date"><p id=date'+ctr+'>'+date+'</p><div class="text-block"><p id=p'+ctr+'><b>Med taken:</b> '+name+'</p></div></div><div class="edit-block"><button type="button" class="btn btn-secondary" id= "edit3" data-toggle="modal" data-target="#editmedModal" data-myvalue="'+ctr+'">Edit</button> <button type="button" class="btn btn-secondary" id= "remove" onclick="removeClick('+ctr+')">Remove</button></div></div>');
    ctr++
}

function removeClick(id) {
    document.getElementById(id).remove();
}

function editSympClick(id) {
    var options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC' };
    // Display modal for adding a symptom
    var date = $("#editsympModal #new-date2").val().trim();
    date = new Date(date);
    date = date.toLocaleDateString("en-US", options);
    var name = $("#editsympModal #name").val().trim();
    var p = "p" + data_id;
    var tempDate = "date" + data_id;
    document.getElementById(p).innerHTML = "Symptom: " + name;
    document.getElementById(tempDate).innerHTML = date;
}

function editMedClick(id) {
    // Display modal for adding a symptom
    var options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC' };
    var date = $("#editmedModal #new-date1").val().trim();
    date = new Date(date);
    date = date.toLocaleDateString("en-US", options);
    var name = $("#editmedModal #name").val().trim();
    var p = "p" + data_id;
    var tempDate = "date" + data_id;
    document.getElementById(p).innerHTML = "Med taken: " + name;
    document.getElementById(tempDate).innerHTML = date;
}