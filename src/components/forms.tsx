"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { signUpSchema, loginSchema, compnanySchema } from "@/lib/schema";
import { H1, P } from "./typograpy";
import { ChevronRight, Eye, EyeOff } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { fetchCountriesData } from "@/lib/helpers";
import { useState, useEffect } from "react";
import { Country, SortedCountry, User } from "@/lib/type";
import Image from "next/image";
import { DatePicker } from "./ui/date-picker";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getOldParams, sessionAge } from "@/lib/utils";
import { InputOTP, InputOTPSeparator, InputOTPSlot } from "./ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/config";
import { addUser, checkEmailExists } from "@/lib/firebase/actions";
import { setCookie } from "cookies-next";
import { Checkbox } from "./ui/checkbox";

// Define prop types for the LoginForm
interface LoginFormProps {
  defaultValues: {
    email: string;
    password: string;
  };
}

// Login Form
export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { push } = useRouter();
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await signInWithEmailAndPassword(data.email, data.password);
      console.log("res", res?.user.uid);
      setCookie("userSession", JSON.stringify(res?.user.uid), {
        maxAge: sessionAge,
      });
      if (res != undefined) {
        push("/");
      } else {
        toast("Invalid email or password");
      }
    } catch (e) {
      console.error("error", e);
    }
  };

  return (
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(onSubmit)}
        className="max-w-lg space-y-5 text-center"
      >
        <H1>Login</H1>
        <P>{"Welcome back! Please login to your account."}</P>
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <div className="flex items-center">
                  <Input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant={"ghost"} className="w-full rounded-md">
          Login <ChevronRight />
        </Button>
      </form>
    </Form>
  );
}

// Signup Form 1
export const SignupForm1 = ({
  defaultValues,
}: {
  defaultValues:
    | Pick<User, "firstName" | "lastName" | "countryOfResidence" | "DOB">
    | undefined;
}) => {
  const signu1Schema = signUpSchema.pick({
    firstName: true,
    lastName: true,
    countryOfResidence: true,
    DOB: true,
  });

  const searchParams = useSearchParams();
  const { push } = useRouter();
  const form = useForm({
    resolver: zodResolver(signu1Schema),
    defaultValues: {
      firstName: defaultValues?.firstName ?? "",
      lastName: defaultValues?.lastName ?? "",
      countryOfResidence: defaultValues?.countryOfResidence ?? "",
      DOB: defaultValues?.DOB ? new Date(defaultValues?.DOB) : "",
    },
  });

  const [countries, setCountries] = useState<SortedCountry[]>([]);

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountriesData();
      setCountries(data);
    };

    getCountries();
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(data).forEach(([key, value]) => {
      params.set(key, value);
    });

    push(`/signup2?${params.toString()}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg space-y-5 text-center"
      >
        <H1>Create an account</H1>
        <P>
          {
            "We need the following information to stay CBN compliant, Please stay with us :)"
          }
        </P>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="First name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="countryOfResidence"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Country of residence" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem
                      key={country.name.common}
                      value={country.name.common}
                    >
                      <div className="flex gap-3">
                        <Image
                          src={country.flags.svg}
                          alt={country.name.common}
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                        {country.name.common}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="DOB"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker
                  placeholder="Date of Birth"
                  onChange={(date: Date | undefined) => {
                    field.onChange(date ?? undefined);
                  }}
                  defaultValue={
                    defaultValues?.DOB ? new Date(defaultValues.DOB) : undefined
                  }
                />
              </FormControl>
              <FormMessage className="mr-auto" />
            </FormItem>
          )}
        />
        <Button type="submit" variant={"ghost"} className="w-full rounded-md">
          Next <ChevronRight />
        </Button>
      </form>
    </Form>
  );
};

// Signup Form 2
export const SignupForm2 = ({
  defaultValues,
}: {
  defaultValues: { email: string; password: string; confirmPassword: string };
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const signu2Schema = signUpSchema.pick({
    email: true,
    password: true,
    confirmPassword: true,
  });

  const searchParams = useSearchParams();
  const { push } = useRouter();
  const form = useForm({
    resolver: zodResolver(signu2Schema),
    defaultValues: {
      email: defaultValues.email ?? "",
      password: defaultValues.password ?? "",
      confirmPassword: defaultValues.confirmPassword ?? "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Password does not match");
      return;
    }
    const check = await checkEmailExists(data.email);
    if (check) {
      // Email exists
      toast.error("Email already exists. Please choose a different email.");
      return;
    }
    const params = new URLSearchParams(searchParams);
    getOldParams(searchParams, params);
    Object.entries(data).forEach(([key, value]) => {
      params.set(key, value);
    });
    push(`signup3?${params.toString()}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg space-y-5 text-center"
      >
        <H1>Create an account</H1>
        <P>
          {
            "We need the following information to stay CBN compliant, Please stay with us :)"
          }
        </P>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <div className="flex items-center">
                  <Input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant={"ghost"} className="w-full rounded-md">
          Next <ChevronRight />
        </Button>
      </form>
    </Form>
  );
};

