/**
 * Composant React qui affiche un graphique en courbes pour la durée moyenne des sessions.
 *
 * @component
 * @returns {JSX.Element} Le composant `AverageSession` qui affiche un graphique en courbes.
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserAverageSession } from '../../services/dataService';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styles from './AverageSession.module.scss';

function AverageSession() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [averageSessions, setAverageSessions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = parseInt(id, 10);
      const data = await fetchUserAverageSession(userId, navigate);
      if (data) {
        const formattedSessions = data.sessions.map((session) => ({
          ...session,
          day:
            ['L', 'M', 'M', 'J', 'V', 'S', 'D'][session.day - 1] || session.day,
        }));
        setAverageSessions(formattedSessions);
      }
    };

    fetchData();
  }, [id, navigate]);

  /**
   * Tooltip personnalisé pour afficher la durée de session.
   *
   * @param {Object} props - Propriétés du tooltip.
   * @param {boolean} props.active - Indique si le tooltip est actif.
   * @param {Array} props.payload - Données associées au point du graphique.
   * @returns {JSX.Element|null} Contenu du tooltip ou `null` si inactif.
   */
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.tooltip}>
          <p>{`${payload[0].value} min`}</p>
        </div>
      );
    }
    return null;
  };

  /**
   * Curseur personnalisé pour surligner la session active.
   *
   * @param {Object} props - Propriétés du curseur.
   * @param {Array} props.points - Points associés à la session.
   * @param {number} props.width - Largeur du curseur.
   * @returns {JSX.Element} Un élément `rect` représentant le curseur.
   */
  const CustomCursor = ({ points, width }) => {
    const { x } = points[0];
    return (
      <rect
        x={x - width / 2}
        y="0"
        width={width}
        height="100%"
        fill="rgba(0, 0, 0, 0.1)"
      />
    );
  };

  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={averageSessions}
          margin={{ top: 0, right: 10, left: 10, bottom: 10 }}
        >
          {/* Définition des dégradés pour la ligne */}
          <defs>
            <linearGradient id="lineGradient">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="30%" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="100%" />
            </linearGradient>
          </defs>
          {/* Titre du graphique */}
          <text
            x={20}
            y={35}
            textAnchor="left"
            style={{
              fontSize: '0.9vw',
              fontWeight: 500,
              fill: '#FFFFFF',
              fillOpacity: '50%',
            }}
          >
            Durée moyenne des sessions
          </text>
          {/* Axe X */}
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#FFFFFF', fillOpacity: '75%' }}
            stroke="white"
            style={{ fontSize: '12px', opacity: 0.8 }}
          />
          {/* Axe Y (caché) */}
          <YAxis hide={true} domain={['dataMin - 20', 'dataMax + 50']} />
          {/* Tooltip avec curseur personnalisé */}
          <Tooltip
            content={<CustomTooltip />}
            cursor={<CustomCursor width={40} />}
          />
          {/* Ligne représentant la durée moyenne des sessions */}
          <Line
            type="natural"
            dataKey="sessionLength"
            stroke="url(#lineGradient)"
            strokeWidth={2}
            dot={false}
            activeDot={{
              stroke: '#FFFFFF',
              strokeOpacity: '50%',
              strokeWidth: 10,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AverageSession;
