document.addEventListener('DOMContentLoaded', function() {
    // Display current day
    var currentDate = dayjs().format('dddd, MMMM D, YYYY');
    document.getElementById('current-day').textContent = currentDate;

    // Generate time blocks for standard business hours (9AM to 5PM)
    var timeBlocks = document.getElementById('time-blocks');
    for (var i = 9; i <= 17; i++) {
        var timeBlock = createTimeBlock(i);
        timeBlocks.appendChild(timeBlock);
    }

    // Check and apply past, present, future colors
    checkTimeBlocks();
});

function createTimeBlock(hour) {
    var timeBlock = document.createElement('div');
    timeBlock.classList.add('time-block');

    var timeLabel = document.createElement('div');
    timeLabel.textContent = dayjs().hour(hour).format('hA');
    timeBlock.appendChild(timeLabel);

    var eventInput = document.createElement('textarea');
    timeBlock.appendChild(eventInput);

    var saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', function() {
        saveEvent(hour, eventInput.value);
    });
    timeBlock.appendChild(saveButton);

    return timeBlock;
}

function checkTimeBlocks() {
    var currentTime = dayjs().hour();

    var timeBlocks = document.getElementsByClassName('time-block');
    for (var i = 0; i < timeBlocks.length; i++) {
        var timeBlockHour = parseInt(dayjs(timeBlocks[i].firstChild.textContent, 'hA').format('H'));
        if (timeBlockHour < currentTime) {
            timeBlocks[i].classList.add('past');
        } else if (timeBlockHour === currentTime) {
            timeBlocks[i].classList.add('present');
        } else {
            timeBlocks[i].classList.add('future');
        }
    }
}

function saveEvent(hour, event) {
    localStorage.setItem('event_' + hour, event);
}