import React, { useState } from 'react'
import ATMAppHeader from '../Components/Atoms/Headers/ATMAppHeader'
import { Link, Outlet } from 'react-router-dom'

type Props = {}

const DashboardLayout = (props: Props) => {
  const [isNavBarExpanded, setIsNavBarExpanded] = useState(true) // Default sidebar state
  const [activeLink, setActiveLink] = useState<string>('dashboard') // Active link state

  // Function to handle active link state change and collapse sidebar on smaller screens
  const handleLinkClick = (link: string) => {
    setActiveLink(link) // Set the clicked link as active
    // Collapse sidebar only for small screens (less than 1024px width)
    if (window.innerWidth < 1024) {
      setIsNavBarExpanded(false) 
    }
  }

  return (
    <div className="flex flex-col w-screen h-screen">
      {/* Header Section */}
      <div className="w-full h-[3.5rem]">
        <ATMAppHeader setIsNavBarExpanded={setIsNavBarExpanded} />
      </div>

      {/* Sidebar and Main Content Section */}
      <div className="w-full h-[calc(100%-3.5rem)] flex lg:static relative">
        
        {/* Sidebar */}
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

                {/* Dashboard Link */}
                <Link to="/" className="flex flex-col gap-1">
                  <div
                    className={`flex items-center justify-between w-full px-5 py-2 text-sm font-semibold transition-all duration-300 ease-in rounded ${
                      activeLink === 'dashboard' ? 'bg-green-300 text-white border-l-4 border-green-500' : 'bg-transparent'
                    }`}
                    onClick={() => handleLinkClick('dashboard')}
                  >
                    Dashboard
                  </div>
                </Link>

                {/* Employee Link */}
                <Link to="employee" className="flex flex-col gap-1">
                  <div
                    className={`flex items-center justify-between w-full px-5 py-2 text-sm font-semibold transition-all duration-300 rounded ${
                      activeLink === 'employee' ? 'bg-green-300 text-white border-l-4 border-green-500' : 'bg-transparent'
                    }`}
                    onClick={() => handleLinkClick('employee')}
                  >
                    Employee
                  </div>
                </Link>

              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 h-full p-2 overflow-auto">
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default DashboardLayout
