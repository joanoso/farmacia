
export function detectCloseTab(store): void {
    window.addEventListener('beforeunload', (ev) => {
        // Todo Cerrar sesion en servidor!!

        // if (_.get(store.getState(), 'auth.isAuthenticated', false)) {
        //     store.dispatch(authenticateEnd());
        //     axios.get('logout')
        //         .catch((e) => console.log(e));
        // }

    });
}
