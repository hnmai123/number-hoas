import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  icon: IconDefinition;
  children: React.ReactNode;
}

export default function NavLink({ href, icon, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 hover:underline decoration-2 underline-offset-4 flex items-center gap-2"
    >
      <FontAwesomeIcon icon={icon} />
      {children}
    </Link>
  );
}
