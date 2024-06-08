import {useEffect, useState} from "react";


function useLocalStorage(storageKey: string) {
    const initialLocalStorageValue = window.localStorage.getItem(storageKey);
    const [localStorageValue, updateLocalStorageValue] = useState<string | null>(initialLocalStorageValue);


    useEffect(() => {
        if (localStorageValue && localStorageValue !== initialLocalStorageValue)
            window.localStorage.setItem(storageKey, localStorageValue);
    }, [localStorageValue]);


    return ({
        localStorageValue,
        updateLocalStorageValue,
    });
}


export default useLocalStorage;
