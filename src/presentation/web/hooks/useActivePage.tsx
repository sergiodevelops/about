import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {useEffect, useState} from "react";
import {ACTIVE_PAGE} from "../../../constants/pages";
import {setActivePage} from "../reducers/activePage";


function useActivePage() {
    const dispatch = useAppDispatch();
    const activePage = useAppSelector(state => state.activePage);

    const [currentActivePage, setCurrentActivePage] = useState<ACTIVE_PAGE>(activePage.value);

    const updateActivePageOnStore = (page: ACTIVE_PAGE) => dispatch(setActivePage(page));


    useEffect(() => {
        setCurrentActivePage(activePage.value)
    }, [activePage.value]);


    return ({
        currentActivePage,
        updateActivePageOnStore,
    })
}


export default useActivePage;
