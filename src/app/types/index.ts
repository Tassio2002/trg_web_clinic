export type TCustomer = {
    id: string; 
    anamnesis_link?: string; 
    complete_name: string;
    date_of_birth: Date; 
    installments_paid: number;
    is_paying: boolean;
    num_sessions_done: number;
    num_sessions_purchased: number;
    number_of_installments: number;
    remaining_value: number;
    status: string;
    total_value: number;
    monthly_payment_date: number; 
    payments: TPayment[];
  }

export type TPayment = {
  id: string; 
  date_of_payment: Date; 
  payment_method: string;
  value_of_payment: number; 
  customer?: TCustomer; 
  customerId?: string;
}