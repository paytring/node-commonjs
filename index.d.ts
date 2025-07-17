declare module "commonjs-sdk" {
  export interface OrderData {
    cname: string;
    email: string;
    phone: number;
    amount: number;
    receiptId: string;
    callbackUrl: string;
    notes?: Record<string, any>;
  }

  export interface OrderResponse {
    id: string;
    status: string;
    payment_url: string;
    amount: number;
    receiptId: string;
    cname: string;
    email: string;
    phone: number;
    callbackUrl: string;
    created_at: string;
    updated_at: string;
  }

  export interface VpaValidationResponse {
    valid: boolean;
    name?: string;
    message?: string;
  }

  export interface HashVerification {
    verify(data: Record<string, any>, secret: string, hash: string): boolean;
  }

  export interface OrderMethods {
    create(orderData: OrderData): Promise<OrderResponse>;
    fetch(orderId: string): Promise<OrderResponse>;
    fetchAdvance(orderId: string): Promise<OrderResponse>;
  }

  export interface VpaMethods {
    validate(vpa: string): Promise<VpaValidationResponse>;
  }

  export interface UpiMethods {
    vpa: VpaMethods;
  }

  export default class Paytring {
    constructor(apiKey: string, apiSecret: string);

    order: OrderMethods;
    upi: UpiMethods;
    hash: HashVerification;
  }

  export = Paytring;
}
