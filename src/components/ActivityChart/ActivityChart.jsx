/**
 * Composant React qui affiche un graphique d'activité quotidienne avec Recharts.
 *
 * @component
 * @returns {JSX.Element} Le composant `ActivityChart` qui affiche un graphique en barres.
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserActivity } from '../../services/dataService';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import styles from './ActivityChart.module.scss';

function ActivityChart() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = parseInt(id, 10);
      const data = await fetchUserActivity(userId, navigate);
      if (data) {
        const formattedData = data.sessions.map((session, index) => ({
          ...session,
          day: index + 1,
        }));
        setActivityData(formattedData);
      }
    };

    fetchData();
  }, [id, navigate]);

  /**
   * Tooltip personnalisé pour afficher les détails d'un point de données.
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
          <p className={styles.weight}>{`${payload[0].value}kg`}</p>
          <p className={styles.calories}>{`${payload[1].value}Kcal`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height={275}>
        <BarChart data={activityData} barGap={12} barSize={8}>
          {/* Titre du graphique */}
          <text className={styles.title} x={0} y={20} textAnchor="left">
            Activité quotidienne
          </text>
          {/* Grille cartésienne */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          {/* Axe X */}
          <XAxis dataKey="day" tickLine={false} />
          {/* Axe Y pour le poids */}
          <YAxis
            yAxisId="kilogram"
            orientation="right"
            tickLine={false}
            axisLine={false}
            domain={['dataMin - 1', 'dataMax + 1']}
          />
          {/* Axe Y caché pour les calories */}
          <YAxis
            yAxisId="calories"
            orientation="left"
            tickLine={false}
            axisLine={false}
            domain={['dataMin - 100', 'dataMax + 100']}
            hide={true}
          />
          {/* Tooltip */}
          <Tooltip content={<CustomTooltip />} />
          {/* Légende */}
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ paddingBottom: '30px', fontSize: '15px' }}
          />
          {/* Barres pour le poids */}
          <Bar
            yAxisId="kilogram"
            dataKey="kilogram"
            fill="#282D30"
            radius={[10, 10, 0, 0]}
            name="Poids (kg)"
            barSize={7}
          />
          {/* Barres pour les calories */}
          <Bar
            yAxisId="calories"
            dataKey="calories"
            fill="#E60000"
            radius={[10, 10, 0, 0]}
            name="Calories brûlées (kCal)"
            barSize={7}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ActivityChart;
