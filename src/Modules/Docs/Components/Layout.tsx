import { config } from "../Config";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Navigation } from "./Navigation";

type Props = {
  children: any;
};

export function Layout({ children }: Props) {
  return (
    <>
      <Header navigation={config.navigation} />
      <Hero />
      <div class="relative mx-auto flex max-w-8xl justify-center sm:px-2 lg:px-8 xl:px-12">
        <div class="hidden lg:relative lg:block lg:flex-none">
          <div class="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
          <div class="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
          <div class="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800 dark:block" />
          <div class="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto overflow-x-hidden py-16 pl-0.5">
            <Navigation navigation={config.navigation} class="w-64 pr-8 xl:w-72 xl:pr-16" />
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
