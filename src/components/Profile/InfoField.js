import { FaLock, FaCalendarAlt } from "react-icons/fa";

export default function InfoField({
  label,

  value,

  editable = false,

  name,

  onChange,

  type = "text",

  textarea = false,

  placeholder = "",

  icon = null,

  readOnly = false,
}) {
  const renderValue = () => {
    if (!value) return "-";

    if (type === "date") {
      try {
        return new Date(value).toLocaleDateString();
      } catch {
        return value;
      }
    }

    return value;
  };

  return (
    <div className="gx-field">
      <label>
        {icon && <span className="gx-field-label-icon">{icon}</span>}

        {label}
      </label>

      {editable ? (
        <div className="gx-input-wrapper">
          {textarea ? (
            <textarea
              rows={3}
              name={name}
              value={value || ""}
              onChange={onChange}
              placeholder={placeholder}
              readOnly={readOnly}
            />
          ) : (
            <input
              type={type}
              name={name}
              value={value || ""}
              onChange={onChange}
              placeholder={placeholder}
              readOnly={readOnly}
            />
          )}

          {readOnly && <FaLock className="gx-lock" />}
        </div>
      ) : (
        <div className="gx-field-value">
          {type === "date" ? (
            <>
              <FaCalendarAlt />

              <span>{renderValue()}</span>
            </>
          ) : (
            renderValue()
          )}
        </div>
      )}
    </div>
  );
}
