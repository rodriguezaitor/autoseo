import { useState } from "react"
import {
  ArrowUpRightIcon,
  BarChart3Icon,
  ChevronDownIcon,
  FileTextIcon,
  GaugeIcon,
  GlobeIcon,
  LayoutGridIcon,
  LightbulbIcon,
  LinkIcon,
  PanelLeftCloseIcon,
  SearchIcon,
  SparklesIcon,
  SunMoonIcon,
} from "lucide-react"

import { useTheme } from "@/components/theme-provider"

type Result = {
  label: string
  value: string
  unit: string
  color: string
}

const results: Result[] = [
  {
    label: "SEO score",
    value: "92",
    unit: "/100",
    color: "var(--cf-download)",
  },
  {
    label: "Organic traffic",
    value: "18.4",
    unit: "k",
    color: "var(--cf-upload)",
  },
  { label: "Page load", value: "312", unit: "ms", color: "var(--cf-latency)" },
  {
    label: "Time to first byte",
    value: "48",
    unit: "ms",
    color: "var(--cf-jitter)",
  },
]

const nav = [
  { label: "Overview", icon: LayoutGridIcon },
  { label: "Keywords", icon: SearchIcon, toggle: true },
  { label: "Backlinks", icon: LinkIcon, toggle: true },
  { label: "Performance", icon: GaugeIcon, toggle: true, active: true },
  { label: "Indexing", icon: GlobeIcon, toggle: true },
  { separator: true },
  { label: "Reports", icon: FileTextIcon },
  { label: "Analytics", icon: BarChart3Icon, toggle: true },
] as const

const siteDetails = [
  { term: "Domain", value: "autoseo.dev", link: true },
  { term: "Hosted on", value: "Cloudflare Workers" },
  { term: "Region", value: "Columbus, United States" },
  { term: "Last crawl", value: "2 minutes ago" },
  { term: "Sitemap", value: "sitemap.xml", link: true },
]

const footerLinks = ["Privacy Policy", "Terms of Use", "Support"]

function Logo() {
  return (
    <a href="#" className="flex h-14 items-center gap-2 pl-6 xl:w-72">
      <svg viewBox="0 0 32 20" className="h-5 w-8" aria-hidden>
        <path
          d="M23.5 18.5H4.2a3.7 3.7 0 0 1-.3-7.4A7 7 0 0 1 17 8.6a5 5 0 0 1 7.6 3.3 3.3 3.3 0 0 1-1.1 6.6Z"
          fill="var(--cf-orange)"
        />
      </svg>
      <span className="text-[15px] font-bold tracking-[0.18em] uppercase">
        autoseo
      </span>
      <span className="rounded-md border px-1.5 py-px text-[10px] font-semibold tracking-wider text-cf-text-strong uppercase">
        Radar
      </span>
    </a>
  )
}

function Header() {
  const { theme, setTheme } = useTheme()
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center gap-6 border-b bg-card pr-6">
      <Logo />
      <div className="hidden w-0 flex-1 md:flex">
        <label className="relative flex h-[2.375rem] w-full items-center rounded-md border bg-card pl-[2.625rem] text-cf-text-subtle">
          <SearchIcon className="absolute left-3 size-4" />
          <span className="truncate">
            Search for keywords, pages, reports, domains and more...
          </span>
        </label>
      </div>
      <div className="ml-auto flex items-center gap-6">
        <button className="inline-flex items-center gap-2 text-sm text-cf-text-strong">
          <SparklesIcon className="size-4 text-cf-orange" />
          <span className="text-foreground">Ask AI</span>
          <span className="rounded-full border border-dashed border-cf-orange px-2 py-1 text-[0.625rem] leading-none text-cf-orange">
            Beta
          </span>
        </button>
        <button
          aria-label="Toggle theme"
          className="-mx-1 inline-flex rounded-full p-1 text-cf-text-strong hover:text-cf-orange"
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          <SunMoonIcon className="size-5" />
        </button>
      </div>
    </header>
  )
}

function Sidebar() {
  return (
    <aside className="fixed top-14 bottom-0 left-0 hidden w-72 flex-col border-r bg-card xl:flex">
      <nav className="relative flex-1 overflow-auto">
        <ul className="flex flex-col pt-2">
          {nav.map((item, i) =>
            "separator" in item ? (
              <li key={i} role="presentation" className="mx-3 my-2 border-t" />
            ) : (
              <li key={item.label} className="relative flex flex-col">
                <a
                  href="#"
                  className={
                    "relative ml-1 flex min-h-[2.625rem] items-center rounded-l-full border border-r-0 py-1 pr-9 pl-11 text-sm text-cf-menu-text " +
                    ("active" in item
                      ? "border-cf-menu-active-border bg-cf-menu-active font-bold"
                      : "border-transparent hover:border-cf-hairline hover:bg-cf-hover")
                  }
                >
                  <item.icon className="absolute top-1/2 left-[0.78125rem] size-[1.125rem] -translate-y-1/2 text-cf-orange" />
                  {item.label}
                </a>
                {"toggle" in item && (
                  <button
                    aria-label="Expand"
                    className="absolute top-0 right-0 flex h-[2.625rem] w-9 items-center justify-center rounded-l-md text-cf-text-strong hover:bg-cf-hover"
                  >
                    <ChevronDownIcon className="size-4" />
                  </button>
                )}
              </li>
            )
          )}
        </ul>
      </nav>
      <button className="flex h-14 items-center gap-0 border-t text-sm text-cf-text-strong hover:text-cf-orange">
        <PanelLeftCloseIcon className="mr-3 ml-[1.09375rem] size-4" />
        Collapse sidebar
      </button>
    </aside>
  )
}

