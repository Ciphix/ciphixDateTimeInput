import { EditableValue, ActionValue } from "mendix";
import { FunctionComponent, createElement, useState, useEffect, ChangeEvent } from "react";
import { displayTypeEnum, inputTypeEnum } from "../helpers/types";
import { parse, parseISO, format } from "date-fns";

export interface InputComponentProps {
    dateTimeAttribute: EditableValue<Date>;
    inputType?: inputTypeEnum;
    placeholderValue?: string;
    className?: string;
    displayType?: displayTypeEnum;
    disabled?: boolean;
    onChangeAction?: ActionValue;
    onFocusAction?: ActionValue;
    onBlurAction?: ActionValue;
    minValue?: Date;
    maxValue?: Date;
}

const executeAction = (action: ActionValue | undefined): void => {
    if (action && action.canExecute && !action.isExecuting) {
        action.execute();
    }
};

const getPaddedString = (input: number): string => {
    return String(input).padStart(2, "0");
};

// Get the ISO date/time/datetime string from the Mendix DateTime for the HTML input
const getDateTimeValue = (input: Date, type: inputTypeEnum | undefined): string | undefined => {
    const dateString: string =
        input.getFullYear() + "-" + getPaddedString(input.getMonth() + 1) + "-" + getPaddedString(input.getDate());
    const timeString: string = getPaddedString(input.getHours()) + ":" + getPaddedString(input.getMinutes());

    return type === "date" ? dateString : type === "time" ? timeString : dateString + "T" + timeString;
};

const parseDate = (input: string, type: inputTypeEnum): Date | undefined => {
    if (input.length === 0) {
        return undefined;
    }

    if (type === "time") {
        return parse(input, "HH:mm", new Date());
    } else {
        return parseISO(input);
    }
};

// Based on the inputType and whether the date was set in Mendix and/or the widget; return either date, or combine the two
const getProcessedDate = (
    mxDate: Date | undefined,
    newDate: Date | undefined,
    type: inputTypeEnum
): Date | undefined => {
    if (mxDate === undefined && newDate === undefined) {
        return undefined;
    }

    if (mxDate === undefined || type === "datetime-local") {
        return newDate;
    }

    if (type === "time") {
        return parseDate(
            format(mxDate, "yyyy-MM-dd") + "T" + format(newDate ? newDate : mxDate, "HH:mm"),
            "datetime-local"
        );
    } else {
        return parseDate(
            format(newDate ? newDate : mxDate, "yyyy-MM-dd") + "T" + format(mxDate, "HH:mm"),
            "datetime-local"
        );
    }
};

export const InputComponent: FunctionComponent<InputComponentProps> = (props: InputComponentProps) => {
    const [dateTimeValue, setDateTimeValue] = useState<string | undefined>();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [minValue, setMinValue] = useState<string | undefined>();
    const [maxValue, setMaxValue] = useState<string | undefined>();

    // Format the dateTimeValue
    useEffect(() => {
        if (props.dateTimeAttribute?.value && !isEditing) {
            setDateTimeValue(getDateTimeValue(props.dateTimeAttribute.value, props.inputType));
        } else {
            setDateTimeValue(undefined);
        }
    }, [props.dateTimeAttribute, props.dateTimeAttribute?.value, props.inputType, isEditing]);

    // Format the min value
    useEffect(() => {
        if (props.minValue) {
            setMinValue(getDateTimeValue(props.minValue, props.inputType));
        } else {
            setMinValue(undefined);
        }
    }, [props.minValue, props.inputType]);

    // Format the max value
    useEffect(() => {
        if (props.maxValue) {
            setMaxValue(getDateTimeValue(props.maxValue, props.inputType));
        } else {
            setMaxValue(undefined);
        }
    }, [props.maxValue, props.inputType]);

    const handleBlur = (e: ChangeEvent<HTMLInputElement>): void => {
        if (props.inputType === undefined) {
            return;
        }

        const newDate = getProcessedDate(
            props.dateTimeAttribute.value,
            parseDate(e.target.value, props.inputType),
            props.inputType
        );
        const hasChange = newDate !== props.dateTimeAttribute.value;

        if (hasChange) {
            props.dateTimeAttribute.setValue(newDate);
            executeAction(props.onChangeAction);
        }
        executeAction(props.onBlurAction);
        setIsEditing(false);
    };

    const handleFocus = (): void => {
        setIsEditing(true);
        executeAction(props.onFocusAction);
    };

    return props.displayType === "input" ? (
        <input
            type={props.inputType}
            value={dateTimeValue}
            placeholder={props.placeholderValue}
            className={props.className}
            disabled={props.disabled}
            onBlur={handleBlur}
            onFocus={handleFocus}
            min={minValue}
            max={maxValue}
        ></input>
    ) : null;
};
