import { ReactElement, createElement, Fragment, FunctionComponent } from "react";
import { CiphixDateTimeInputPreviewProps } from "../typings/CiphixDateTimeInputProps";
import { displayTypeEnum, inputTypeEnum } from "./helpers/types";
import { TextComponent } from "./components/TextComponent";

interface InputComponentProps {
    displayType: displayTypeEnum;
    inputType?: inputTypeEnum;
    value?: string;
    className?: string;
    disabled: boolean;
}

const InputComponent: FunctionComponent<InputComponentProps> = (props: InputComponentProps) => {
    return props.displayType === "input" ? (
        <input type={props.inputType} value={props.value} className={props.className} disabled={props.disabled}></input>
    ) : null;
};

export function preview(props: CiphixDateTimeInputPreviewProps): ReactElement {
    const displayType: displayTypeEnum = props.readOnly && props.readOnlyStle === "text" ? "text" : "input";
    const inputType: inputTypeEnum =
        props.inputType === "date" ? "date" : props.inputType === "time" ? "time" : "datetime-local";

    return (
        <Fragment>
            <TextComponent displayType={displayType} className={"form-control-static widget-dateTimeInput"}>
                {props.dateTimeAttribute}
            </TextComponent>

            <InputComponent
                inputType={inputType}
                disabled={props.readOnly}
                className={"form-control widget-dateTimeInput"}
                displayType={displayType}
            />
        </Fragment>
    );
}

export function getPreviewCss(): string {
    return require("./ui/CiphixDateTimeInput.css");
}
