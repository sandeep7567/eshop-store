import { FC, FormEventHandler, useState } from "react";
import { Input } from "../UI/input";
import Button from "../UI/button";
import axios from "axios";
import { UseAccountModal } from "@/hooks/use-account-modal";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface LoginFormProps {}

export const LoginForm: FC<LoginFormProps> = ({}) => {
  // const NEXT_PUBLIC_API_AUTH_URL = process.env.NEXT_PUBLIC_API_AUTH_URL
  const router = useRouter();
  const onClose = UseAccountModal((state) => state.onClose);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit:  FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log({ email, password });
    if (!email || typeof email !== "string" || !password || typeof password !== "string") {
      return alert("required");
    };

    try {
      
      toast.message("service not availble right now!");
      // const {data} = await axios.post(`${NEXT_PUBLIC_API_AUTH_URL}/login`, { email, password });
      // if (data?.success) {
      //   localStorage.setItem("user", JSON.stringify(data?.user));
      //   onClose();
      //   router.refresh();
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e)} className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-semibold">Email</label>
          <Input
            placeholder="demo@demo.com"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className=""
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold">Password</label>
          <Input
            placeholder="*****"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className=""
          />
        </div>
      </div>
      <Button className="w-full bg-sky-800" type="submit">
        Sign In
      </Button>
    </form>
  );
};
