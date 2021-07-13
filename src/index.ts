export default class EZBizSDK {
    constructor(
        private version: 'v0' | 'v1' = 'v0',
        private server = 'https://ezbiz.sloir.xyz/'
    ) {}

    public async login(email: string, password: string) {
        return await this.POST('login', { email, password });
    }

    public async logout() {
        return await this.GET('logout');
    }

    private async POST(endpoint: string, data: any) {
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
                    this.server + 'api/' + this.version + '/' + endpoint,
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

    private async GET(endpoint: string) {
        try {
            return await (
                await fetch(
                    this.server + 'api/' + this.version + '/' + endpoint
                )
            ).json();
        } catch (error) {
            return {
                error: true,
                message: 'err:unknown',
            };
        }
    }
}
