$(document).ready(function(){
    registerEventHandlers();
});

function registerEventHandlers() {
    $('#health-log-button').click(healhLogButtonClick);
    $('#manage-docs-button').click(manageDocsButtonClick);
}

function healhLogButtonClick() {
    console.log('Clicked health log button');
}

function manageDocsButtonClick() {
    console.log('Clicked manage docs button');
}