import { Product } from './product';

// Order
export interface Order {
    shippingDetails?: any;
    product?: Product;
    orderId?: any;
    totalAmount?: any;
    time: string;
    status?: string;
    paymentMethod?: string;
    paymentStatus?: string;
    deliveryStatus?: string;
    userId: string;
    delivery_date: string;
}