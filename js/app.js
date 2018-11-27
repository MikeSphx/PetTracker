var reminders = [];

$(document).ready(function(){
    setupChecklist();
    registerEventHandlers();
});

// Event handlers

function registerEventHandlers() {
    $('#health-log-button').click(healhLogButtonClick);
    $('#manage-docs-button').click(manageDocsButtonClick);
    $('#complete-task-button').click(completeTaskButtonClick);
    $('.add-reminder').click(addReminderClick);
    $('#save-reminder').click(saveReminderClick);
    $('.nav-home').click(navHomeClick);
}

function saveReminderClick() {
    console.log('Save Reminder Click');
    var note = $('#note-input')[0].value;
    var hour = $('#hour-input')[0].value;
    var min = $('#minute-input')[0].value;
    
    // TODO Input Verification
    
    var reminder = new Object();
    reminder.text = note;
    reminder.time = hour.toString() + 'h ' + min.toString() + 'm';
    reminder.mins = (parseInt(hour) * 60) + parseInt(min);
    addToChecklist(reminder);
    
    $('#add-reminder-modal').modal('hide');
}

function addReminderClick() {
    console.log('Add Reminder Click');
    
}

function healhLogButtonClick() {
    console.log('Clicked health log button');
    window.location = './pages/health-log.html';
}

function manageDocsButtonClick() {
    console.log('Clicked manage docs button');
    window.location = './pages/manage-docs.html';
}

function completeTaskButtonClick() { 
//    $.each($('.list-group-item-custom'), function(key, val) {
//        console.log(val);
//        
//    });
    
    var removedIndices = [];
    
    // Grab the indices of all selected reminders
    $('.list-group-item-custom').each(function() {
        removedIndices.push($(this).attr('index'));
    });
    
    // Remove the reminders from the JS array
    console.log(removedIndices);
    for (var i = removedIndices.length - 1; i >= 0; i--) {
        reminders.splice(removedIndices[i],1);
    }
    
    // Remove the selected reminders
    $('.list-group-item-custom').remove();
    
    // Update the reminders count
    updateRemindersCount();
}

function updateRemindersCount() {
    var numReminders = $('.list-group-item').length;
    $('#reminder-num').text(numReminders);
}

function navHomeClick() {
    window.location = './index.html';
}

// Setting up checklist

function addToChecklist(reminder) {
    reminders.push(reminder);
    sortItemsByDate(reminders);
    console.log(reminders);
    var items = [];
    var index = 0;
    $.each(reminders, function(key, val) {
        items.push('<li class="list-group-item no-select" data-color="custom"index='+index+'>'+val.text+
           '<span class="list-group-time">'+val.time+'</span></li>');
        index = index + 1;
    });
    var itemsHTML = items.join("");
    $('ul.checked-list-box').html("");
    $('ul.checked-list-box').append(itemsHTML);
    stylizeChecklist();
    updateRemindersCount();
}

function setupChecklist() {
    var index = 0;
    $.getJSON( "ajax/../data/reminders.json", function( data ) {
        var items = [];
        reminders = sortItemsByDate(data);
        $.each( data, function( key, val ) {
            items.push('<li class="list-group-item no-select" data-color="custom" index='+index+'>'+val.text+
                       '<span class="list-group-time">'+val.time+'</span></li>');
            index = index + 1;
        });
      
        var itemsHTML = items.join("");
        $('ul.checked-list-box').append(itemsHTML);
        stylizeChecklist();
        updateRemindersCount();
        
    });
}

function sortItemsByDate(data) {
    return data.sort(function(a, b) {
        return a.mins - b.mins;
    });
}

function stylizeChecklist() {
    $('.list-group.checked-list-box .list-group-item').each(function () {
        var $widget = $(this),
        $checkbox = $('<input type="checkbox" class="hidden" />'),
        color = ($widget.data('color') ? $widget.data('color') : "primary"),
        style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
        settings = {
            on: {
                icon: 'fa fa-check-square-o'
            },
            off: {
                icon: 'fa fa-square-o'
            }
        };
        $widget.css('cursor', 'pointer');
        $widget.append($checkbox);
        
            // Event Handlers
        $widget.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });
        
        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $widget.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $widget.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$widget.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $widget.addClass(style + color);
            } else {
                $widget.removeClass(style + color);
            }
        }

        // Initialization
        function init() {

            if ($widget.data('checked') == true) {
                $checkbox.prop('checked', !$checkbox.is(':checked'));
            }

            updateDisplay();

            // Inject the icon if applicable
            if ($widget.find('.state-icon').length == 0) {
                $widget.prepend('<i class="state-icon ' + settings[$widget.data('state')].icon + '"></i>');
            }
        }
        init();
    });
}