import type { Quote, QuoteStatus } from "@/admin/lib/types";
import { Badge } from "@/admin/components/ui/badge";
import { Button } from "@/admin/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/admin/components/ui/sheet";
import { QuoteStatusBadge } from "@/admin/components/StatusBadge";
import { QUOTE_STATUSES } from "@/admin/lib/types";

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <dt className="shrink-0 text-muted-foreground">{label}</dt>
      <dd className="text-right">{children}</dd>
    </div>
  );
}

export function QuoteSheet({
  quote,
  open,
  onOpenChange,
  onChangeStatus,
  saving,
}: {
  quote: Quote | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChangeStatus: (status: QuoteStatus) => void;
  saving: boolean;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        {quote && (
          <>
            <SheetHeader>
              <SheetTitle>{quote.name}</SheetTitle>
              <SheetDescription>{quote.company ?? "Individual enquiry"}</SheetDescription>
              <div className="mt-2 flex flex-wrap gap-2">
                <QuoteStatusBadge status={quote.status} />
                <Badge variant={quote.email_sent ? "outline" : "secondary"}>
                  {quote.email_sent ? "Email sent" : "Email not sent"}
                </Badge>
              </div>
            </SheetHeader>

            <div className="flex-1 space-y-5 overflow-y-auto p-5">
              <dl className="space-y-2">
                <Row label="Email">
                  <a href={`mailto:${quote.email}`} className="underline-offset-4 hover:underline">
                    {quote.email}
                  </a>
                </Row>
                <Row label="Phone">
                  {quote.phone ? (
                    <a
                      href={`tel:${quote.phone.replace(/\s/g, "")}`}
                      className="underline-offset-4 hover:underline"
                    >
                      {quote.phone}
                    </a>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </Row>
                {quote.product_name && <Row label="Product">{quote.product_name}</Row>}
                {quote.model_number && <Row label="Model">{quote.model_number}</Row>}
                {quote.brand_name && <Row label="Brand">{quote.brand_name}</Row>}
                <Row label="Received">{fmt(quote.created_at)}</Row>
              </dl>

              {quote.message && (
                <div>
                  <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    Message
                  </p>
                  <p className="mt-1 rounded-lg bg-muted p-3 text-sm whitespace-pre-wrap">
                    {quote.message}
                  </p>
                </div>
              )}
            </div>

            <SheetFooter>
              <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Update status
              </p>
              <div className="flex flex-wrap gap-2">
                {QUOTE_STATUSES.map((s) => (
                  <Button
                    key={s}
                    size="sm"
                    variant={s === quote.status ? "default" : "outline"}
                    className="capitalize"
                    disabled={saving || s === quote.status}
                    onClick={() => onChangeStatus(s)}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
