import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MessagesDialog from "./messages-dialog";

import { TripTicket } from "@/lib/types/shared";

const tableHeaders = [
  { headTitle: "الرقم" },
  { headTitle: "اسم الرحلة" },
  { headTitle: "البريد الإلكتروني" },
  { headTitle: "الاسم الكامل" },
  { headTitle: "اسم الفندق" },
  { headTitle: "رقم الهاتف" },
  { headTitle: "تاريخ الوصول" },
  { headTitle: "البلد" },
  { headTitle: "عدد الأطفال" },
  { headTitle: "عدد البالغين" },
  { headTitle: "عدد الرضع" },
  { headTitle: "الرسالة" },
];

const AdminTable = ({ data }: { data: TripTicket[] }) => {
  return (
    <Table className="max-w-[900px]  mx-auto border-2">
      <TableHeader className="bg-black text-white">
        <TableRow>
          {tableHeaders.map(({ headTitle }, i) => (
            <TableHead
              key={i}
              className="whitespace-nowrap text-right font-sans font-bold"
            >
              {headTitle}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((order, idx) => (
          <TableRow key={idx}>
            <TableCell className="p-1 text-center whitespace-nowrap text-main text-xl">
              {idx + 1}
            </TableCell>
            <TableCell className="pl-4 text-right   whitespace-nowrap">
              {order.tripSlug}
            </TableCell>
            <TableCell className="pl-4 text-right  whitespace-nowrap">
              {order.email}
            </TableCell>
            <TableCell className="pl-4 text-right  whitespace-nowrap">
              {`${order.firstName} ${order.lastName}`}
            </TableCell>
            <TableCell className="pl-4 text-right  whitespace-nowrap">
              {order.hotelName}
            </TableCell>
            <TableCell className="pl-4 text-right  whitespace-nowrap">
              {order.phoneNumber}
            </TableCell>
            <TableCell className="pl-4 text-right  whitespace-nowrap">
              {order.checkDate}
            </TableCell>
            <TableCell className="pl-4 text-right  whitespace-nowrap">
              {order.country}
            </TableCell>
            <TableCell className="p-2 text-center">
              {order.childCount}
            </TableCell>
            <TableCell className="p-2 text-center">
              {order.adultCount}
            </TableCell>
            <TableCell className="p-2 text-center">
              {order.babiesCount}
            </TableCell>
            <TableCell className="pl-4">
              <MessagesDialog
                buttonLabel={"عرض"}
                dialogTitle={"رسالة العميل"}
                desc={order.message}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminTable;
