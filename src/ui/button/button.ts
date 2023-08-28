export type Size = 'medium' | 'small' | 'large';

export interface IButton {
    readonly size?: Size;
    readonly onClick?: () => void;
}
