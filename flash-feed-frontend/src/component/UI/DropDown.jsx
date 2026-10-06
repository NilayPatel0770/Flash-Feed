import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DropDown() {
  return (
    <Menu as="div" className="relative block sm:hidden text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-lg bg-card border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm font-semibold text-main-text shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition">
          Select
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-muted-text"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-card border border-slate-200 dark:border-slate-700 shadow-xl focus:outline-none overflow-hidden">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/home"
                  className={classNames(
                    active
                      ? "bg-blue-600 text-white"
                      : "text-main-text hover:bg-slate-100 dark:hover:bg-slate-800",
                    "block px-4 py-2.5 text-sm font-medium transition"
                  )}
                >
                  For You
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/top-stories"
                  className={classNames(
                    active
                      ? "bg-blue-600 text-white"
                      : "text-main-text hover:bg-slate-100 dark:hover:bg-slate-800",
                    "block px-4 py-2.5 text-sm font-medium transition"
                  )}
                >
                  Top Stories
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/trending"
                  className={classNames(
                    active
                      ? "bg-blue-600 text-white"
                      : "text-main-text hover:bg-slate-100 dark:hover:bg-slate-800",
                    "block px-4 py-2.5 text-sm font-medium transition"
                  )}
                >
                  Trending
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/saved-news"
                  className={classNames(
                    active
                      ? "bg-blue-600 text-white"
                      : "text-main-text hover:bg-slate-100 dark:hover:bg-slate-800",
                    "block px-4 py-2.5 text-sm font-medium transition"
                  )}
                >
                  Saved News
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}