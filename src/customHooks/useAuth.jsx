// hooks/useAuth.js
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const navigate = useNavigate();
    const token = true; // Adjust this based on where you store the token

    if (!token) {
        navigate('/login');
    }

    return token;
};

export default useAuth;
