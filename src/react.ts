import { useEffect, useState } from 'react';
import EZBizSDK from '.';

export default class EZBizReactSDK extends EZBizSDK {
    public useCustomerData(email: string) {
        const [error, setError] = useState('');
        const [d, setData] = useState<customer>();

        useEffect(() => {
            const fetch = async () => {
                try {
                    let result = await this.customers.get(email);

                    if (result.error) return setError(result.error);

                    setData(result.data[0]);
                } catch (error) {
                    setError(error);
                }
            };
            fetch();
        }, [email]);

        return { error, customer: d };
    }
}
