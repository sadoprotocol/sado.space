import { DashboardController } from "./Dashboard.Controller";

export const DashboardView = DashboardController.view(() => {
  return (
    <div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-900">
      <Background />
      <div class="relative">
        <h2 class="flex flex-row items-center text-4xl font-bold text-white md:text-8xl">
          Coming
          <div class="relative mx-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-caret-up-fill text-blue-500"
              viewBox="0 0 16 16"
            >
              <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
            </svg>
            <div class="absolute -top-12 -rotate-45 transform text-blue-500">
              <p class="rounded-md bg-blue-500 px-2 py-0 text-base font-light text-white">SADO</p>
            </div>
          </div>
          Soon
        </h2>
        <div class="mt-5 flex flex-col items-center">
          <div class="mt-5 max-w-lg text-center text-xl dark:text-white">
            We are currently working on our demo and example modules to get you started using the SADO Protocol as soon
            as possible.
          </div>
          <div class="mt-5 max-w-lg text-center text-xl dark:text-white">
            Stay tuned for future updates in this space.
          </div>
        </div>
      </div>
    </div>
  );
});

function Background() {
  return (
    <div class="grid-background absolute inset-0 grid -skew-y-12 scale-150 transform grid-cols-12 gap-2 p-2">
      <div class="col-span-2 animate-pulse rounded bg-gray-800"></div>
      <div class="col-span-5 animate-pulse rounded bg-gray-800"></div>
      <div class="col-span-1 animate-pulse rounded bg-gray-800"></div>
      <div class="col-span-4 animate-pulse rounded bg-gray-800"></div>

      <div class="col-span-5 animate-pulse rounded bg-gray-800"></div>
      <div class="col-span-3 animate-pulse rounded bg-gray-800"></div>
      <div class="col-span-2 animate-pulse rounded bg-gray-800"></div>
      <div class="col-span-2 animate-pulse rounded bg-gray-800"></div>

      <div class="col-span-4 animate-pulse rounded bg-gray-800"></div>
      <div class="col-span-7 animate-pulse rounded bg-gray-800"></div>
      <div class="col-span-1 animate-pulse rounded bg-gray-800"></div>

      <div class="col-span-4 animate-pulse rounded bg-gray-800"></div>
      <div class="col-span-2 animate-pulse rounded bg-gray-800"></div>
      <div class="col-span-2 animate-pulse rounded bg-gray-800"></div>
      <div class="col-span-2 animate-pulse rounded bg-gray-800"></div>
      <div class="col-span-2 animate-pulse rounded bg-gray-800"></div>

      <div class="col-span-2 animate-pulse rounded bg-gray-800"></div>
      <div class="col-span-5 animate-pulse rounded bg-gray-800"></div>
      <div class="col-span-1 animate-pulse rounded bg-gray-800"></div>
      <div class="col-span-4 animate-pulse rounded bg-gray-800"></div>

      <div class="col-span-4 animate-pulse rounded bg-gray-800"></div>
      <div class="col-span-7 animate-pulse rounded bg-gray-800"></div>
      <div class="col-span-1 animate-pulse rounded bg-gray-800"></div>

      <div class="col-span-5 animate-pulse rounded bg-gray-800"></div>
      <div class="col-span-1 animate-pulse rounded bg-gray-800"></div>
      <div class="col-span-3 animate-pulse rounded bg-gray-800"></div>
      <div class="col-span-3 animate-pulse rounded bg-gray-800"></div>

      <div class="col-span-2 animate-pulse rounded bg-gray-800"></div>
      <div class="col-span-5 animate-pulse rounded bg-gray-800"></div>
      <div class="col-span-1 animate-pulse rounded bg-gray-800"></div>
      <div class="col-span-4 animate-pulse rounded bg-gray-800"></div>
    </div>
  );
}
