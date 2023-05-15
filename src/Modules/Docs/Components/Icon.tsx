import { nanoid } from "nanoid";

import { InstallationIcon } from "./Icons/InstallationIcon";
import { LBIcon } from "./Icons/LightbulbIcon";
import { PluginsIcon } from "./Icons/PluginsIcon";
import { PresetsIcon } from "./Icons/PresetsIcon";
import { ThemingIcon } from "./Icons/ThemingIcon";
import { WarnIcon } from "./Icons/WarningIcon";

const icons = {
  installation: InstallationIcon,
  presets: PresetsIcon,
  plugins: PluginsIcon,
  theming: ThemingIcon,
  lightbulb: LBIcon,
  warning: WarnIcon
};

const iconStyles = {
  blue: "[--icon-foreground:theme(colors.slate.900)] [--icon-background:theme(colors.white)]",
  amber: "[--icon-foreground:theme(colors.amber.900)] [--icon-background:theme(colors.amber.100)]"
};

export function Icon({ color = "blue", icon, className, ...props }: any) {
  const id = nanoid(6);
  const IconComponent = icons[icon];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      fill="none"
      classList={{
        [className]: true,
        [iconStyles[color]]: true
      }}
      {...props}
    >
      <IconComponent id={id} color={color} />
    </svg>
  );
}

const gradients = {
  blue: [{ stopColor: "#0EA5E9" }, { stopColor: "#22D3EE", offset: ".527" }, { stopColor: "#818CF8", offset: 1 }],
  amber: [
    { stopColor: "#FDE68A", offset: ".08" },
    { stopColor: "#F59E0B", offset: ".837" }
  ]
};

export function Gradient({ color = "blue", ...props }) {
  return (
    <radialGradient cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" {...props}>
      {gradients[color].map((stop, stopIndex) => (
        <stop key={stopIndex} {...stop} />
      ))}
    </radialGradient>
  );
}

export function LightMode({ className = "", ...props }) {
  return (
    <g
      classList={{
        "dark:hidden": true,
        [className]: true
      }}
      {...props}
    />
  );
}

export function DarkMode({ className = "", ...props }) {
  return (
    <g
      classList={{
        "hidden dark:inline": true,
        [className]: true
      }}
      {...props}
    />
  );
}
