import {
    getUserById,
    getUserActivityById,
    getUserAverageSession,
    getUserPerformance,
} from './mockData';
import { USE_MOCK_DATA } from '../config';

// Fonctions pour récupérer les données mockées
export const fetchMockUserData = (userId) => {
    try {
        return getUserById(userId);
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

export const fetchMockUserActivity = (userId) => {
    try {
        return getUserActivityById(userId);
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

export const fetchMockUserAverageSession = (userId) => {
    try {
        return getUserAverageSession(userId);
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

export const fetchMockUserPerformance = (userId) => {
    try {
        return getUserPerformance(userId);
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

// Fonctions pour récupérer les données réelles via l'API
export const fetchRealUserData = async (userId) => {
    try {
        const response = await fetch(`http://localhost:3000/user/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

export const fetchRealUserActivity = async (userId) => {
    try {
        const response = await fetch(`http://localhost:3000/user/${userId}/activity`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

export const fetchRealUserAverageSession = async (userId) => {
    try {
        const response = await fetch(`http://localhost:3000/user/${userId}/average-sessions`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

export const fetchRealUserPerformance = async (userId) => {
    try {
        const response = await fetch(`http://localhost:3000/user/${userId}/performance`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

// Fonctions principales pour choisir entre mock et API
export const fetchUserData = (userId) => {
    return USE_MOCK_DATA ? fetchMockUserData(userId) : fetchRealUserData(userId);
};

export const fetchUserActivity = (userId) => {
    return USE_MOCK_DATA ? fetchMockUserActivity(userId) : fetchRealUserActivity(userId);
};

export const fetchUserAverageSession = (userId) => {
    return USE_MOCK_DATA ? fetchMockUserAverageSession(userId) : fetchRealUserAverageSession(userId);
};

export const fetchUserPerformance = (userId) => {
    return USE_MOCK_DATA ? fetchMockUserPerformance(userId) : fetchRealUserPerformance(userId);
};
