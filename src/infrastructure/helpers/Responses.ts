import { RESPONSES } from "constants/statusCodes";


export const backToLoginPage = () => {
    localStorage.removeItem('sessionUserId');
    localStorage.removeItem('sessionUserRoles');
    window.location.href = "/login";
}

export const getRespJson = (resp: Promise<Response>) => resp.then((resp) => resp.json());

const getRespOk = (resp: Response) => resp.ok;

export const checkResp = async(resp: Response): Promise<Response> => {
    if (checkUnauthorization(resp.status)) backToLoginPage();
    if (!getRespOk(resp)) throw Error(await getMessageByStatusCode(resp));

    return resp;
}

export const getUrlWithParams = (url: string | URL, queryParams: any): string => {
    let endpoint = typeof(url) === "string" ? new URL(url) : url;
    Object.keys(queryParams).forEach(key => {
        const hasKey = queryParams[key] !== undefined && queryParams[key] !== "";
        if (hasKey) endpoint.searchParams.append(key, String(queryParams[key]));
    });

    return String(endpoint);
};

export const throwError = (error: Error) => {
    if (error.name === "AbortError") throw error;
    throw Error(error.message);
}

const checkUnauthorization = (status: number) =>
    status === RESPONSES.MISSING_DATA_OR_NOT_SUFFICIENT_FOR_AUTHENTICATION;

const getHiddenText = async(resp: Response) => resp.text();

const getMessageByStatusCode = async (resp: Response): Promise<string> => {
    const {status: code} = resp;

    switch (code) {
        case RESPONSES.RESOURCE_NOT_AUTORIZED_ROL:
            return "Ud. no tiene los permisos necesarios para completar esta acción, por favor contáctese con el Administrador.";
        case RESPONSES.RESPONSE_FORMAT_NOT_ACCEPTED:
            return String(code);
        default:
            return `Error: ${code} | "${JSON.parse(await getHiddenText(resp)).detail}"`;
    }
}
