import { forwardRef, useMemo, useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useConfig } from '../ConfigProvider';
import { useForm } from '../Form/context';
import { useInputGroup } from '../InputGroup/context';
import { CONTROL_SIZES } from '../utils/constants';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import get from 'lodash/get';
import type { CommonProps, TypeAttributes } from '../@types/common';
import type {
    TextareaHTMLAttributes,
    ElementType,
    ReactNode
} from 'react';

export interface TextareaProps
    extends CommonProps,
        Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
    asElement?: ElementType;
    disabled?: boolean;
    invalid?: boolean;
    prefix?: string | ReactNode;
    size?: TypeAttributes.ControlSize;
    suffix?: string | ReactNode;
    unstyle?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form?: any;
}

const Textarea = forwardRef<ElementType | HTMLTextAreaElement, TextareaProps>(
    (props, ref) => {
        const {
            asElement: Component = 'textarea',
            className,
            disabled,
            invalid,
            prefix,
            size,
            suffix,
            style,
            unstyle = false,
            field,
            form,
            ...rest
        } = props;

        const [prefixGutter, setPrefixGutter] = useState(0);
        const [suffixGutter, setSuffixGutter] = useState(0);

        const { themeColor, controlSize, primaryColorLevel, direction } =
            useConfig();
        const formControlSize = useForm()?.size;
        const inputGroupSize = useInputGroup()?.size;

        const textareaSize =
            size || inputGroupSize || formControlSize || controlSize;

        const fixControlledValue = (
            val: string | number | readonly string[] | undefined
        ) => {
            if (typeof val === 'undefined' || val === null) {
                return '';
            }
            return val;
        };

        if ('value' in props) {
            rest.value = fixControlledValue(props.value);
            delete rest.defaultValue;
        }

        const isInvalid = useMemo(() => {
            let validate = false;
            if (!isEmpty(form)) {
                const { touched, errors } = form;
                const touchedField = get(touched, field.name);
                const errorField = get(errors, field.name);
                validate = touchedField && errorField;
            }
            if (typeof invalid === 'boolean') {
                validate = invalid;
            }
            return validate;
        }, [form, invalid, field]);

        const textareaDefaultClass = 'textarea';
        const textareaSizeClass = `textarea-${textareaSize} h-${CONTROL_SIZES[textareaSize]}`;
        const textareaFocusClass = `focus:ring-${themeColor}-${primaryColorLevel} focus-within:ring-${themeColor}-${primaryColorLevel} focus-within:border-${themeColor}-${primaryColorLevel} focus:border-${themeColor}-${primaryColorLevel}`;
        const textareaWrapperClass = `textarea-wrapper ${
            prefix || suffix ? className : ''
        }`;
        const textareaClass = classNames(
            textareaDefaultClass,
            textareaSizeClass,
            !isInvalid && textareaFocusClass,
            !prefix && !suffix ? className : '',
            disabled && 'textarea-disabled',
            isInvalid && 'textarea-invalid'
        );

        const prefixNode = useRef<HTMLDivElement>(null);
        const suffixNode = useRef<HTMLDivElement>(null);

        const getAffixSize = () => {
            if (!prefixNode.current && !suffixNode.current) {
                return;
            }
            const prefixNodeWidth = prefixNode?.current?.offsetWidth;
            const suffixNodeWidth = suffixNode?.current?.offsetWidth;

            if (isNil(prefixNodeWidth) && isNil(suffixNodeWidth)) {
                return;
            }

            if (prefixNodeWidth) {
                setPrefixGutter(prefixNodeWidth);
            }

            if (suffixNodeWidth) {
                setSuffixGutter(suffixNodeWidth);
            }
        };

        useEffect(() => {
            getAffixSize();
        }, [prefix, suffix]);

        const remToPxConvertion = (pixel: number) => 0.0625 * pixel;

        const affixGutterStyle = () => {
            const leftGutter = `${remToPxConvertion(prefixGutter) + 1}rem`;
            const rightGutter = `${remToPxConvertion(suffixGutter) + 1}rem`;
            const gutterStyle: {
                paddingLeft?: string;
                paddingRight?: string;
            } = {};

            if (direction === 'ltr') {
                if (prefix) {
                    gutterStyle.paddingLeft = leftGutter;
                }

                if (suffix) {
                    gutterStyle.paddingRight = rightGutter;
                }
            }

            if (direction === 'rtl') {
                if (prefix) {
                    gutterStyle.paddingRight = leftGutter;
                }

                if (suffix) {
                    gutterStyle.paddingLeft = rightGutter;
                }
            }

            return gutterStyle;
        };

        const TextareaProps = {
            className: !unstyle ? textareaClass : '',
            disabled,
            ref,
            ...field,
            ...rest
        };

        const renderTextarea = (
            <Component
                style={{ ...affixGutterStyle(), ...style }}
                {...TextareaProps}
            />
        );

        const renderAffixTextarea = (
            <span className={textareaWrapperClass}>
                {prefix ? (
                    <div ref={prefixNode} className="textarea-prefix">
                        {prefix}
                    </div>
                ) : null}
                {renderTextarea}
                {suffix ? (
                    <div ref={suffixNode} className="textarea-suffix">
                        {suffix}
                    </div>
                ) : null}
            </span>
        );

        const renderChildren = () => {
            if (prefix || suffix) {
                return renderAffixTextarea;
            } else {
                return renderTextarea;
            }
        };

        return renderChildren();
    }
);

Textarea.displayName = 'Textarea';

export default Textarea;
