import React from 'react';
import PropTypes from 'prop-types';

export default function Switch({ isMobile, isOn, handleToggle }) {
  return (
    <label className={isMobile ? 'switch-toggle-mobile' : 'switch-toggle'}>
      <input checked={isOn} onChange={handleToggle} type="checkbox" />
      <span className="slider">
        <span className="slider-round">
          <span className="slider-text">{isOn ? 'C' : 'F'}</span>
        </span>
      </span>
    </label>
  );
}
Switch.propTypes = {
  isMobile: PropTypes.bool,
  isOn: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
};
