import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'

// onClick change mute state
const MuteButton = ({mute, setMute}) => {
    if (mute) {
        return (
        <FontAwesomeIcon onClick={() => setMute(false)} className="MuteButton" icon={faVolumeMute} />
        );
      } else {
          return (
        <FontAwesomeIcon onClick={() => setMute(true)} className="MuteButton" icon={faVolumeUp} />
          );
      }
};

export default MuteButton;
