import { injectable } from 'inversify';
import env from '@beam-australia/react-env';
import { checkResp, getRespJson, throwError } from 'infrastructure/helpers/Responses';
import Authentication from 'infrastructure/repositories/authentication/Authentication';
import INewEntity from 'application/repositories/INewEntity';
import NewEntity from 'domain/newEntity/NewEntity';

@injectable()
export default class NewEntityMyRepositoryNameDBRepository extends Authentication implements INewEntity {
    private static readonly MY_REPOSITORY_NAME_API_DB_URL: string = env('GATEWAY_URL') || 'http://localhost:9999';
    private static readonly MY_REPOSITORY_NAME_API_DB_RESOURCE: string = 'newEntity';

    private readonly api_url: string;
    private readonly headers: Headers;

    constructor() {
        super();
        this.api_url = NewEntityMyRepositoryNameDBRepository.MY_REPOSITORY_NAME_API_DB_URL;
        this.headers = new Headers();
        this.headers.set('Content-Type', 'application/json');
    }
}
