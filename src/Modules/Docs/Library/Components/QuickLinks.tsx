import { Link } from "~Components/Atoms/Link/Link.Component";

export function QuickLinks({ children }) {
  return <div class="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">{children}</div>;
}

export function QuickLink({ title, description, href }: any) {
  return (
    <div class="group relative rounded-xl border border-slate-200 dark:border-slate-800">
      <div class="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
      <div class="relative overflow-hidden rounded-xl p-6">
        <h2 class="font-display text-base text-slate-900 dark:text-white">
          <Link href={href} target="_blank">
            <span class="absolute -inset-px rounded-xl" />
            {title}
          </Link>
        </h2>
        <p class="mt-1 text-sm text-slate-700 dark:text-slate-400">{description}</p>
      </div>
    </div>
  );
}