function ResultValue({ result }: { result: Result }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-sm font-bold">
        <span
          className="size-2.5 rounded-full"
          style={{ backgroundColor: result.color }}
        />
        {result.label}
      </div>
      <div className="flex items-baseline gap-1.5 leading-none">
        <span className="text-5xl font-extrabold tracking-tight tabular-nums">
          {result.value}
        </span>
        <span className="text-2xl font-bold">{result.unit}</span>
      </div>
    </div>
  )
}

function Card({
  className = "",
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <article
      className={`flex flex-col gap-6 rounded-md border bg-card p-6 ${className}`}
    >
      {children}
    </article>
  )
}

export function App() {
  const [hasRun, setHasRun] = useState(false)

  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <Sidebar />
      <main className="mt-14 flex flex-1 flex-col px-6 pb-6 xl:ml-72">
        <div className="flex w-full flex-wrap gap-3 py-4">
          <h1 className="text-2xl font-bold">Site Quality Test</h1>
        </div>
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="self-start lg:col-span-2 lg:row-span-3">
            <header className="flex flex-col gap-1 text-cf-text-subtle">
              <p>
                Hola Aitor — measure your site&apos;s SEO health and performance
              </p>
            </header>
            <section className="flex flex-col">
              <button
                type="button"
                className="inline-flex min-h-[2.375rem] w-full items-center justify-center rounded-md border border-primary bg-primary py-2 text-base font-semibold text-primary-foreground hover:bg-[color-mix(in_oklab,var(--primary),#000_10%)]"
                onClick={() => setHasRun(true)}
              >
                {hasRun ? "Run a new test" : "Test my site"}
              </button>
            </section>
            <section className="flex flex-col gap-4">
              <div className="flex gap-4 rounded-md bg-cf-callout p-4 text-[0.8125rem] leading-[1.3] text-cf-callout-foreground">
                <LightbulbIcon className="size-4 shrink-0" />
                <div className="flex flex-col gap-2">
                  <p className="font-bold">
                    A full crawl can take up to 2 minutes.
                  </p>
                  <p>
                    When you run a test, your URL is fetched from Cloudflare
                    Workers and analysed according to our{" "}
                    <a href="#" className="text-cf-link hover:underline">
                      privacy policy
                    </a>
                    .
                  </p>
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center gap-1 font-semibold">
                      <ChevronDownIcon className="size-3.5 transition-transform group-open:rotate-180" />
                      Learn more
                    </summary>
                    <p className="mt-2">
                      autoseo only reads publicly available pages and never
                      stores page content beyond the report.
                    </p>
                  </details>
                </div>
              </div>
            </section>
            {hasRun && (
              <section className="grid gap-x-8 gap-y-6 border-t pt-6 sm:grid-cols-2">
                {results.map((r) => (
                  <ResultValue key={r.label} result={r} />
                ))}
              </section>
            )}
          </Card>

          <Card>
            <header className="flex flex-col gap-1">
              <h2 className="text-xl font-bold">Your site</h2>
            </header>
            <dl className="grid grid-cols-[auto_1fr] gap-x-1.5 gap-y-2">
              {siteDetails.map(({ term, value, link }) => (
                <div key={term} className="contents">
                  <dt className="flex justify-end text-sm leading-6 font-bold">
                    {term}:
                  </dt>
                  <dd className={link ? "text-cf-link" : ""}>{value}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card>
            <div className="flex size-28 items-center justify-center rounded-full bg-[#dff1fb] text-cf-blue dark:bg-[#16303f]">
              <GaugeIcon className="size-14" strokeWidth={1.25} />
            </div>
            <header className="flex flex-col gap-1">
              <h2 className="text-xl font-bold">Detailed audit</h2>
            </header>
            <div className="text-cf-text-subtle">
              For a full page-by-page report, go to{" "}
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-cf-link hover:underline"
              >
                audit.autoseo.dev
                <ArrowUpRightIcon className="size-3.5 text-cf-orange" />
              </a>
            </div>
          </Card>
        </div>
      </main>
      <footer className="flex flex-wrap items-center justify-end px-6 pb-6 text-sm text-cf-text-strong xl:ml-72">
        <p className="px-3 lg:border-r lg:border-cf-text-strong">
          © 2026 autoseo
        </p>
        {footerLinks.map((label, i) => (
          <a
            key={label}
            href="#"
            className={
              "px-3 text-cf-link hover:underline " +
              (i < footerLinks.length - 1
                ? "md:border-r md:border-cf-text-strong"
                : "")
            }
          >
            {label}
          </a>
        ))}
      </footer>
    </div>
  )
}

export default App
