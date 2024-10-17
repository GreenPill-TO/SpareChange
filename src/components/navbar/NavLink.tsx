"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TNavLinkProps = {
  link: string;
  title: string;
  optionalClass?: string;
};
export default function NavLink({ link, title, optionalClass = "" }: TNavLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      className={classNames(
        "link px-3 font-semibold",
        "my-4 mr-2 lg:m-0",
        "no-underline",
        {
          "text-main-hover dark:text-main-hover-dark": pathname === link,
        },
        optionalClass
      )}
      href={link}
    >
      {title}
    </Link>
  );
}
