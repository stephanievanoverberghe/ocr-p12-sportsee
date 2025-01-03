/**
 * Données principales des utilisateurs.
 * Contient des informations générales sur l'utilisateur et ses statistiques principales.
 * 
 * @constant {Array<Object>} USER_MAIN_DATA
 */
export const USER_MAIN_DATA = [
    {
        id: 12,
        userInfos: {
            firstName: 'Karl',
            lastName: 'Dovineau',
            age: 31,
        },
        todayScore: 0.12,
        keyData: {
            calorieCount: 1930,
            proteinCount: 155,
            carbohydrateCount: 290,
            lipidCount: 50,
        },
    },
    {
        id: 18,
        userInfos: {
            firstName: 'Cecilia',
            lastName: 'Ratorez',
            age: 34,
        },
        score: 0.3,
        keyData: {
            calorieCount: 2500,
            proteinCount: 90,
            carbohydrateCount: 150,
            lipidCount: 120,
        },
    },
];

/**
 * Données d'activités quotidiennes des utilisateurs.
 * Comprend les informations sur le poids et les calories brûlées chaque jour.
 * 
 * @constant {Array<Object>} USER_ACTIVITY
 */
export const USER_ACTIVITY = [
    {
        userId: 12,
        sessions: [
            {
                day: '2020-07-01',
                kilogram: 80,
                calories: 240
            },
            {
                day: '2020-07-02',
                kilogram: 80,
                calories: 220
            },
            {
                day: '2020-07-03',
                kilogram: 81,
                calories: 280
            },
            {
                day: '2020-07-04',
                kilogram: 81,
                calories: 290
            },
            {
                day: '2020-07-05',
                kilogram: 80,
                calories: 160
            },
            {
                day: '2020-07-06',
                kilogram: 78,
                calories: 162
            },
            {
                day: '2020-07-07',
                kilogram: 76,
                calories: 390
            }
        ]
    },
    {
        userId: 18,
        sessions: [
            {
                day: '2020-07-01',
                kilogram: 70,
                calories: 240
            },
            {
                day: '2020-07-02',
                kilogram: 69,
                calories: 220
            },
            {
                day: '2020-07-03',
                kilogram: 70,
                calories: 280
            },
            {
                day: '2020-07-04',
                kilogram: 70,
                calories: 500
            },
            {
                day: '2020-07-05',
                kilogram: 69,
                calories: 160
            },
            {
                day: '2020-07-06',
                kilogram: 69,
                calories: 162
            },
            {
                day: '2020-07-07',
                kilogram: 69,
                calories: 390
            }
        ]
    }];

/**
* Durée moyenne des sessions par jour pour les utilisateurs.
* 
* @constant {Array<Object>} USER_AVERAGE_SESSIONS
*/
export const USER_AVERAGE_SESSIONS = [
    {
        userId: 12,
        sessions: [
            {
                day: 1,
                sessionLength: 30
            },
            {
                day: 2,
                sessionLength: 23
            },
            {
                day: 3,
                sessionLength: 45
            },
            {
                day: 4,
                sessionLength: 50
            },
            {
                day: 5,
                sessionLength: 0
            },
            {
                day: 6,
                sessionLength: 0
            },
            {
                day: 7,
                sessionLength: 60
            }
        ]
    },
    {
        userId: 18,
        sessions: [
            {
                day: 1,
                sessionLength: 30
            },
            {
                day: 2,
                sessionLength: 40
            },
            {
                day: 3,
                sessionLength: 50
            },
            {
                day: 4,
                sessionLength: 30
            },
            {
                day: 5,
                sessionLength: 30
            },
            {
                day: 6,
                sessionLength: 50
            },
            {
                day: 7,
                sessionLength: 50
            }
        ]
    }
];

/**
 * Données de performance des utilisateurs.
 * Contient les types d'activités et leurs scores associés.
 * 
 * @constant {Array<Object>} USER_PERFORMANCE
 */
export const USER_PERFORMANCE = [
    {
        userId: 12,
        kind: {
            1: 'cardio',
            2: 'energy',
            3: 'endurance',
            4: 'strength',
            5: 'speed',
            6: 'intensity'
        },
        data: [
            {
                value: 80,
                kind: 1
            },
            {
                value: 120,
                kind: 2
            },
            {
                value: 140,
                kind: 3
            },
            {
                value: 50,
                kind: 4
            },
            {
                value: 200,
                kind: 5
            },
            {
                value: 90,
                kind: 6
            }
        ]
    },
    {
        userId: 18,
        kind: {
            1: 'cardio',
            2: 'energy',
            3: 'endurance',
            4: 'strength',
            5: 'speed',
            6: 'intensity'
        },
        data: [
            {
                value: 200,
                kind: 1
            },
            {
                value: 240,
                kind: 2
            },
            {
                value: 80,
                kind: 3
            },
            {
                value: 80,
                kind: 4
            },
            {
                value: 220,
                kind: 5
            },
            {
                value: 110,
                kind: 6
            }
        ]
    }
];

/**
 * Récupère les données principales d'un utilisateur à partir de son ID.
 * 
 * @function
 * @param {number} id - ID de l'utilisateur.
 * @returns {Object} - Données principales de l'utilisateur.
 * @throws {Error} - Si l'utilisateur n'est pas trouvé.
 */
export const getUserById = (id) => {
    const user = USER_MAIN_DATA.find((user) => user.id === id);
    if (!user) {
        throw new Error(`User with ID ${id} not found`);
    }

    return {
        ...user,
        score: user.todayScore || user.score,
    };
};

/**
 * Récupère les données d'activités quotidiennes d'un utilisateur à partir de son ID.
 * 
 * @function
 * @param {number} id - ID de l'utilisateur.
 * @returns {Object} - Données d'activités de l'utilisateur.
 * @throws {Error} - Si l'utilisateur n'est pas trouvé.
 */
export const getUserActivityById = (id) => {
    const user = USER_ACTIVITY.find((activity) => activity.userId === id);
    if (!user) {
        throw new Error(`User with ID ${id} not found`);
    }
    return user;
}

/**
 * Récupère la durée moyenne des sessions d'un utilisateur à partir de son ID.
 * 
 * @function
 * @param {number} id - ID de l'utilisateur.
 * @returns {Object} - Données de durée moyenne des sessions de l'utilisateur.
 * @throws {Error} - Si l'utilisateur n'est pas trouvé.
 */
export const getUserAverageSession = (id) => {
    const user = USER_AVERAGE_SESSIONS.find((session) => session.userId === id);
    if (!user) {
        throw new Error(`User with ID ${id} not found`);
    }
    return user;
}

/**
 * Récupère les performances d'un utilisateur à partir de son ID.
 * 
 * @function
 * @param {number} id - ID de l'utilisateur.
 * @returns {Object} - Données de performance de l'utilisateur.
 * @throws {Error} - Si l'utilisateur n'est pas trouvé.
 */
export const getUserPerformance = (id) => {
    const user = USER_PERFORMANCE.find((performance) => performance.userId === id);
    if (!user) {
        throw new Error(`User with ID ${id} not found`);
    }
    return user;
}