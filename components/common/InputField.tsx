interface IProps {
  name: string;
  placeholder: string;
  type?: "email" | "text" | "password";
  title: string;
  error?: string;
  handleOnChange?: (value: string, name: string) => void;
}

export default function InputField({
  name,
  title,
  error,
  type = "text",
  placeholder,
  handleOnChange,
}: IProps) {
  return (
    <div className="mt-5 flex-col flex gap-2">
      <label className="text-base font-medium text-primary" htmlFor="email">
        {title}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className="h-12 rounded-lg p-4 outline-0 border border-c-border"
        onChange={(e) => handleOnChange && handleOnChange(e.target.value, name)}
      />
      <span className="text-red-400">{error}</span>
    </div>
  );
}
