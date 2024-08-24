import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import db from "@/db/index";
  import type { leads } from "../../node_modules/@prisma/client/default";

  export default async function LeadsList() {
    const leads = await db.leads.findMany();
    
    return (
      <Table>
        <TableCaption>A list of Leads.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nome</TableHead>
            <TableHead>Data de nascimento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead: leads) => (
            <TableRow key={lead.id}>
              <TableCell className="font-medium">{lead.complete_name}</TableCell>
              <TableCell>{lead.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total de leads</TableCell>
            <TableCell className="text-right">{leads.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
  