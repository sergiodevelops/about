import {ACTIVE_PAGE} from "../../../constants/pages";


export const getClassNameItemMenu = (props: {
    isActive: boolean,
    isPending: boolean,
    page: ACTIVE_PAGE,
    currentActivePage: ACTIVE_PAGE,
}) => {
    const {isActive, isPending, page, currentActivePage} = props;
    let classNameItemMenu = `menu-item-XS `;
    classNameItemMenu += isPending ? "pending" : isActive || page === currentActivePage ? "active" : "";

    return classNameItemMenu;
}
