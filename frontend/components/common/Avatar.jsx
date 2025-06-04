import { cn } from "../../src/assets/ีutils/tw-merge";

export default function Avatar({ className, src, ...props }) {
  return (
    <div
      className={cn(
        "flex border-2 p-2 rounded-full border-[#5D9BCF] size-19 overflow-hidden",
        className
      )}
      {...props}
    >
      <img className="object-cover rounded-full" src='/images/Mee.png' alt="avatar" />
    </div>
  );
}
