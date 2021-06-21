import { createBrowserHistory } from 'history';


// This is a custom helper function that enables redirecting 
// users from outside React components(for example: from userActions)
export const history = createBrowserHistory();