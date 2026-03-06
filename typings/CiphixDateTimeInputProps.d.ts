/**
 * This file was generated from CiphixDateTimeInput.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ActionValue, EditableValue } from "mendix";

export type InputTypeEnum = "date" | "time" | "datetime";

export type MinValueSourceEnum = "attribute" | "constant";

export type MaxValueSourceEnum = "attribute" | "constant";

export type ReadOnlyStleEnum = "control" | "text";

export interface CiphixDateTimeInputContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    inputType: InputTypeEnum;
    dateTimeAttribute: EditableValue<Date>;
    useMinValue: boolean;
    minValueSource: MinValueSourceEnum;
    minValue?: EditableValue<Date>;
    minValueText: string;
    useMaxValue: boolean;
    maxValueSource: MaxValueSourceEnum;
    maxValueText: string;
    maxValue?: EditableValue<Date>;
    readOnlyStle: ReadOnlyStleEnum;
    onChangeAction?: ActionValue;
    onFocusAction?: ActionValue;
    onBlurAction?: ActionValue;
}

export interface CiphixDateTimeInputPreviewProps {
    readOnly: boolean;
    renderMode?: "design" | "xray" | "structure";
    inputType: InputTypeEnum;
    dateTimeAttribute: string;
    useMinValue: boolean;
    minValueSource: MinValueSourceEnum;
    minValue: string;
    minValueText: string;
    useMaxValue: boolean;
    maxValueSource: MaxValueSourceEnum;
    maxValueText: string;
    maxValue: string;
    readOnlyStle: ReadOnlyStleEnum;
    onChangeAction: {} | null;
    onFocusAction: {} | null;
    onBlurAction: {} | null;
}
