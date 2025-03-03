import Image from "next/image";
import { H1, P } from "@/components/typograpy";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

// import BackgroundCard from "/donation_flow/cause_background.svg"
import { Navbar, NavbarMedium, NavbarSmall } from "@/components/ui/navbar";
import ClientHome from "@/components/ui/windowSize";

export default function Page() {
  return (
    <div className="">
      <ClientHome></ClientHome>
      <div className="max-w-7xl p-3 space-y-3 mx-auto my-20 ">
        <Image
          className="w-full"
          src={"/donation_flow/cause_background.svg"}
          alt="Donation Cause Image"
          width={60}
          height={60}
        />
        <div className="p-7  space-y-5">
          <div className="lg:w-3/4 space-y-3 mb-20">
            <h1 className="font-base text-3xl">
              You’re about to donate to{" "}
              <span className="font-bold">“Support flood victims”</span>
            </h1>
            <P>
              Help the victims of the Maiduguri floods rebuild their new homes
              and send their kids back to school with your donations!
            </P>
          </div>
          <ToggleGroup className="w-full" type="single">
            <ToggleGroupItem className="border border-black" value="1000">
              {" "}
              1,000
            </ToggleGroupItem>
            <ToggleGroupItem className="border border-black" value="5000">
              5,000
            </ToggleGroupItem>
            <ToggleGroupItem className="border border-black" value="10000">
              10,000
            </ToggleGroupItem>
            <ToggleGroupItem className="border border-black" value="50000">
              50,000
            </ToggleGroupItem>
            <ToggleGroupItem className="border border-black" value="100000">
              100,000
            </ToggleGroupItem>
            <ToggleGroupItem className="border border-black" value="1000000">
              1,000,000
            </ToggleGroupItem>
          </ToggleGroup>
          <div className="flex w-full items-center justify-between">
            <div>
              <h1>₦</h1>
              <h2>NGN</h2>
            </div>
            <P>0.00</P>
          </div>
          <Separator></Separator>

          <div className="flex space-x-2">
            <h3 className="font-bold">Support RefreeG’s Mission </h3>
            <Image
              src={"/donation_flow/information.svg"}
              alt="Donation Cause Image"
              width={20}
              height={20}
            />
          </div>
          <P>
            At RefreeG, we’re committed to connecting donors with meaningful
            causes that foster socioeconomic growth across Africa. We don’t
            charge causes or beneficiaries a fee to list on our platform—we want
            100% of your donation to go where it’s needed most.
          </P>
          <Slider
            defaultValue={[0]}
            max={100}
            step={6}
            minStepsBetweenThumbs={1}
          />
          <p>Enter custom tip?</p>
          <div className="flex items-center space-x-1">
            <Checkbox />
            <P>Donate Annoymously</P>
            <Image
              className=""
              src={"/donation_flow/information.svg"}
              alt="Donation Cause Image"
              width={20}
              height={20}
            />
          </div>
          <Separator></Separator>

          <div className="space-y-3">
            <h2>Your Donation summary</h2>
            <div className="flex justify-between item-center">
              <P>Donation Amount</P>
              <P>₦5,000.00</P>
            </div>
            <div className="flex justify-between item-center">
              <P>Refree Tip</P>
              <P>₦5,000.00</P>
            </div>
            <div className="flex justify-between item-center">
              <div className="flex space-x-1 items-center">
                <P>Service Fee</P>
                <Image
                  className=""
                  src={"/donation_flow/information.svg"}
                  alt="Donation Cause Image"
                  width={20}
                  height={20}
                />
              </div>
              <P>₦5,000.00</P>
            </div>
            <div className="flex justify-between items-center">
              <h3>Total</h3>
              <p>₦10,000.00</p>
            </div>
            <Button className="bg-slate-300 p-7 w-full justify-items-stretch">
              {" "}
              Proceed{" "}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
