import EZBizSDK from '.';

interface invoice_details {
    title: string;
    document_id: string;
    document_date: string;
    document_validity_enc_date: string;
    logo_url: string;
    lang: string;
    enterprise: {
        name: string;
        address: string;
        vat_number: string;
        phone_number: string;
        email_address: string;
        website: string;
    };
    client: {
        name: string;
        enterprise_name: string; // client name if private client
        address: string;
        vat_number: string;
    };
    data: [string, number, number, number, boolean][];
}

export default class EZInvoicesAPI {
    private __server: string;
    private __token: string;
    constructor(private sdk: EZBizSDK) {
        this.__server = sdk.invoices_server;
        this.__token = sdk.invoices_api_token;
    }

    public async createFile(details: invoice_details) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

        const { enterprise, client } = details;

        const urlencoded = new URLSearchParams();
        urlencoded.append('token', this.__token);
        urlencoded.append('title', details.title);
        urlencoded.append('i_nbr', details.document_id);
        urlencoded.append('i_date', details.document_date);
        urlencoded.append('i_end_date', details.document_validity_enc_date);
        urlencoded.append('logo', details.logo_url);
        urlencoded.append('e_name', enterprise.name);
        urlencoded.append('e_addr', enterprise.address);
        urlencoded.append('e_vat', enterprise.vat_number);
        urlencoded.append('e_phone_number', enterprise.phone_number);
        urlencoded.append('e_email', enterprise.email_address);
        urlencoded.append('e_website', enterprise.website);
        urlencoded.append('c_name', client.name);
        urlencoded.append('c_enterprise_name', client.enterprise_name);
        urlencoded.append('c_addr', client.address);
        urlencoded.append('c_vat_number', client.vat_number);
        urlencoded.append('data', JSON.stringify(details.data));

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow',
        };

        return await (
            await fetch(this.__server + '/build?lang=fr', requestOptions)
        ).json();
    }

    public get(invoice_id: string) {
        return this.sdk.GET('invoices/' + invoice_id);
    }
}
