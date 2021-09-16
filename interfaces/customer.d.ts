declare interface customer {
    enterprise: number;
    email: string;
    name: string;
    enterprise_name: string;
    vat_number: string;
    internal_client_id: string | null;
    stripe_customer_id: string | null;
}
