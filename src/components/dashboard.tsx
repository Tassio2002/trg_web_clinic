import Link from "../../node_modules/next/link";
import { TbPigMoney } from "react-icons/tb";
import { GoPeople } from "react-icons/go";
import { GoArrowUpRight } from "react-icons/go";
import { CiBookmarkPlus, CiBookmarkCheck } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TCustomer } from "@/app/types";
import { FormatCurrency } from "../../utils/formatCurrency";

const getCustomers = async (): Promise<TCustomer[] | null> => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/customers`);

    if (res.ok) {
      const customers = res.json();

      return customers;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export async function Dashboard() {
  const customers = await getCustomers();

  const installmentPerCustommer: number[] | undefined = customers?.map(
    (customer) => {
      return customer.total_value / customer.number_of_installments;
    }
  );

  const totalValueMounth =
    installmentPerCustommer?.reduce(
      (acc, installment) => acc + installment,
      0
    ) ?? 0;
  const totalValueMounthFormated = FormatCurrency(totalValueMounth);
  const customersQuantity = customers?.length;
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Valor a receber no mês
              </CardTitle>
              <TbPigMoney className="text-2xl stroke-[1px]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalValueMounthFormated}
              </div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de clientes
              </CardTitle>
              <GoPeople className="text-xl" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customersQuantity}</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Sessões experimentais
              </CardTitle>
              <CiBookmarkPlus className="text-xl" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Sessões de terapia
              </CardTitle>
              <CiBookmarkCheck className="text-xl" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Clientes</CardTitle>
                <CardDescription>Clientes cadastrados</CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/costumers">
                  Ver todos
                  <GoArrowUpRight className="text-xl" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead className="text-right">Sessões</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers?.map((customer, idx) => {
                    return (
                      <TableRow key={idx}>
                        <TableCell>
                          <div className="font-medium">
                            {customer.complete_name}
                          </div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            {customer.status}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{`${customer.num_sessions_done}/${customer.num_sessions_purchased}`}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Pagamentos recentes</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Olivia Martin
                  </p>
                  <p className="text-sm text-muted-foreground">
                    olivia.martin@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+R$1,999.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/02.png" alt="Avatar" />
                  <AvatarFallback>JL</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Jackson Lee
                  </p>
                  <p className="text-sm text-muted-foreground">
                    jackson.lee@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+R$39.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/03.png" alt="Avatar" />
                  <AvatarFallback>IN</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Isabella Nguyen
                  </p>
                  <p className="text-sm text-muted-foreground">
                    isabella.nguyen@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+R$299.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/04.png" alt="Avatar" />
                  <AvatarFallback>WK</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    William Kim
                  </p>
                  <p className="text-sm text-muted-foreground">
                    will@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+R$99.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/05.png" alt="Avatar" />
                  <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Sofia Davis
                  </p>
                  <p className="text-sm text-muted-foreground">
                    sofia.davis@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+R$39.00</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
