
const useLocalStorage = () => {

    const removeStorage = (key) => {
        return localStorage.removeItem(key)
    }

    const getStorage = (key) => {
        return localStorage.getItem(key)
    }

    const setStorage = (key, value) => {
        return localStorage.setItem(key, String(value))
    }

    return { removeStorage, getStorage, setStorage }
}


export { useLocalStorage }
