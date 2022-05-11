/* eslint-disable react/require-default-props */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

// onClick change mute state
export default function MuteButton({ mute, setMute }) {
  if (mute) {
    return (
      <FontAwesomeIcon onClick={() => setMute(false)} className="MuteButton" icon={faVolumeMute} />
    );
  }
  return (
    <FontAwesomeIcon onClick={() => setMute(true)} className="MuteButton" icon={faVolumeUp} />
  );
}

MuteButton.propTypes = {
  mute: PropTypes.bool,
  setMute: PropTypes.func,
};
