export type inputTypeEnum = "date" | "time" | "datetime-local";
export type displayTypeEnum = "input" | "text";

export interface CiphixDateTimeInputSettings {
    dateTimeDisplayValue?: string;
    inputType?: inputTypeEnum;
    className?: string;
    displayType?: displayTypeEnum;
    disabled?: boolean;
    minValue?: Date;
    maxValue?: Date;
}

export interface dateTimePatterns {
    date: string;
    datetime: string;
    time: string;
}
