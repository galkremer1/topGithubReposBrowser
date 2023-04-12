import { errorMessage } from "@/app/types/errorMessage";

interface ErrorProps {
  error: errorMessage;
}

export function Error({ error }: ErrorProps) {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 p-4"
      role="alert"
    >
      <strong>Oh no!</strong> Something went wrong. Please try again later.
      <a href={error.url} target="_blank" rel="noopener noreferrer">
        <div className="cursor-pointer">{error.message}</div>
      </a>
    </div>
  );
}
