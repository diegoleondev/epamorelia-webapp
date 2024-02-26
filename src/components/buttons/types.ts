export declare interface UseButtonStyleProps {
  color?: "primary" | "secondary" | "transparent";
  icon?: boolean;
}

type ButtonHTMLAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorHTMLAttributes = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export declare type ButtonProps = {
  children?: React.ReactNode;
} & ButtonHTMLAttributes &
  UseButtonStyleProps;

export declare type ButtonLinkProps = {
  children?: React.ReactNode;
} & AnchorHTMLAttributes &
  UseButtonStyleProps;

export declare type RedirectButtonProps = {
  href: string;
} & ButtonProps;

export declare type ButtonAsyncProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => Promise<unknown>;
} & ButtonProps;
