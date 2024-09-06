import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const PieChart = ({ targetPercentage, duration = 1000 }) => {


    const isDark = useSelector((state) => state.toggle.isChecked);

    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment = targetPercentage / (duration / 10);

        const timer = setInterval(() => {
            start += increment;
            if (start >= targetPercentage) {
                start = targetPercentage;
                clearInterval(timer);
            }
            setPercentage(Math.round(start));
        }, 10);

        return () => clearInterval(timer);
    }, [targetPercentage, duration]);

    return (
        <div style={{ width: '150px', height: '150px' }}>
            <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                    pathColor: `#764fe3`, // Set your desired color here
                    textColor: isDark ? '#ffffff' : '#000000',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#ffffff',
                })}
            />
        </div>
    );
};

export default PieChart;
