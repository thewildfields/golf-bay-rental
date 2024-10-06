import { useState } from "react";

const BookingTabs = () => {
    const [activeTab, setActiveTab] = useState('today');

    const switchTab = (e) => {
        const tabId = e.target.getAttribute('data-tab-title')
        if( activeTab !== tabId ){
            setActiveTab(tabId);
            console.log( 'active tab was switched to '+tabId );
        }
    } 
    return(
        <>
            <div className="tabs">
                <div className="tabs__header">
                    <button
                        className="tabs__button"
                        data-tab-title="today"
                        onClick={e => switchTab(e)}
                    >
                            Today
                    </button>
                    <button
                        className="tabs__button"
                        data-tab-title="tomorrow"
                        onClick={e => switchTab(e)}
                    >
                            Tomorrow
                    </button>
                    <button
                        className="tabs__button"
                        data-tab-title="pick-a-day"
                        onClick={e => switchTab(e)}
                    >
                            pick a day
                    </button>
                </div>
                <div className="tabs__body">
                </div>
            </div>
            { activeTab }
        </>
    )
}

export default BookingTabs;