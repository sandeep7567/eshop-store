import Link from "next/link";

import { Container } from "@/components/UI/container";
import { NavbarActions } from "@/components/navbar-actions";
import { Search } from "@/components/search";

const Navbar = async () => {

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sn:px-6 lg:px-8 flex justify-center w-full items-center h-16">
          <Link href={"/"} className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="text-xl font-bold uppercase">Store</p>
          </Link>
          <Search className="flex justify-end items-center w-full mr-4" />
          <NavbarActions/>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
