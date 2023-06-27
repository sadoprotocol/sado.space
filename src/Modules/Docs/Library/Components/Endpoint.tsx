export function Endpoint({ type, url }: Props) {
  return (
    <div class="border-b border-slate-700 py-2 pl-4">
      <span class="inline-block text-sm font-semibold text-sky-600">{type}</span>
      <span class="ml-2 inline-block text-sm text-slate-400">{url}</span>
    </div>
  );
}

type Props = {
  type: "POST" | "GET" | "PUT" | "DELETE";
  url: string;
};
