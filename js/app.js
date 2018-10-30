$(document).ready(function(){
    registerEventHandlers();
});

function registerEventHandlers() {
    $('#health-log-button').click(healhLogButtonClick);
    $('#manage-docs-button').click(manageDocsButtonClick);
}

function healhLogButtonClick() {
    console.log('Clicked health log button');
    window.location = './pages/health-log.html';
    
}

function manageDocsButtonClick() {
    console.log('Clicked manage docs button');
    window.location = './pages/manage-docs.html';
}