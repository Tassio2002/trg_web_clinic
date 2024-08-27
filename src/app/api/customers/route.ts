import { PatientData } from "@/app/types";
import db from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const customers = await db.custommer.findMany();
    return NextResponse.json(customers);
  } catch (error) {
    console.log(error);
    return NextResponse.json("Something went wrong");
  }
}

export async function POST(req: Request) {
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
  } = await req.json();

  try {
    const newCustummer = await db.custommer.create({
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
      },
    });
    console.log("Customer added");
    return NextResponse.json(newCustummer, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error});
  }
}
