import { useEffect, useState } from "react";
import { CiphixDateTimeInputContainerProps } from "../../typings/CiphixDateTimeInputProps";
import { CiphixDateTimeInputSettings, inputTypeEnum, displayTypeEnum, dateTimePatterns } from "../helpers/types";
import { format } from "date-fns";

// Try to get dateTimePatterns from session, return default otherwise
const getDateTimePatterns = (): dateTimePatterns => {
    // @ts-ignore
    const mxSessionPatterns: dateTimePatterns = mx.session.sessionData.locale.patterns;
    const date: string = mxSessionPatterns.date !== undefined ? mxSessionPatterns.date : "yyyy-MM-dd";
    const time: string = mxSessionPatterns.time !== undefined ? mxSessionPatterns.date : "HH:mm";
    const datetime: string = mxSessionPatterns.datetime !== undefined ? mxSessionPatterns.datetime : "yyyy-MM-dd HH:mm";

    return {
        date,
        time,
        datetime
    };
};

// Format the Mendix DateTime for textual display
const getDateTimeDisplayValue = (input: Date, type: inputTypeEnum, patterns: dateTimePatterns): string | undefined => {
    return type === "date"
        ? format(input, patterns.date)
        : type === "time"
        ? format(input, patterns.time)
        : format(input, patterns.datetime);
};

export default function useSettings(props: CiphixDateTimeInputContainerProps): CiphixDateTimeInputSettings {
    const [className, setClassName] = useState<string>();
    const [displayType, setDisplayType] = useState<displayTypeEnum>();
    const [dateTimeDisplayValue, setDateTimeDisplayValue] = useState<string | undefined>();
    const [disabled, setDisabled] = useState<boolean>();

    const patterns: dateTimePatterns = getDateTimePatterns();
    const inputType: inputTypeEnum =
        props.inputType === "date" ? "date" : props.inputType === "time" ? "time" : "datetime-local";

    // Format the dateTimeValue
    useEffect(() => {
        if (props.dateTimeAttribute?.value) {
            setDateTimeDisplayValue(getDateTimeDisplayValue(props.dateTimeAttribute.value, inputType, patterns));
        } else {
            setDateTimeDisplayValue(undefined);
        }
    }, [props.dateTimeAttribute, props.dateTimeAttribute?.value, inputType, patterns]);

    // Check if the item is editable and set className and displayType accordingly
    useEffect(() => {
        if (props.dateTimeAttribute?.readOnly === true && props.readOnlyStle !== "control") {
            setClassName("form-control-static widget-dateTimeInput");
            setDisplayType("text");
            setDisabled(undefined);
        } else {
            setClassName("form-control widget-dateTimeInput");
            setDisplayType("input");
            if (props.dateTimeAttribute?.readOnly === true) {
                setDisabled(true);
            } else {
                setDisabled(undefined);
            }
        }
    }, [props.dateTimeAttribute?.readOnly, props.readOnlyStle]);

    return {
        dateTimeDisplayValue,
        inputType,
        className,
        displayType,
        disabled
    };
}
