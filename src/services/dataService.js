import {
    getUserById,
    getUserActivityById,
    getUserAverageSession,
    getUserPerformance,
} from './mockData';
import { USE_MOCK_DATA } from '../config';

/**
 * Gestion des données mockées avec redirection en cas d'erreur.
 *
 * @function
 * @param {Function} fetchFunction - Fonction permettant de récupérer les données mockées.
 * @param {number} userId - ID de l'utilisateur.
 * @param {string} type - Type des données à récupérer (e.g., "activités", "performances").
 * @param {Function} [navigate] - Fonction de navigation pour rediriger en cas d'erreur.
 * @returns {Object|null} - Données mockées récupérées ou null en cas d'erreur.
 */
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

/**
 * Gestion des données réelles via l'API avec redirection en cas d'erreur.
 *
 * @async
 * @function
 * @param {string} endpoint - Chemin de l'endpoint de l'API.
 * @param {number} userId - ID de l'utilisateur.
 * @param {string} type - Type des données à récupérer (e.g., "activités", "performances").
 * @param {Function} [navigate] - Fonction de navigation pour rediriger en cas d'erreur.
 * @returns {Object|null} - Données récupérées depuis l'API ou null en cas d'erreur.
 */
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

/**
 * Récupère les données utilisateur (mockées ou réelles) en fonction de la configuration.
 *
 * @async
 * @function
 * @param {number} userId - ID de l'utilisateur.
 * @param {Function} [navigate] - Fonction de navigation pour rediriger en cas d'erreur.
 * @returns {Object|null} - Données utilisateur ou null en cas d'erreur.
 */
export const fetchUserData = async (userId, navigate) => {
    return USE_MOCK_DATA
        ? fetchMockData(getUserById, userId, "les données utilisateur", navigate)
        : await fetchRealData('', userId, "les données utilisateur", navigate);
};

/**
 * Récupère les données d'activités utilisateur (mockées ou réelles) en fonction de la configuration.
 *
 * @async
 * @function
 * @param {number} userId - ID de l'utilisateur.
 * @param {Function} [navigate] - Fonction de navigation pour rediriger en cas d'erreur.
 * @returns {Object|null} - Données d'activités utilisateur ou null en cas d'erreur.
 */
export const fetchUserActivity = async (userId, navigate) => {
    return USE_MOCK_DATA
        ? fetchMockData(getUserActivityById, userId, 'les activités', navigate)
        : await fetchRealData('/activity', userId, 'les activités', navigate);
};

/**
 * Récupère les données de sessions moyennes utilisateur (mockées ou réelles).
 *
 * @async
 * @function
 * @param {number} userId - ID de l'utilisateur.
 * @param {Function} [navigate] - Fonction de navigation pour rediriger en cas d'erreur.
 * @returns {Object|null} - Données des sessions moyennes ou null en cas d'erreur.
 */
export const fetchUserAverageSession = async (userId, navigate) => {
    return USE_MOCK_DATA
        ? fetchMockData(getUserAverageSession, userId, "les sessions moyennes", navigate)
        : await fetchRealData('/average-sessions', userId, "les sessions moyennes", navigate);
};

/**
 * Récupère les performances utilisateur (mockées ou réelles).
 *
 * @async
 * @function
 * @param {number} userId - ID de l'utilisateur.
 * @param {Function} [navigate] - Fonction de navigation pour rediriger en cas d'erreur.
 * @returns {Object|null} - Données de performances ou null en cas d'erreur.
 */
export const fetchUserPerformance = async (userId, navigate) => {
    return USE_MOCK_DATA
        ? fetchMockData(getUserPerformance, userId, "les performances", navigate)
        : await fetchRealData('/performance', userId, "les performances", navigate);
};

/**
 * Récupère les données clés utilisateur (mockées ou réelles).
 *
 * @async
 * @function
 * @param {number} userId - ID de l'utilisateur.
 * @param {Function} [navigate] - Fonction de navigation pour rediriger en cas d'erreur.
 * @returns {Object|null} - Données clés de l'utilisateur ou null en cas d'erreur.
 */
export const fetchUserKeyData = async (userId, navigate) => {
    const userData = USE_MOCK_DATA
        ? fetchMockData(getUserById, userId, "les chiffres clés", navigate)
        : await fetchRealData('', userId, "les chiffres clés", navigate);

    if (userData) {
        return userData.keyData;
    }
    return null;
};

