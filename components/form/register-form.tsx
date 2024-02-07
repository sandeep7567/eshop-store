import { FC, FormEventHandler, useState } from "react";
import { Input } from "../UI/input";
import Button from "../UI/button";
import axios from "axios";

interface RegisterFormProps {}

export const RegisterForm: FC<RegisterFormProps> = () => {
  const NEXT_PUBLIC_API_AUTH_URL = process.env.NEXT_PUBLIC_API_AUTH_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (
      !name ||
      typeof name !== "string" ||
      !email ||
      typeof email !== "string" ||
      !password ||
      typeof password !== "string"
    ) {
      return alert("required");
    }

    try {
      const res = await axios.post(`${NEXT_PUBLIC_API_AUTH_URL}/register`, {
        name,
        email,
        password,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e)} className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-semibold">User Name</label>
          <Input
            placeholder="User Name"
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
            className=""
          />
        </div>
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
        Register
      </Button>
    </form>
  );
};
