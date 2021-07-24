import EZCustomerAPI from './customers';
import EZInvoicesAPI from './invoices';

type Version = 'v0' | 'v1';
type Options = {
    version?: Version;
    server?: string;
};

export default class EZBizSDK {
    private __invoices: EZInvoicesAPI;
    private __customers: EZCustomerAPI;
    private __version: Version;
    private __server: string;

    constructor({ version, server }: Options) {
        this.__invoices = new EZInvoicesAPI(this);
        this.__version = version || 'v0';
        this.__server = server || 'https://ezbiz.loir.xyz/';
    }

    /**
     * Gets information about the current user (by session or access token)
     * @returns
     */
    public async me() {
        return await this.GET('me');
    }

    public async login(email: string, password: string) {
        return await this.POST('login', { email, password });
    }

    public async logout() {
        return await this.GET('logout');
    }

    public async POST(endpoint: string, data: any) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        const raw = JSON.stringify(data);
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };
        try {
            return await (
                await fetch(
                    this.__server + 'api/' + this.__version + '/' + endpoint,
                    requestOptions
                )
            ).json();
        } catch (error) {
            return {
                error: true,
                message: 'err:unknown',
            };
        }
    }

    public async GET(endpoint: string) {
        try {
            return await (
                await fetch(
                    this.__server + 'api/' + this.__version + '/' + endpoint
                )
            ).json();
        } catch (error) {
            return {
                error: true,
                message: 'err:unknown',
            };
        }
    }

    public get invoices(): EZInvoicesAPI {
        return this.__invoices;
    }

    public get customers(): EZCustomerAPI {
        return this.__customers;
    }
}
