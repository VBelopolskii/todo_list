export default class LocalStorageModule {
    constructor() {
    }

    static get(key) {
        return localStorage.getItem(key)
    }

    static set(key, array) {
        return localStorage.setItem(key, JSON.stringify(array))
    }

    static parseStorageValues(key, array) {
        if (LocalStorageModule.get(key)) {
            return array = JSON.parse(LocalStorageModule.get(key));
        }
    }
}