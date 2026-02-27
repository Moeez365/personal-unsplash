import React from "react";
import { NavLink, Link, Outlet } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav className="h-15 flex items-center bg-white justify-between px-5 sm:px-10 border-b border-b-(--primary-color) fixed top-0 w-full z-10">
        <Link to={"/"}>
          <img src="/Logo.svg" className="w-30 sm:w-40" alt="" />
        </Link>

        <div className="flex gap-3 sm:gap-5">
          {["Home", "Collection"].map((items, index) => (
            <NavLink
              key={index}
              to={items.toLocaleLowerCase() == "home" ? "/" : "collection"}
              className={({ isActive }) =>
                isActive
                  ? "bg-(--primary-color) px-3 md:px-7 py-1 rounded"
                  : "px-3 md:px-7 py-1 rounded"
              }
            >
              {items}
            </NavLink>
          ))}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Nav;
