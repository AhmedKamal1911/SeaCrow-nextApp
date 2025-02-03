import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  buttonLabel: string;
  dialogTitle: string;
  desc: string;
};
export default function MessagesDialog({
  buttonLabel = "open",
  dialogTitle,
  desc,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger className="bg-main font-sans font-bold text-white px-3 py-3 rounded-sm">
        {buttonLabel}
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader className="gap-4">
          <DialogTitle className="text-main">{dialogTitle}</DialogTitle>
          <DialogDescription className="text-[17px]">{desc}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
