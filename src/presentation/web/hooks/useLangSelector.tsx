import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {useEffect, useState} from "react";
import {LANG_CODE, LANG_EN} from "../../../constants/languages";
import {setCurrentLang} from "../reducers/langSelector";
import useLocalStorage from "./useLocalStorage";
import {LOCAL_STORAGE_KEYS} from "../../../constants/localStorageKeys";


function useLangSelector() {
    const {localStorageValue, updateLocalStorageValue} = useLocalStorage(LOCAL_STORAGE_KEYS.LANGUAGE);
    const dispatch = useAppDispatch();
    const langSelector = useAppSelector(state => state.langSelector);

    const [currentLang, updateCurrentLang] = useState<LANG_CODE>(LANG_EN);


    useEffect(() => {
        if (localStorageValue) updateCurrentLang(localStorageValue as LANG_CODE);
    }, []);

    useEffect(() => {
        updateLocalStorageValue((prevState: string | null) =>
            prevState !== currentLang ? currentLang : prevState);
        updateLangOnReduxStore();
    }, [currentLang]);


    const updateLangOnReduxStore = () => dispatch(setCurrentLang(currentLang));


    return ({
        currentLang: langSelector.value,
        updateCurrentLang,
    })
}


export default useLangSelector;
