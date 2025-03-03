import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface CryptoWalletFormProps {
  onSubmit: (data: any) => void;
}

export function CryptoWalletForm({ onSubmit }: CryptoWalletFormProps) {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid w-full gap-2">
        <Label htmlFor="address">Wallet Address</Label>
        <Controller
          name="address"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input {...field} placeholder="Enter wallet address" required />
          )}
        />
      </div>

      <div className="grid w-full gap-2">
        <Label htmlFor="network">Network</Label>
        <Controller
          name="network"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input {...field} placeholder="e.g., Polygon, Ethereum" required />
          )}
        />
      </div>

      <Button type="submit">Save</Button>
    </form>
  );
}