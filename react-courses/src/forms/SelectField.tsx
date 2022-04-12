import { ErrorMessage, Field, FieldInputProps, FormikProps } from "formik";
import { courseCreationDTO } from "../courses/courses.model";
import { genericModelDTO } from "./genericModel.model";

export default function SelectField(props: selectFieldProps) {
  return (
    <div className="mb-3">
      <label htmlFor={props.field}>{props.displayName}</label>
      <Field
        id={props.field}
        as="select"
        className="form-select"
        {...props.other.getFieldProps(props.field)}
      >
        <option>{props.message}</option>
        {props.options.map((prop) => (
          <option key={prop.id} value={prop.id}>
            {prop.name}
          </option>
        ))}
      </Field>
      <ErrorMessage name={props.field}>
        {(msg) => <div className="text-danger">{msg}</div>}
      </ErrorMessage>
    </div>
  );
}

interface selectFieldProps {
  field: string;
  displayName: string;
  options: genericModelDTO[];
  message: string;
  other: FormikProps<courseCreationDTO>;
}
