export interface PatientData {
    anamnesis_link: string;
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
    payments: Payment[];
  }
  
  interface Payment {
    id: string;
    date_of_payment: Date;
    value_of_payment: string;
    payment_method: string;
    custommerId: string;
  }