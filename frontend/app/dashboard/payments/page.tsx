import PaymentRequestForm from "@/components/Dashboard/PaymentRequestForm";

export default function PaymentsPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Payments</h2>
            </div>

            <div className="grid gap-4">
                <PaymentRequestForm />
            </div>
        </div>
    );
}