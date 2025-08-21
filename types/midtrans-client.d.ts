declare module "midtrans-client" {
  export interface MidtransConfig {
    isProduction: boolean;
    serverKey: string;
    clientKey: string;
  }

  export class Snap {
    constructor(config: MidtransConfig);
    createTransaction(params: Record<string>): Promise<>;
    createTransactionToken(params: Record<string>): Promise<string>;
    createTransactionRedirectUrl(params: Record<string>): Promise<string>;
  }

  export class CoreApi {
    constructor(config: MidtransConfig);
    charge(params: Record<string>): Promise<>;
    capture(params: Record<string>): Promise<>;
    cardToken(params: Record<string>): Promise<>;
  }

  const midtransClient: {
    Snap: typeof Snap;
    CoreApi: typeof CoreApi;
  };

  export default midtransClient;
}
