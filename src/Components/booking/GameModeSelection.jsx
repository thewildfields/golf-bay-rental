const GameModeSelection = ({venue, onData, booking}) => {

    const gameModeOptions = [
        {value: 'driving-range', label: 'Driving Range Bays', selected: false},
        {value: 'course-play', label: 'Course Play Bays', selected: false}
    ]

    return(        
        <div className="border-4 border-gray-300 rounded-full grid grid-cols-2 gap-0 mb-4">
            {
                venue.gameModes && gameModeOptions.map( (mode) => (
                    <button
                        type="button"
                        key={mode.value}
                        onClick={ e => onData(mode.value)}
                        className={`bg-gray-300 hover:bg-white first:rounded-l-full last:rounded-r-full ${mode.value === booking.gameMode && 'bg-white'}`}
                    >
                        {mode.label}
                    </button>
                ))
            }
        </div>
    )
}

export default GameModeSelection;