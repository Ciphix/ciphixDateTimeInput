import { ReactElement, createElement, Fragment } from "react";

import { CiphixDateTimeInputContainerProps } from "../typings/CiphixDateTimeInputProps";
import { Alert } from "./components/Alert";
import { TextComponent } from "./components/TextComponent";
import { InputComponent } from "./components/InputComponent";
import useSettings from "./hooks/useSettings";

import "./ui/CiphixDateTimeInput.css";

export function CiphixDateTimeInput(props: CiphixDateTimeInputContainerProps): ReactElement {
    const { dateTimeDisplayValue, inputType, className, displayType, disabled } = useSettings(props);

    return (
        <Fragment>
            <TextComponent displayType={displayType} className={className}>
                {dateTimeDisplayValue}
            </TextComponent>
            <InputComponent
                dateTimeAttribute={props.dateTimeAttribute}
                inputType={inputType}
                disabled={disabled}
                className={className}
                displayType={displayType}
                onBlurAction={props.onBlurAction}
                onChangeAction={props.onChangeAction}
                onFocusAction={props.onFocusAction}
            />
            <Alert>{props.dateTimeAttribute?.validation}</Alert>
        </Fragment>
    );
}
