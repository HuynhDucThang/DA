"use client";

import { useFormStatus } from "react-dom";

interface IProps {}

export default function BtnSubmit({ value, ...props }: any) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Loading..." : value}
    </button>
  );
}
