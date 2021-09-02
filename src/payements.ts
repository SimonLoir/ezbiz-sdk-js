import EZBizSDK from '.';

export default class EZPayementsAPI {
    constructor(private sdk: EZBizSDK) {}

    public getIntent() {
        return this.sdk.POST('payements/create-payement-intent', {});
    }
}
