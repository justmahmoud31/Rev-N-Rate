/* eslint-disable */
import classNames from "classnames";
import { Link } from "react-router-dom";

export default function Heading({ className, value1, value2, to, link }) {
  return (
    <div className={classNames("text-center", className)}>
      <h1 className="text-3xl md:text-2xl lg:text-4xl   font-bold tracking-tight sm:text-6xl">
        {value1}
      </h1>
      <Link className="text-black underline" to={to}> {value2}</Link>
      {link === "yes" && <span aria-hidden="true"> →</span>}

    </div>
  );
}
