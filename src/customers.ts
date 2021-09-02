import EZBizSDK from '.';

export default class EZCustomerAPI {
    constructor(private sdk: EZBizSDK) {}

    /**
     * @returns The list of customers of the enterprise
     */
    public list() {
        return this.sdk.GET('customers');
    }
}
