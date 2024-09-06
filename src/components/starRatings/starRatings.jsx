import React from 'react';

const StarRating = ({ rating, height, width }) => {
    const fullStars = Math.floor(rating / 20); // Number of full stars (each star represents 20%)
    const hasHalfStar = rating % 20 >= 10; // Check if there is a half star
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Calculate the number of empty stars

    // Create an array to represent the stars
    const stars = [
        ...Array(fullStars).fill('full'),
        ...(hasHalfStar ? ['half'] : []),
        ...Array(emptyStars).fill('empty'),
    ];

    return (
        <div style={{ display: 'flex' }}>
            {stars.map((star, index) => (
                <Star height={height} width={width} key={index} type={star} />
            ))}
        </div>
    );
};

const Star = ({ type, height, width }) => {
    // Choose the color based on the star type
    const color = type === 'full' ? '#FFD700' : type === 'half' ? 'linear-gradient(90deg, #FFD700 50%, #ccc 50%)' : '#ccc';

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill={type === 'half' ? 'url(#half-gradient)' : color}
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: '4px' }}
        >
            <defs>
                <linearGradient id="half-gradient">
                    <stop offset="50%" stopColor="#FFD700" />
                    <stop offset="50%" stopColor="#ccc" />
                </linearGradient>
            </defs>
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
    );
};

export default StarRating;


