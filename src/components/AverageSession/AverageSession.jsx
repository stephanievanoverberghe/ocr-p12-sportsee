import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserAverageSession } from '../../services/dataService';
import {
  LineChart as RechartsLineChart,
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
        <RechartsLineChart
          data={averageSessions}
          margin={{ top: 0, right: 10, left: 10, bottom: 10 }}
        >
          <defs>
            <linearGradient id="lineGradient">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="30%" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="100%" />
            </linearGradient>
          </defs>
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
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#FFFFFF', fillOpacity: '75%' }}
            stroke="white"
            style={{ fontSize: '12px', opacity: 0.8 }}
          />
          <YAxis hide={true} domain={['dataMin - 20', 'dataMax + 50']} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={<CustomCursor width={40} />}
          />
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
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AverageSession;
