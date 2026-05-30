import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props} />
  );
}

export function FaceScanIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M16 3h3a2 2 0 0 1 2 2v3" />
      <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
      <path d="M9 10c.7-.7 1.8-1 3-1s2.3.3 3 1" />
      <path d="M9 15c.9.7 2 .9 3 .9s2.1-.2 3-.9" />
      <path d="M10 12h.01" />
      <path d="M14 12h.01" />
    </BaseIcon>
  );
}

export function FenceIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m4 20 2-15 6 5 6-5 2 15" />
      <path d="M6 8h12" />
      <path d="M5 14h14" />
    </BaseIcon>
  );
}

export function NfcIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M7 5a10 10 0 0 1 0 14" />
      <path d="M11 8a6 6 0 0 1 0 8" />
      <path d="M15 11a2 2 0 0 1 0 2" />
      <path d="M4 12h.01" />
    </BaseIcon>
  );
}

export function HelmetIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 13a8 8 0 1 1 16 0v3H4v-3Z" />
      <path d="M8 16v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2" />
      <path d="M12 5v4" />
    </BaseIcon>
  );
}

export function MachineIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M3 16h18" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
      <path d="M6 16V9h6l2 4h4v3" />
      <path d="M12 9V5h3l2 4" />
    </BaseIcon>
  );
}
