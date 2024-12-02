import { ReactElement, createElement } from "react";
import { CiphixDateTimeInputPreviewProps } from "../typings/CiphixDateTimeInputProps";

export function preview(props: CiphixDateTimeInputPreviewProps): ReactElement {
    return (
        <input
            type={props.inputType === "datetime" ? "datetime-local" : props.inputType}
            className="form-control"
            readOnly={props.readOnly}
        ></input>
    );
}

export function getPreviewCss(): string {
    return require("./ui/CiphixDateTimeInput.css");
}
