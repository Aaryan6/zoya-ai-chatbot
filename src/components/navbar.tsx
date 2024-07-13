"use client";

import { LinkedinIcon, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Zoya from "../../public/zoya.jpeg";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between border-b bg-primary">
      <div className="flex items-center justify-between gap-4 w-full max-w-7xl mx-auto px-6 py-2">
        <div className="flex items-center gap-2">
          <Image
            src={Zoya}
            alt="zoya"
            className="w-12 h-12 rounded-full object-cover border-2 border-primary"
          />
          <span className="text-xl font-bold">Zoya</span>
        </div>
        <div className="flex items-center gap-x-6">
          <Link
            href="https://x.com/satvikps"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
            target="_blank"
          >
            <Twitter className="w-5 h-5" />
          </Link>
          <Link
            href="https://www.linkedin.com/company/build-fast-with-ai/"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            <LinkedinIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
