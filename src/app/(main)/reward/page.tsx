import ALiPay from "@/components/reward-me/alipay";

export default async function Reward() {
  return (
    <div className="flex gap-2 items-center justify-center h-full">
      <ALiPay />
    </div>
  );
}
