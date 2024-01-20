

<button className={buttonClass} onClick={(e) => {
                e.stopPropagation(); // Prevent onSelect when clicking the button
                if (isSelected) { onClockInOut(employee.id); }
            }} disabled={!isSelected}>
                {employee.isClockedIn ? 'Clock Out' : 'Clock In'}
            </button>