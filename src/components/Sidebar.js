/*eslint-disable*/
import React from "react";

import { Link } from "react-router-dom";
class SidebarLink extends React.Component{
    render(){
        var text = this.props.text
        var icon = this.props.icon
        var link = this.props.link
        var benerGak = (window.location.href.indexOf(link)!==-1)
        return(
            <Link
                  className={
                    "text-xs py-1 px-5 block -lg -lg mt-4 " +
                    (benerGak
                      ? "text-gray-400 bg-white hover:text-gray-500"
                      : "text-white hover:bg-white hover:text-gray-500")
                  }
                  to={link}
                >
                  <i
                    className={
                      "fas "+icon+" mr-2 text-sm "
                    }
                  ></i>{" "}
                  {text}
            </Link>
        )
    }
}
export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl bg-gray-500 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-white opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-gray-400  border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <div
            className="md:block text-left md:pb-2 text-white mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
          >
            Annoying Brand
          </div>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1   bg-gray-500 " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-300">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <div
                    className="md:block text-left md:pb-2 text-white mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
                  >
                    Annoying Brand
                  </div>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-white opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-gray-400  border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />

              <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                  <SidebarLink text="Dashboard" link ="/admin/dashboard" icon="fa-tv"/>
                </li>

                <li className="items-center">
                  <SidebarLink text="Admin" link ="/admin/admin" icon="fa-user"/>
                </li>
                <li className="items-center">
                  <SidebarLink text="Users" link ="/admin/user" icon="fa-users"/>
                </li>
                <li className="items-center">
                  <SidebarLink text="Barang" link ="/admin/barang" icon="fa-box"/>
                </li>
                <li className="items-center">
                  <SidebarLink text="Stocking" link ="/admin/stocking" icon="fa-users"/>
                </li>
                <li className="items-center">
                  <SidebarLink text="Discount" link ="/admin/discount" icon="fa-percent"/>
                </li>
                <li className="items-center">
                  <SidebarLink text="Pembayaran" link ="/admin/pembayaran" icon="fa-credit-card"/>
                </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
