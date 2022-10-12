import { memo, forwardRef } from "react";
import "./styles.local.css";

const TextInput = forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input ref={ref} className={`text-input mr-sm ${className}`} {...props} />
  );
});

export default memo(TextInput);
