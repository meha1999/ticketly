import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

export { NavLink };

interface NavLinkProps {
  href: string;
  exact?: boolean;
  className: string;
  children: ReactNode;
}

const NavLink: FC<NavLinkProps> = ({ href, exact, children, ...props }) => {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    props.className += " active";
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};
