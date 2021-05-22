export default class LocalStorageService {
    constructor() {
    }

    static get(key) {
        return localStorage.getItem(key)
    }

    static set(key, array) {
        return localStorage.setItem(key, JSON.stringify(array))
    }

    static parseStorageValues(key) {
        if (LocalStorageService.get(key)) {
            return JSON.parse(LocalStorageService.get(key));
        }
    }
}