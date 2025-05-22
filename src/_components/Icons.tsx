export function EyeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-gray-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5C7.305 4.5 3.279 7.343 1.5 12c1.779 4.657 5.805 7.5 10.5 7.5s8.721-2.843 10.5-7.5C20.721 7.343 16.695 4.5 12 4.5z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5z"
      />
    </svg>
  );
}

export function EyeOffIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-gray-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.875 18.825A10.05 10.05 0 0 1 12 19.5C7.305 19.5 3.279 16.657 1.5 12a14.74 14.74 0 0 1 3.362-4.647m4.522-2.396A9.774 9.774 0 0 1 12 4.5c4.695 0 8.721 2.843 10.5 7.5a14.55 14.55 0 0 1-2.65 4.078M15.75 12.75a3.75 3.75 0 0 0-4.937-4.937"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.173 9.173a3.75 3.75 0 0 0 5.654 5.654M3 3l18 18"
      />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 6v12M6 12h12"
      />
    </svg>
  );
}

export const TrashIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-trash-2"
    >
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  );
};