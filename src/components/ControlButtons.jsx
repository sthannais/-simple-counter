import React from "react";

export default function ControlButtons(props) {
    const StartButton = (
        <button type="button" className="btn btn-outline-secondary mx-2 my-2" onClick={props.handleStart}>
            Start
        </button>

    );
    const ActiveButtons = (
        <>
            {props.isAlert && (
                <div class="alert alert-danger" role="alert">
                    Your time is up!
                </div>
            )}
            <div className="btn-grp">
                <button className="btn btn-outline-secondary mx-2 my-2" onClick={props.handleReset}>
                    Reset
                </button>
                <button className="btn btn-outline-secondary mx-2 my-2" onClick={props.handlePauseResume}>
                    {props.isPaused ? "Resume" : "Pause"}
                </button>
                <button className="btn btn-outline-secondary mx-2 my-2" onClick={props.handleDecrement}>
                    Decrement
                </button>
                <div className="btn btn-one">
                    <input
                        type="text"
                        id="message"
                        name="message"
                        placeholder="Reverse"
                        ref={props.inputRef}
                    />
                </div>
                <div className="btn btn-one">
                    <input
                        type="text"
                        id="message2"
                        name="message2"
                        placeholder="Enter the limit"
                        ref={props.inputRef2}
                    />
                </div>
            </div>

        </>
    );

    return (
        <div className="Control-Buttons">
            <div>{props.active ? ActiveButtons : StartButton}</div>
        </div>
    );
}