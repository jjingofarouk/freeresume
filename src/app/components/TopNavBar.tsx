"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logoSrc from "public/logo.jpg";
import { cx } from "lib/cx";

export const TopNavBar = () => {
  const pathName = usePathname();
  const isHomePage = pathName === "/";

  return (
    <header
      aria-label="Site Header"
      className={cx(
        "sticky top-0 z-50 flex h-[var(--top-nav-bar-height)] items-center border-b border-theme-light-gray/20 bg-theme-dark-teal/95 px-4 backdrop-blur-md sm:px-6 lg:px-12",
        isHomePage && "bg-dot"
      )}
    >
      <div className="flex w-full items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="sr-only">FreeResume</span>
          <Image
            src={logoSrc}
            alt="FreeResume Logo"
            className="h-10 w-10 rounded-full object-cover"
            priority
            width={40}
            height={40}
          />
          <span className="hidden text-lg font-semibold text-theme-light-gray sm:block">
            FreeResume
          </span>
        </Link>
        <nav
          aria-label="Site Nav Bar"
          className="flex items-center gap-4 text-sm font-medium"
        >
          {[
            ["/resumebuilder", "Builder"],
            ["/resume-parser", "Parser"],
          ].map(([href, text]) => (
            <Link
              key={text}
              href={href}
              className={cx(
                "rounded-xl px-3 py-2 text-theme-light-gray/80 outline-theme-dark-teal transition-all duration-200",
                pathName === href
                  ? "bg-theme-teal/20 text-theme-light-gray"
                  : "hover:bg-theme-teal/10 hover:text-theme-light-gray"
              )}
            >
              {text}
            </Link>
          ))}
          <Link
            href="/get-started"
            className="btn-primary hidden rounded-xl px-4 py-2 text-sm sm:block"
          >
            Get Started
          </Link>
          <div className="ml-2">
            <iframe
              src="https://ghbtns.com/github-btn.html?user=jjingofarouk&repo=freeresume&type=star&count=true"
              width="100"
              height="20"
              className="overflow-hidden border-none"
              title="GitHub"
            />
          </div>
        </nav>
      </div>
    </header>
  );
};