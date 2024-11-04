import { useState } from 'react';
import bgImage from '../assets/img/kiosk-bg.jpg';
import KioskPopup from '../Components/kiosk/KioskPopup';

const KioskPage = () => {

    const [showPopup, setShowPopup] = useState(false);
    const [isLaunchGame, setIsLaunchGame] = useState(false)

    return(
        <>
            { !isLaunchGame && <div
                className='h-screen bg-cover bg-no-repeat bg-center flex items-center justify-center relative'
                style={{backgroundImage: `url(${bgImage})`}}
                >
                    <div className="flex w-full max-w-4xl mx-auto justify-between">
                        <button
                            type="button"
                            className="bg-green-700 w-96 px-6 py-24 rounded-xl flex flex-col items-center gap-4 shadow-2xl"
                            onClick={ e=> setShowPopup(true)}
                        >
                            <p className="text-white text-2xl uppercase font-bold">Hit on the</p>
                            <p className="text-white text-6xl uppercase font-bold">Driving Range</p>
                            <p className="text-white text-2xl uppercase font-bold">Click Here</p>
                        </button>
                        <button
                            type="button"
                            className="bg-green-700 w-96 px-6 py-24 rounded-xl flex flex-col items-center gap-4 shadow-2xl"
                            onClick={ e=> setShowPopup(true)}
                        >
                            <p className="text-white text-2xl uppercase font-bold">start</p>
                            <p className="text-white text-6xl uppercase font-bold">Course Play</p>
                            <p className="text-white text-2xl uppercase font-bold">Click Here</p>
                        </button>
                    </div>
                    {
                        showPopup &&
                        <KioskPopup
                            venue="67269c6be16ff341cb0f375b"
                            onSuccessfullBooking={ val => {
                                val && setIsLaunchGame(true)
                            }}
                        />
                    }
                </div>
            }
            { isLaunchGame && <h1 className='text-3xl'>Launch Game</h1>}
        </>
    )
}

export default KioskPage;