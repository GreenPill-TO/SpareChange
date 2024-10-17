import classNames from "classnames";

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className={classNames("text-center p-6 rounded-lg shadow-lg", "dark:bg-gray-900 dark:text-white", "bg-white text-gray-900")}>{children}</div>
  );
}
