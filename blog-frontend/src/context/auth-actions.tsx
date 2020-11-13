export enum ActionTypes {
    AUTHORIZED = 'AUTHORIZED',
    UNAUTHORIZED = 'UNAUTHORIZED',
    CURRENTUSER = 'CURRENTUSER'
}

export const authorizedAction = () => ({
    type: ActionTypes.AUTHORIZED
});

export const unauthorizedAction = () => ({
    type: ActionTypes.UNAUTHORIZED
});

// export const currentUser = () => ({
//     type: ActionTypes.CURRENTUSER
// })