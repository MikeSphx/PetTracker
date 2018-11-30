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
    var rawDate = $("#sympModal #new-date2").val().trim();
    var date = new Date(rawDate);
    date = date.toLocaleDateString("en-US", options);
    var name = $("#sympModal #symp-name")[0].value;
    
    var nameValid = name !== '';
    var dateValid = date !== '' && date !== 'Invalid Date';
    
    var invalidWarning = 'Invalid ';
    var invalidInputs = [];
    
    if (nameValid && dateValid) {
        $("h").prepend('<div class="oval" id='+ctr+'><div class="text-date"><p id=date'+ctr+'>'+date+'</p><div class="text-block"><p id=p'+ctr+'><b>Symptom:</b> '+name+'</p></div></div><div class="edit-block"><button type="button" class="btn btn-secondary" id= "edit3" data-toggle="modal" data-target="#editsympModal" data-myvalue="'+ctr+'">Edit</button> <button type="button" class="btn btn-secondary" id= "remove" onclick="removeClick('+ctr+')">Remove</button></div></div>');
        ctr++;
        $('#symp-name').val('');
        $('#new-date2').val('');
        $('#sympModal').modal('hide');
        $('.invalid-warning').hide();
    } else {
        if (!nameValid) {
            $('#symp-name').effect("highlight", {color: '#ffa99b'}, 750);
            invalidInputs.push('Name');
        }
        if (!dateValid) {
            $('#new-date2').effect("highlight", {color: '#ffa99b'}, 750);
            
            var literalDate = $('#new-date2').data('date');
            invalidInputs.push('Date');
        }
        invalidWarning += invalidInputs.join(' and ');
        $('.invalid-warning').text(invalidWarning);
        $('.invalid-warning').show();
    }
}

function appendMedClick() {
    console.log('append');
    // Display modal for adding a symptom
    var options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC' };
    var date = $("#medModal #new-date1").val().trim();
    date = new Date(date);
    date = date.toLocaleDateString("en-US", options);
    var name = $("#medModal #med-name")[0].value;
    
    var nameValid = name !== '';
    var dateValid = date !== '' && date !== 'Invalid Date';
    
    var invalidWarning = 'Invalid ';
    var invalidInputs = [];
    
    if (nameValid && dateValid) {
        $("h").prepend('<div class="oval" id='+ctr+'><div class="text-date"><p id=date'+ctr+'>'+date+'</p><div class="text-block"><p id=p'+ctr+'><b>Med taken:</b> '+name+'</p></div></div><div class="edit-block"><button type="button" class="btn btn-secondary" id= "edit3" data-toggle="modal" data-target="#editmedModal" data-myvalue="'+ctr+'">Edit</button> <button type="button" class="btn btn-secondary" id= "remove" onclick="removeClick('+ctr+')">Remove</button></div></div>');
        ctr++;
        
        $('#med-name').val('');
        $('#new-date1').val('');
        $('#medModal').modal('hide');
        $('.invalid-warning').hide();
    } else {
        if (!nameValid) {
            $('#med-name').effect("highlight", {color: '#ffa99b'}, 750);
            invalidInputs.push('Name');
        }
        if (!dateValid) {
            $('#new-date1').effect("highlight", {color: '#ffa99b'}, 750);
            
            var literalDate = $('#new-date1').data('date');
            invalidInputs.push('Date');
        }
        invalidWarning += invalidInputs.join(' and ');
        $('.invalid-warning').text(invalidWarning);
        $('.invalid-warning').show();
    }
}

function removeClick(id) {
    document.getElementById(id).remove();
}

function editSympClick(id) {
    var options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC' };
    // Display modal for adding a symptom
    var date = $("#editsympModal #edit-new-date2").val().trim();
    date = new Date(date);
    date = date.toLocaleDateString("en-US", options);
    
    
    var name = $("#editsympModal #edit-name")[0].value;
    
    
    var validName = name !== '';;
    var validDate = date !== '' && date !== 'Invalid Date';
    
    var invalidWarning = 'Invalid ';
    var invalidInputs = [];
    
    if (validName && validDate) {
        var p = "p" + data_id;
        var tempDate = "date" + data_id;
        document.getElementById(p).innerHTML = "<b>Symptom</b>: " + name;
        document.getElementById(tempDate).innerHTML = date;
        
        $('#editsympModal #edit-name').val('');
        $('#editsympModal #edit-new-date2').val('');
        $('.invalid-warning').hide();
    } else {
        if (!validName) {
            $('#editsympModal #edit-name').effect("highlight", {color: '#ffa99b'}, 750);
            invalidInputs.push('Name');
        }
        if (!validDate) {
            $('#editsympModal #edit-new-date2').effect("highlight", {color: '#ffa99b'}, 750);
            
            var literalDate = $('#editsympModal #edit-new-date2').data('date');
            invalidInputs.push('Date');
        }
        invalidWarning += invalidInputs.join(' and ');
        $('.invalid-warning').text(invalidWarning);
        $('.invalid-warning').show();
    }
}

function editMedClick(id) {
    // Display modal for adding a symptom
    var options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC' };
    var date = $("#editmedModal #edit-new-date1").val().trim();
    date = new Date(date);
    date = date.toLocaleDateString("en-US", options);
    
    var name = $("#editmedModal #edit-med-name").val().trim();
    
    
    var validName = name !== '';;
    var validDate = date !== '' && date !== 'Invalid Date';
    
    var invalidWarning = 'Invalid ';
    var invalidInputs = [];
    
    if (validName && validDate) {
        var p = "p" + data_id;
        var tempDate = "date" + data_id;
        document.getElementById(p).innerHTML = "<b>Med taken</b>: " + name;
        document.getElementById(tempDate).innerHTML = date;
        
        $('#editsympModal #edit-med-name').val('');
        $('#editsympModal #edit-new-date1').val('');
        
        $('.invalid-warning').hide();
    } else {
        if (!validName) {
            $('#editmedModal #edit-med-name').effect("highlight", {color: '#ffa99b'}, 750);
            invalidInputs.push('Name');
        }
        if (!validDate) {
            $('#editmedModal #edit-new-date1').effect("highlight", {color: '#ffa99b'}, 750);
            
            var literalDate = $('#editmedModal #edit-new-date1').data('date');
            invalidInputs.push('Date');
        }
        invalidWarning += invalidInputs.join(' and ');
        $('.invalid-warning').text(invalidWarning);
        $('.invalid-warning').show();
    }
}