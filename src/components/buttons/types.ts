export declare interface UseButtonStyleProps {
  color?: "primary" | "secondary";
}

type ButtonHTMLAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorHTMLAttributes = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export declare type ButtonProps = {
  children?: string;
} & ButtonHTMLAttributes &
  UseButtonStyleProps;

export declare type ButtonLinkProps = {
  children?: string;
} & AnchorHTMLAttributes &
  UseButtonStyleProps;

export declare type RedirectButtonProps = {
  href: string;
} & ButtonProps;
