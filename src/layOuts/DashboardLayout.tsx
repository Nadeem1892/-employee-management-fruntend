import React, { useState } from 'react'
import ATMAppHeader from '../Components/Atoms/Headers/ATMAppHeader'
import { Link, Outlet } from 'react-router-dom'

type Props = {}

const DashboardLayout = (props: Props) => {
  // Initialize activeLink state with 'dashboard' to make it active by default
  const [isNavBarExpanded, setIsNavBarExpanded] = useState(true)
  const [activeLink, setActiveLink] = useState<string>('dashboard') // Default is 'dashboard'

  // Function to handle active link state change
  const handleLinkClick = (link: string) => {
    setActiveLink(link); // Set the clicked link as active
  }

  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="w-full h-[3.5rem]">
        <ATMAppHeader setIsNavBarExpanded={setIsNavBarExpanded} />
      </div>

      <div className="w-full h-[calc(100%-3.5rem)] flex lg:static relative ">
        <div
          className={`h-full transition-all duration-500 overflow-x-hidden lg:static absolute z-50 ${
            isNavBarExpanded ? 'w-[270px] bg-slate-100' : 'w-0'
          }`}
        >
          <div className="w-full h-full px-2 py-4 overflow-x-hidden overflow-y-auto border-r shadow bg-primary-99">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center text-[#58bf81] px-5 text-[12px] font-bold tracking-widest text-primary-70 uppercase">
                  Dashboard
                </div>

                <div className="flex flex-col gap-1">
                  <div
                    className={`flex items-center justify-between w-full px-5 py-2 text-sm font-semibold transition-all duration-300 ease-in rounded ${
                      activeLink === 'dashboard' ? 'bg-green-300 text-white border-l-4 border-green-500' : 'bg-transparent'
                    }`}
                    onClick={() => handleLinkClick('dashboard')}
                  >
                    <Link to="/">Dashboard</Link>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div
                    className={`flex items-center justify-between w-full px-5 py-2 text-sm font-semibold transition-all duration-300 rounded ${
                      activeLink === 'employee' ? 'bg-green-300 text-white border-l-4 border-green-500' : 'bg-transparent'
                    }`}
                    onClick={() => handleLinkClick('employee')}
                  >
                    <Link to="employee">Employee</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 h-full p-2 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
