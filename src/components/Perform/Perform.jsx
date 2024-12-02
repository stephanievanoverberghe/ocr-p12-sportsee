import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserPerformance } from '../../services/dataService';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';
import styles from './Perform.module.scss';

const kindTranslation = {
  cardio: 'Cardio',
  energy: 'Énergie',
  endurance: 'Endurance',
  strength: 'Force',
  speed: 'Vitesse',
  intensity: 'Intensité',
};

const getResponsiveStyles = () => {
  const width = window.innerWidth;
  if (width >= 1300) {
    return { fontSize: '10px', outerRadius: '70%' };
  } else if (width >= 1200) {
    return { fontSize: '10px', outerRadius: '60%' };
  } else if (width >= 1050) {
    return { fontSize: '10px', outerRadius: '65%' };
  } else {
    return { fontSize: '10px', outerRadius: '60%' };
  }
};

function Perform() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [performanceData, setPerformanceData] = useState([]);
  const [responsiveStyles, setResponsiveStyles] = useState(
    getResponsiveStyles()
  );

  useEffect(() => {
    const handleResize = () => {
      setResponsiveStyles(getResponsiveStyles());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const userId = parseInt(id, 10);
      const data = await fetchUserPerformance(userId, navigate);

      if (data) {
        const formattedData = data.data
          .map((item) => ({
            subject: kindTranslation[data.kind[item.kind]],
            value: item.value,
          }))
          .reverse();
        setPerformanceData(formattedData);
      }
    };

    fetchData();
  }, [id, navigate]);

  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={performanceData}
          outerRadius={responsiveStyles.outerRadius}
        >
          <PolarGrid radialLines={false} stroke="#FFFFFF" />
          <PolarAngleAxis
            dataKey="subject"
            tickLine={false}
            stroke="#FFFFFF"
            style={{ fontSize: responsiveStyles.fontSize }}
          />
          <Radar
            name="Performance"
            dataKey="value"
            stroke="#FF0101"
            fill="#FF0101"
            fillOpacity={0.8}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Perform;
