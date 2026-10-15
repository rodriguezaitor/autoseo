import { useState } from "react"
import {
  ArrowUpRightIcon,
  BarChart3Icon,
  ChevronRightIcon,
  FileTextIcon,
  GaugeIcon,
  GlobeIcon,
  LayoutGridIcon,
  LightbulbIcon,
  LinkIcon,
  SearchIcon,
  SunMoonIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
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
  { label: "Keywords", icon: SearchIcon, chevron: true },
  { label: "Backlinks", icon: LinkIcon, chevron: true },
  { label: "Performance", icon: GaugeIcon, chevron: true },
  { label: "Indexing", icon: GlobeIcon, chevron: true },
  { label: "Reports", icon: FileTextIcon },
  { label: "Analytics", icon: BarChart3Icon, chevron: true },
]

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg viewBox="0 0 32 20" className="h-5 w-8" aria-hidden>
        <path
          d="M23.5 18.5H4.2a3.7 3.7 0 0 1-.3-7.4A7 7 0 0 1 17 8.6a5 5 0 0 1 7.6 3.3 3.3 3.3 0 0 1-1.1 6.6Z"
          fill="var(--cf-orange)"
        />
      </svg>
      <span className="text-[15px] font-bold tracking-[0.18em] uppercase">
        autoseo
      </span>
      <span className="rounded border px-1.5 py-px text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
        Radar
      </span>
    </div>
  )
}

function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 flex-col border-r bg-card lg:flex">
      <div className="flex h-14 items-center border-b px-4">
        <Logo />
      </div>
      <nav className="flex flex-col gap-0.5 p-3 text-sm font-medium">
        {nav.map(({ label, icon: Icon, chevron }, i) => (
          <a
            key={label}
            href="#"
            className={
              "flex items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-accent " +
              (i === 3 ? "bg-accent" : "")
            }
          >
            <Icon className="size-4 text-muted-foreground" />
            <span className="flex-1">{label}</span>
            {chevron && (
              <ChevronRightIcon className="size-4 text-muted-foreground" />
            )}
          </a>
        ))}
      </nav>
    </aside>
  )
}

function Topbar() {
  const { theme, setTheme } = useTheme()
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-6">
      <div className="lg:hidden">
        <Logo />
      </div>
      <div className="ml-auto flex items-center gap-3">
        <div className="hidden h-8 items-center gap-2 rounded-md border px-2.5 text-sm text-muted-foreground sm:flex">
          <SearchIcon className="size-4" />
          Search
          <kbd className="ml-6 rounded border px-1 text-[10px]">⌘ K</kbd>
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          <SunMoonIcon />
        </Button>
      </div>
    </header>
  )
}

function ResultValue({ result }: { result: Result }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-sm font-semibold">
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

export function App() {
  const [hasRun, setHasRun] = useState(false)

  return (
    <div className="flex min-h-svh">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 px-6 py-6">
          <h1 className="mb-5 text-2xl font-bold">Site Quality Test</h1>
          <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
            <section className="flex flex-col gap-5 self-start rounded-lg border bg-card p-5">
              <p className="text-muted-foreground">
                Hello Aitor — measure your site&apos;s SEO health and
                performance
              </p>
              <Button
                size="lg"
                className="h-9 w-full border border-black/10 font-semibold shadow-sm"
                onClick={() => setHasRun(true)}
              >
                {hasRun ? "Run a new test" : "Test my site"}
              </Button>
              <div className="flex gap-3 rounded-md bg-cf-callout p-4 text-sm text-cf-callout-foreground">
                <LightbulbIcon className="mt-0.5 size-4 shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">
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
                </div>
              </div>

              {hasRun && (
                <div className="grid gap-x-8 gap-y-6 border-t pt-5 sm:grid-cols-2">
                  {results.map((r) => (
                    <ResultValue key={r.label} result={r} />
                  ))}
                </div>
              )}
            </section>

            <div className="flex flex-col gap-4">
              <section className="rounded-lg border bg-card p-5">
                <h2 className="mb-4 text-lg font-bold">Your site</h2>
                <dl className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1.5 text-sm">
                  {[
                    ["Domain", "autoseo.dev", true],
                    ["Hosted on", "Cloudflare Workers", false],
                    ["Region", "Columbus, United States", false],
                    ["Last crawl", "2 minutes ago", false],
                    ["Sitemap", "sitemap.xml", true],
                  ].map(([k, v, link]) => (
                    <div key={k as string} className="contents">
                      <dt className="text-right font-semibold">{k}:</dt>
                      <dd className={link ? "text-cf-link" : ""}>{v}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section className="flex flex-col gap-3 rounded-lg border bg-card p-5">
                <div className="flex size-28 items-center justify-center rounded-full bg-[#dff1fb] text-cf-blue dark:bg-[#16303f]">
                  <GaugeIcon className="size-14" strokeWidth={1.25} />
                </div>
                <h2 className="text-lg font-bold">Detailed audit</h2>
                <p className="text-sm text-muted-foreground">
                  For a full page-by-page report, go to{" "}
                  <a
                    href="#"
                    className="inline-flex items-center gap-0.5 text-cf-link hover:underline"
                  >
                    audit.autoseo.dev
                    <ArrowUpRightIcon className="size-3.5 text-cf-orange" />
                  </a>
                </p>
              </section>
            </div>
          </div>
        </main>
        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-dashed px-6 py-3 text-sm text-muted-foreground">
          <span>© 2026 autoseo</span>
          <div className="flex gap-4">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Support</a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
