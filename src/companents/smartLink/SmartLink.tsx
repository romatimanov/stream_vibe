"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type SmartLinkProps = {
  to: string;
  scrollTo?: string;
  type?: "movie" | "tv";
  children: React.ReactNode;
  className?: string;
};

export function SmartLink({
  to,
  scrollTo,
  type,
  children,
  className,
}: SmartLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      const query = new URLSearchParams(searchParams.toString());
      if (scrollTo) query.set("scrollTo", scrollTo);
      if (type) query.set("type", type);

      const url = `${to}?${query.toString()}`;

      if (pathname === to) {
        router.replace(url);
        setTimeout(() => {
          const el = document.getElementById(scrollTo || "");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        router.push(url);
      }
    },
    [pathname, to, scrollTo, type, router, searchParams]
  );

  return (
    <a
      href={`${to}?scrollTo=${scrollTo ?? ""}&type=${type ?? ""}`}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
