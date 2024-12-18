/**
 * Composant React pour afficher le score utilisateur sous forme de graphique radial.
 *
 * @component
 * @returns {JSX.Element} Un graphique RadialBarChart affichant le pourcentage de l'objectif atteint par l'utilisateur.
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserData } from '../../services/dataService';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import styles from './Score.module.scss';

function Score() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [score, setScore] = useState(0);

  /**
   * Récupération du score utilisateur lors du montage du composant.
   * Utilise un hook `useEffect` pour appeler l'API et récupérer les données.
   */
  useEffect(() => {
    const fetchData = async () => {
      const userId = parseInt(id, 10);
      const data = await fetchUserData(userId, navigate);

      if (data) {
        setScore(data.todayScore || data.score);
      }
    };

    fetchData();
  }, [id, navigate]);

  /**
   * Données formatées pour le graphique radial.
   */
  const chartData = [
    {
      value: score * 100,
    },
  ];

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.title}>Score</h2>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="90%"
          barSize={10}
          data={chartData}
          startAngle={90}
          endAngle={90 + score * 360}
        >
          <RadialBar
            minAngle={15}
            clockWise
            dataKey="value"
            fill="#FF0000"
            cornerRadius={50}
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
            {`${(score * 100).toFixed(0)}%`}
          </text>
          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: '14px', fill: '#74798C' }}
          >
            de votre objectif
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Score;
