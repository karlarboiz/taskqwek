/**
 * Custom Date Picker Component (Functional jQuery Version)
 * A beautiful, responsive date picker with modern UI
 */

export default function initCalendarFunction() {
    $(document).ready(function() {
        // Initialize calendar once when page loads
        initDatePicker();
    });

    function initDatePicker() {
        // Cache jQuery elements
        const $input = $('#project-deadline');
        const $dropdown = $('#date-picker-dropdown');
        const $wrapper = $('#date-input-wrapper');
        const $monthYear = $('#current-month-year');
        const $daysContainer = $('#date-picker-days');
        const $prevMonth = $('#prev-month');
        const $nextMonth = $('#next-month');
        const $clearDate = $('#clear-date');
        const $todayDate = $('#today-date');
        const $dateIcon = $('#date-icon');

        // Check if elements exist
        if (!$input.length) {
            return;
        }
        if (!$dropdown.length) {
            return;
        }

        let currentDate = new Date();
        let selectedDate = null;
        let isOpen = false;

        // Setup event listeners
        setupEventListeners();
        renderCalendar();
        updateInput();

        function setupEventListeners() {
            // Toggle dropdown
            $input.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleDropdown();
            });
            
            // Close dropdown when clicking outside
            $(document).on('click', function(e) {
                if (!$(e.target).closest('.custom-date-picker').length) {
                    closeDropdown();
                }
            });
            
            // Navigation buttons
            $prevMonth.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                previousMonth();
            });
            
            $nextMonth.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                nextMonth();
            });
            
            // Footer buttons
            $clearDate.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                clearDate();
            });
            
            $todayDate.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                selectToday();
            });
            
            // Date icon click
            $dateIcon.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleDropdown();
            });
        }

        function toggleDropdown() {
            if (isOpen) {
                closeDropdown();
            } else {
                openDropdown();
            }
        }

        function openDropdown() {
            $dropdown.addClass('show').show();
            isOpen = true;
            $wrapper.addClass('focused');
        }

        function closeDropdown() {
            $dropdown.removeClass('show').hide();
            isOpen = false;
            $wrapper.removeClass('focused');
        }

        function previousMonth() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        }

        function nextMonth() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        }

        function renderCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            
            // Update header
            $monthYear.text(
                new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            );
            
            // Get first day of month and number of days
            const firstDay = new Date(year, month, 1);
            const startDate = new Date(firstDay);
            startDate.setDate(startDate.getDate() - firstDay.getDay());
            
            // Clear previous days
            $daysContainer.empty();
            
            // Render calendar grid
            for (let i = 0; i < 42; i++) {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + i);
                
                const $dayElement = $('<div>')
                    .addClass('date-day')
                    .text(date.getDate());
                
                // Check if date is from current month
                if (date.getMonth() !== month) {
                    $dayElement.addClass('other-month');
                }
                
                // Check if date is today
                if (isToday(date)) {
                    $dayElement.addClass('today');
                }
                
                // Check if date is selected
                if (selectedDate && isSameDate(date, selectedDate)) {
                    $dayElement.addClass('selected');
                }
                
                // Check if date is in the past
                if (date < new Date().setHours(0, 0, 0, 0)) {
                    $dayElement.addClass('disabled');
                } else {
                    $dayElement.on('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        selectDate(date);
                    });
                }
                
                $daysContainer.append($dayElement);
            }
        }

        function selectDate(date) {
            selectedDate = date;
            updateInput();
            renderCalendar();
            closeDropdown();
        }

        function selectToday() {
            selectDate(new Date());
        }

        function clearDate() {
            selectedDate = null;
            updateInput();
            renderCalendar();
        }

        function updateInput() {
            if (selectedDate) {
                $input.val(
                    selectedDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })
                );
            } else {
                $input.val('');
            }
        }

        function isToday(date) {
            const today = new Date();
            return isSameDate(date, today);
        }

        function isSameDate(date1, date2) {
            return date1.getDate() === date2.getDate() &&
                   date1.getMonth() === date2.getMonth() &&
                   date1.getFullYear() === date2.getFullYear();
        }

        // Public methods for external access
        window.calendarUtils = {
            getSelectedDate: function() {
                return selectedDate;
            },
            getSelectedDateISO: function() {
                return selectedDate ? selectedDate.toISOString().split('T')[0] : '';
            },
            setDate: function(date) {
                if (date instanceof Date) {
                    selectedDate = date;
                    currentDate = new Date(date);
                    updateInput();
                    renderCalendar();
                }
            },
            getFormattedDate: function(format = 'short') {
                if (!selectedDate) return '';
                
                switch (format) {
                    case 'long':
                        return selectedDate.toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        });
                    case 'medium':
                        return selectedDate.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        });
                    case 'short':
                    default:
                        return selectedDate.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        });
                }
            }
        };
    }
}
