export function Prose({ class: className = "", children }) {
  return (
    <div
      classList={{
        [className]: true,
        "prose prose-slate dark:prose-invert max-w-none dark:text-slate-400": true,
        // headings
        "prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]":
          true,
        // lead
        "prose-lead:text-slate-500 dark:prose-lead:text-slate-400": true,
        // links
        "prose-a:font-semibold dark:prose-a:text-sky-400": true,
        // link underline
        "prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)]":
          true,
        // pre
        "prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10":
          true,
        // hr
        "dark:prose-hr:border-slate-800": true
      }}
    >
      {children}
    </div>
  );
}
