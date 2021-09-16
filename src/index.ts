import EZCustomerAPI from './customers';
import EZInvoicesAPI from './invoices';
import EZPayementsAPI from './payements';

export type EZBizVersion = 'v0' | 'v1';
export type EZBizOptions = {
    version?: EZBizVersion;
    server?: string;
    invoices_server?: string;
    invoices_api_token?: string;
};

export default class EZBizSDK {
    private __invoices: EZInvoicesAPI;
    private __customers: EZCustomerAPI;
    private __payements: EZPayementsAPI;
    private __version: EZBizVersion;
    private __server: string;
    private __invoices_api_token: string;
    private __invoices_server: string;

    constructor({
        version,
        server,
        invoices_server,
        invoices_api_token,
    }: EZBizOptions) {
        this.__version = version || 'v0';
        this.__server = server || 'https://ezbiz.be/';
        this.__invoices_server = invoices_server || 'https://invoice.ezbiz.be';
        this.__invoices_api_token = invoices_api_token || '<TOKEN>';
        this.__invoices = new EZInvoicesAPI(this);
        this.__customers = new EZCustomerAPI(this);
        this.__payements = new EZPayementsAPI(this);
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
        const raw = JSON.stringify(data);
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: raw,
            redirect: 'follow',
        };
        try {
            let res = await fetch(
                this.__server + 'api/' + this.__version + '/' + endpoint,
                requestOptions
            );
            return await res.json();
        } catch (error) {
            console.log(error);
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

    public get invoices_server(): string {
        return this.__invoices_server;
    }

    public get invoices_api_token(): string {
        return this.__invoices_api_token;
    }

    public get payements() {
        return this.__payements;
    }
}
