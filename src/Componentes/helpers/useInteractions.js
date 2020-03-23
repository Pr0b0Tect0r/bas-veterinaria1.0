// import React from 'react';
// import appInteraction from './appInteraction';
// import { AuthTokenRequest } from '../helpers/AxiosInstance';

// const useInteractions = () => {
// 	const [actions, setActions] = React.useContext(appInteraction);

// 	function isFormContent(currentComponent, formName, funcion) {
// 		if (actions.formContent.path !== currentComponent) {
// 			setActions(prevState => ({ ...prevState, formContent: { path: currentComponent, funciones: funcion } }));
// 			if (formName === 'inicio') {

// 			} else {
// 				AuthTokenRequest.post('acciones', { form: formName })
// 					.then(result => {
// 						setActions(actions => ({ ...actions, acciones: result.data }));
// 					})
// 			}
// 		}
// 	}

// 	return {
// 		isFormContent
// 	}
// };

// export default useInteractions;