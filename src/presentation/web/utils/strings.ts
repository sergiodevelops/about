import {FILE_TYPE, FILE_TYPES} from "../../../constants/fileTypes";


export const getFilePulicUrl = (props: {
    fileName: string,
    fileType?: FILE_TYPE,
    subUrl?: string,
}): string => process.env.PUBLIC_URL +
    `/${props.subUrl || ''}`+
    `${props.fileName}`+
    `.${props.fileType || FILE_TYPES.PNG}`;
