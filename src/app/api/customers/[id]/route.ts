import db from "@/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const customer = await db.customer.findUnique({ where: { id } });
    return NextResponse.json(customer);
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Could not fetch customer" });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const {
    anamnesis_link,
    complete_name,
    date_of_birth,
    installments_paid,
    is_paying,
    num_sessions_done,
    num_sessions_purchased,
    number_of_installments,
    remaining_value,
    status,
    total_value,
    monthly_payment_date,
  } = await req.json();

  const id = params.id;

  try {
    const updatedCustomer = await db.customer.update({
      where: { id },
      data: {
        anamnesis_link,
        complete_name,
        date_of_birth,
        installments_paid,
        is_paying,
        num_sessions_done,
        num_sessions_purchased,
        number_of_installments,
        remaining_value,
        status,
        total_value,
        monthly_payment_date,
      },
    });

    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Could not edit customer" });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const deletedCustomer = await db.customer.delete({ where: { id } });
    return NextResponse.json(deletedCustomer);
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Could not delete customer" });
  }
}
