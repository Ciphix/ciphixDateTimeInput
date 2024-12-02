import { FunctionComponent, createElement } from "react";
import { displayTypeEnum } from "../helpers/types";

export interface TextComponentProps {
    className?: string;
    children?: string;
    displayType?: displayTypeEnum;
}

export const TextComponent: FunctionComponent<TextComponentProps> = ({ className, children, displayType }) =>
    displayType === "text" ? <span className={className}>{children}</span> : null;
