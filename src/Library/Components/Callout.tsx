import { Icon } from "solid-heroicons";
import { exclamationTriangle, lightBulb } from "solid-heroicons/outline";

const styles = {
  note: {
    container: "bg-sky-50 dark:bg-slate-800/50 dark:ring-1 dark:ring-slate-300/10",
    title: "text-sky-900 dark:text-sky-400",
    body: "text-sky-800 [--tw-prose-background:theme(colors.sky.50)] prose-a:text-sky-900 prose-code:text-sky-900 dark:text-slate-300 dark:prose-code:text-slate-300"
  },
  warning: {
    container: "bg-amber-50 dark:bg-slate-800/50 dark:ring-1 dark:ring-slate-300/10",
    title: "text-amber-900 dark:text-amber-500",
    body: "text-amber-800 [--tw-prose-underline:theme(colors.amber.400)] [--tw-prose-background:theme(colors.amber.50)] prose-a:text-amber-900 prose-code:text-amber-900 dark:text-slate-300 dark:[--tw-prose-underline:theme(colors.sky.700)] dark:prose-code:text-slate-300"
  }
};

const icons = {
  note: (props) => <Icon path={lightBulb} {...props} />,
  warning: (props) => <Icon path={exclamationTriangle} {...props} />
};

export function Callout({ type = "note", title, children }) {
  const IconComponent = icons[type];
  return (
    <div
      class="my-8 flex rounded-md px-4 py-5"
      classList={{
        [styles[type].container]: true
      }}
    >
      <IconComponent
        class="h-8 w-8 flex-none"
        classList={{
          [styles[type].title]: true
        }}
      />
      <div class="ml-4 flex-auto">
        <p
          class="m-0 font-display text-xl"
          classList={{
            [styles[type].title]: true
          }}
        >
          {title}
        </p>
        <div
          class="prose mt-2.5"
          classList={{
            [styles[type].body]: true
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
