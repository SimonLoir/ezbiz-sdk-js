import EZBizSDK from '.';

export default class EZCustomerAPI {
    constructor(private sdk: EZBizSDK) {}

    /**
     * @returns The list of customers of the enterprise
     */
    public list() {
        return this.sdk.GET('customers');
    }

    /**
     * Gets data about a specific customer.
     * @param customer_email The email address of the requested customer.
     * @returns The data about the specified customer.
     */
    public get(customer_email: string) {
        return this.sdk.GET('customers/' + customer_email);
    }
}
