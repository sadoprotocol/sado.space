import { HeroTextController } from "./HeroText.Controller";

export const HeroText = HeroTextController.view(({ state }) => {
  return (
    <span>
      {state.prefix} {state.text}
    </span>
  );
});
