import { Navigation } from "./Navigation";

export function DesktopNavigation() {
  return (
    <div class="hidden lg:relative lg:block lg:flex-none">
      <div class="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto overflow-x-hidden py-10 pl-0.5">
        <Navigation class="pr-16" />
      </div>
    </div>
  );
}
