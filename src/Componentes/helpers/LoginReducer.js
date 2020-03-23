export const initialState = localStorage.getItem('perfil') ? JSON.parse(localStorage.getItem('perfil')) :
    {
        id_usuarios: '',
        name: '',
        avatar: '',
        correo: '',
        nickname: '',
        cargo: ''
    }


export function loginFunctionReducer(state, [action, payload]) {
    switch (action) {
        case 'login':
            return payload;

        default:
            return state;
    }
}