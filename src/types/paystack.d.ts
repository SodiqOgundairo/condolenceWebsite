declare module '@paystack/inline-js' {
  interface PaystackTransactionOptions {
    key: string;
    amount: number;
    email: string;
    firstname?: string;
    lastname?: string;
    metadata?: {
      custom_fields?: Array<{
        display_name: string;
        variable_name: string;
        value: string;
      }>;
      [key: string]: any;
    };
    onSuccess?: (transaction: any) => void;
    onCancel?: () => void;
    onError?: (error: any) => void;
  }

  export default class PaystackPop {
    constructor();
    newTransaction(options: PaystackTransactionOptions): Promise<void>;
  }
}