// Signup Form 3
export const SignupForm3 = () => {
  const signu3Schema = signUpSchema.pick({
    phoneNumber: true,
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const form = useForm({
    resolver: zodResolver(signu3Schema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    const params = new URLSearchParams(searchParams);
    getOldParams(searchParams, params);
    Object.entries(data).forEach(([key, value]) => {
      params.set(key, value);
    });
    push(`signup4?${params.toString()}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg space-y-5 text-center"
      >
        <H1>Create an account</H1>
        <P>
          {
            "We need the following information to stay CBN compliant, Please stay with us :)"
          }
        </P>
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant={"ghost"} className="w-full rounded-md">
          Next <ChevronRight />
        </Button>
      </form>
    </Form>
  );
};

export const SignupForm4 = () => {
  const [value, setValue] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    const params = new URLSearchParams(searchParams);
    getOldParams(searchParams, params);
    Object.entries(data).forEach(([key, value]) => {
      params.set(key, value);
    });
    push(`signup5?${params.toString()}`);
  };
  return (
    <form className=" flex flex-col items-center text-center ">
      <H1 className=" mb-8">Confirm 4-digit payment code</H1>
      <P className=" mb-8">
        This will serve as a transaction before you make any donation
      </P>

      <InputOTP
        maxLength={4}
        value={value}
        onChange={(value) => {
          console.log(value);
          setValue(value);
        }}
        pattern={REGEXP_ONLY_DIGITS}
      >
        <InputOTPSlot index={0} />
        <InputOTPSeparator />
        <InputOTPSlot index={1} />
        <InputOTPSeparator />
        <InputOTPSlot index={2} />
        <InputOTPSeparator />
        <InputOTPSlot index={3} />
      </InputOTP>

      <Button
        onClick={(e) => {
          e.preventDefault();
          onSubmit({ pin: value });
        }}
        variant={"ghost"}
        className="w-1/2 mt-16  mx-auto rounded-md"
      >
        Next <ChevronRight />
      </Button>
    </form>
  );
};

export const SignupForm5 = () => {
  const signu3Schema = signUpSchema.pick({
    donationPreference: true,
  });
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();
  const form = useForm({
    resolver: zodResolver(signu3Schema),
    defaultValues: {
      donationPreference: [],
    },
  });
  const donationOptions = [
    "Education",
    "Healthcare",
    "Women’s Empowerment",
    "Youth Development",
    "Economic Development",
    "Agriculture",
    "Environment",
  ];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const params = new URLSearchParams(searchParams);
    const oldParam = getOldParams(searchParams, params);
    Object.entries(data).forEach(([key, value]) => {
      params.set(key, value);
    });
    try {
      const res = await createUserWithEmailAndPassword(
        oldParam.email,
        oldParam.password
      );
      await addUser(`${res?.user.uid}`, {
        email: oldParam.email,
        donationPreference: data.donationPreference, // This is now an array
        firstName: oldParam.firstName,
        lastName: oldParam.lastName,
        DOB: oldParam.DOB,
        countryOfResidence: oldParam.countryOfResidence,
        phoneNumber: oldParam.phoneNumber,
        pin: oldParam.pin,
        profileImage: "",

        // Required fields
        bio: oldParam.bio || "", // Set from user input if available
        createdAt: oldParam.createdAt || new Date().toISOString(),
        updatedAt: oldParam.updatedAt || new Date().toISOString(),
        isVerified: true,

        // Dynamic fields that will change over time
        followersCount: oldParam.followersCount || 0,
        followingCount: oldParam.followingCount || 0,
        causesCount: oldParam.causesCount || 0,
        userType: oldParam.userType || "individual", // Default but can be changed
      });

      setCookie("userSession", JSON.stringify(res?.user.uid), {
        maxAge: sessionAge,
      });
      console.log("successful");
      push("/");
    } catch (e) {
      console.error("error:", e);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="text-center space-y-6"
      >
        <H1>Please select your donation preferences</H1>
        <P>
          This helps us know what causes to bring to your attention urgently
        </P>
        <FormField
          control={form.control}
          name="donationPreference"
          render={({ field }) => (
            <FormControl>
              <div className="space-y-4">
                {donationOptions.map((donation) => (
                  <FormItem
                    key={donation}
                    className="flex items-center space-x-3 space-y-0 bg-palette-baseWhite h-14 pl-5"
                  >
                    <FormControl>
                      <Checkbox
                        checked={(field.value as string[]).includes(donation)} // Explicitly cast field.value to string[]
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...(field.value as string[]), donation] // Explicitly cast field.value to string[]
                            : (field.value as string[]).filter(
                                (value) => value !== donation
                              ); // Explicitly cast field.value to string[]
                          field.onChange(newValue);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal text-xl">
                      {donation}
                    </FormLabel>
                  </FormItem>
                ))}
              </div>
            </FormControl>
          )}
        />
        <Button type="submit" variant={"ghost"} className="w-1/2 rounded-md">
          Next <ChevronRight />
        </Button>
      </form>
    </Form>
  );
};

export const CompanyForm = () => {
  const companySchema1 = compnanySchema.pick({
    organizatonName: true,
    organizationType: true,
    organizationLocation: true,
    taxIdentificationNumber: true,
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const form = useForm({
    resolver: zodResolver(companySchema1),
    defaultValues: {
      organizatonName: "",
      organizationType: "",
      organizationLocation: "",
      taxIdentificationNumber: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    const params = new URLSearchParams(searchParams);
    getOldParams(searchParams, params);
    Object.entries(data).forEach(([key, value]) => {
      params.set(key, value);
    });
    push(`/company/signup2?${params.toString()}`);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg space-y-5 text-center"
      >
        <H1>Create a company account</H1>
        <P>
          {
            "We need the following information to stay CBN  compliant,Please stay with us :)"
          }
        </P>
        <FormField
          control={form.control}
          name="organizatonName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Organization Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="organizationType"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Organization Type (NGO’s, educational institute, etc)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="organizationLocation"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Organization’s Location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="taxIdentificationNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Tax Identification Number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant={"ghost"} className="w-full rounded-md">
          Next <ChevronRight />
        </Button>
      </form>
    </Form>
  );
};
export const CompanyContactForm = () => {
  const companySchema1 = compnanySchema.pick({
    fullName: true,
    email: true,
    phoneNo: true,
    positon: true,
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const form = useForm({
    resolver: zodResolver(companySchema1),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNo: "",
      position: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    const params = new URLSearchParams(searchParams);
    getOldParams(searchParams, params);
    Object.entries(data).forEach(([key, value]) => {
      params.set(key, value);
    });
    push(`company/signup2?${params.toString()}`);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg space-y-5 text-center"
      >
        <H1>Contact person information</H1>
        <P>
          {
            "We need the following information to verify the identity of the person who’ll be managing the company’s account"
          }
        </P>
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNo"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Phone Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Position/Role Within the Organization"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant={"ghost"} className="w-full rounded-md">
          Next <ChevronRight />
        </Button>
      </form>
    </Form>
  );
};
