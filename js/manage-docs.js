$(document).ready(function(){
    registerEventHandlers();
});

function registerEventHandlers() {
    $('#add-new-button').click(addNewButtonClick);
    $('#export-button').click(exportButtonClick);
}

function addNewButtonClick() {
    console.log('Clicked add new'); 
}

function exportButtonClick() {
    console.log('Clicked export');
    $('#exportModal').on('show.bs.modal', function (event) {
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
})
}

