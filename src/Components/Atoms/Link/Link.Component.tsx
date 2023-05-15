import { JSX } from "solid-js/jsx-runtime";

import { router } from "~Services/Router";

type Props = {
  children: any;
  href: string;
  class?: string;
  classList?: () => Record<string, boolean>;
  target?: string;
  "aria-label"?: string;
  onClicked?: () => void;
};

/**
 * Renders an HTML `a` tag which invokes the router when clicked.
 * This allows simplifies use of the router but also provides the correct standard markup for links.
 */
export function Link({
  children,
  href,
  class: className = "",
  classList,
  target = "_self",
  onClicked,
  ...other
}: Props): JSX.Element {
  if (target !== "_self") {
    return (
      <a class={className} href={href} target={target} classList={classList?.()} {...other}>
        {children}
      </a>
    );
  }
  return (
    <a
      class={className}
      href={href}
      onClick={handleClick(href, onClicked)}
      classList={classList?.()}
      target={target}
      {...other}
    >
      {children}
    </a>
  );
}

/**
 * Handle link click event.
 *
 * If a URL is a relative path or if it is of the same host, navigate to the url using the router.
 * If not, then just rely on the default HTML `<a href` behavior to do the navigating.
 */
function handleClick(href: string, onClicked?: () => void) {
  return (event: MouseEvent): void => {
    event.stopPropagation();
    event.preventDefault();
    if (isRelative(href) === true) {
      event.preventDefault();
      router.goto(href);
      onClicked?.();
    }
  };
}

function isRelative(url: string): boolean {
  return (
    url.indexOf("http") !== 0 ||
    window.location.host === url.replace("http://", "").replace("https://", "").split("/")[0]
  );
}
