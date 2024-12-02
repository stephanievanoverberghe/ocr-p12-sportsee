import React from 'react';
import PropTypes from 'prop-types';
import styles from './Nutrient.module.scss';

function Nutrient({ icon, value, label, bgColor }) {
  return (
    <div
      className={styles.card}
      style={{ backgroundColor: 'var(--gray-light)' }}
    >
      <div
        className={styles.iconContainer}
        style={{ backgroundColor: bgColor }}
      >
        <img src={icon} alt={label} />
      </div>
      <div className={styles.content}>
        <span className={styles.value}>{value}</span>
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
}

Nutrient.propTypes = {
  icon: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
};

export default Nutrient;
