import classNames from "classnames";

export default function AppLogo() {
  const mainClass = classNames(
    "text-base font-medium",
    "mr-8 p-px rounded-lg",
    "bg-gradient-to-r from-success/10 to-white/10",
    "dark:from-success-dark/10 dark:to-white/10"
  );

  return (
    <div className={mainClass}>
      <div className="bg-el dark:bg-el-dark rounded-lg">
        <div className="bg-white/5 rounded-lg px-12 py-1">TCOIN.ME</div>
      </div>
    </div>
  );
}
