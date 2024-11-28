import {
    getUserById,
    getUserActivityById,
    getUserAverageSession,
    getUserPerformance,
} from './mockData';
import { USE_MOCK_DATA } from '../config';

/** Gestion des données mockées avec redirection */
const fetchMockData = (fetchFunction, userId, type, navigate) => {
    try {
        const data = fetchFunction(userId);
        if (!data) {
            console.warn(`Données mockées : ${type} introuvables pour l'utilisateur avec ID ${userId}`);
            if (navigate) navigate('/404', { replace: true });
            return null;
        }
        return data;
    } catch (error) {
        console.warn(`Données mockées : Impossible de récupérer ${type} pour l'utilisateur avec ID ${userId}`);
        if (navigate) navigate('/404', { replace: true });
        return null;
    }
};

/** Gestion des données réelles via l'API avec redirection */
const fetchRealData = async (endpoint, userId, type, navigate) => {
    try {
        const response = await fetch(`http://localhost:3000/user/${userId}${endpoint}`);
        if (response.status === 404) {
            console.warn(`Erreur API : ${type} pour l'utilisateur ${userId} introuvable`);
            if (navigate) navigate('/404', { replace: true });
            return null;
        }
        if (!response.ok) {
            console.warn(`Erreur API : Statut ${response.status} pour ${type} de l'utilisateur ${userId}`);
            return null;
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(`Erreur réseau ou API pour ${type} de l'utilisateur ${userId}`, error.message);
        if (navigate) navigate('/404', { replace: true });
        return null;
    }
};

/** Choix entre données mockées et réelles */
export const fetchUserData = async (userId, navigate) => {
    return USE_MOCK_DATA
        ? fetchMockData(getUserById, userId, "les données utilisateur", navigate)
        : await fetchRealData('', userId, "les données utilisateur", navigate);
};

export const fetchUserActivity = async (userId, navigate) => {
    return USE_MOCK_DATA
        ? fetchMockData(getUserActivityById, userId, 'les activités', navigate)
        : await fetchRealData('/activity', userId, 'les activités', navigate);
};

export const fetchUserAverageSession = async (userId, navigate) => {
    return USE_MOCK_DATA
        ? fetchMockData(getUserAverageSession, userId, "les sessions moyennes", navigate)
        : await fetchRealData('/average-sessions', userId, "les sessions moyennes", navigate);
};

export const fetchUserPerformance = async (userId, navigate) => {
    return USE_MOCK_DATA
        ? fetchMockData(getUserPerformance, userId, "les performances", navigate)
        : await fetchRealData('/performance', userId, "les performances", navigate);
};

export const fetchUserKeyData = async (userId, navigate) => {
    const userData = USE_MOCK_DATA
        ? fetchMockData(getUserById, userId, "les chiffres clés", navigate)
        : await fetchRealData('', userId, "les chiffres clés", navigate);

    if (userData) {
        return userData.keyData;
    }
    return null;
};

