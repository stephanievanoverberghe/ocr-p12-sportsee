/**
 * Composant React qui affiche une carte de données nutritionnelles.
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.icon - L'URL de l'icône représentant le type de nutriment.
 * @param {string} props.value - La valeur des données nutritionnelles (par exemple, "1,930kCal").
 * @param {string} props.label - Le libellé du nutriment (par exemple, "Calories").
 * @param {string} props.bgColor - La couleur de fond pour l'icône.
 * @returns {JSX.Element} Une carte contenant une icône, une valeur, et un libellé de nutriment.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './Nutrient.module.scss';

function Nutrient({ icon, value, label, bgColor }) {
  return (
    <div
      className={styles.card}
      style={{ backgroundColor: 'var(--gray-light)' }}
    >
      {/* Conteneur de l'icône avec une couleur de fond personnalisée */}
      <div
        className={styles.iconContainer}
        style={{ backgroundColor: bgColor }}
      >
        <img src={icon} alt={label} />
      </div>
      {/* Contenu affichant la valeur et le libellé */}
      <div className={styles.content}>
        <span className={styles.value}>{value}</span>
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
}

// Définition des types de propriétés attendues par le composant
Nutrient.propTypes = {
  icon: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
};

export default Nutrient;
