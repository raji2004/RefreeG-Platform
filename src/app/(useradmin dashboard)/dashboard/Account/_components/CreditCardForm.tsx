import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface CreditCardFormProps {
  onSubmit: (data: any) => void;
}

export function CreditCardForm({ onSubmit }: CreditCardFormProps) {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid w-full gap-2">
        <Label htmlFor="name">Name on Card</Label>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input {...field} placeholder="Enter name on card" required />
          )}
        />
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="bankName">Bank Name</Label>
        <Controller
          name="bankName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input {...field} placeholder="Enter bank name" required />
          )}
        />
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="cardNumber">Card Number</Label>
        <Controller
          name="cardNumber"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input {...field} placeholder="1234 5678 9012 3456" required />
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="expiry">Expiry Date</Label>
          <Controller
            name="expiry"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input {...field} type="date" required />
            )}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="cvv">CVV</Label>
          <Controller
            name="cvv"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input {...field} type="number" placeholder="123" maxLength={3} required />
            )}
          />
        </div>
      </div>

      <Button type="submit">Save</Button>
    </form>
  );
}