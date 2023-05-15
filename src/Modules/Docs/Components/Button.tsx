import { Link } from "~Components/Atoms/Link/Link.Component";

const styles = {
  primary:
    "rounded-full bg-sky-300 py-2 px-4 text-sm font-semibold text-slate-900 hover:bg-sky-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500",
  secondary:
    "rounded-full bg-slate-800 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-400"
};

export function Button({
  variant = "primary",
  class: className,
  href,
  ...props
}: {
  variant: string;
  href: string;
  class?: string;
}) {
  return href ? (
    <Link
      href={href}
      classList={() => ({
        [styles[variant]]: true,
        [className]: true
      })}
    />
  ) : (
    <button
      classList={{
        [styles[variant]]: true,
        [className]: true
      }}
      {...props}
    />
  );
}
