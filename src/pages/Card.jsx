import React from 'react';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
import ProgressBar from '../components/ProgressBar';
import { useSelector } from 'react-redux';
const Card = () => {
  const userData = useSelector((state) => state.userStore);
  const leadData = useSelector((state) => state.leadStore);
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full  mx-auto">



            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Avatars */}
              {/* <DashboardAvatars /> */}
              <p className='text-4xl dark:text-[#fff] text-[#212121]'>Welcome</p>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton />
                {/* Datepicker built with flatpickr */}
                <Datepicker />
                {/* Add view button */}               
              </div>

            </div>

            
          
    <div className="w-full mt-8 px-8 flex justify-between text-2xl dark:text-[#fff]">
      <div className="col-span-12   sm:col-span-6 xl:col-span-3 intro-y ">
       <ProgressBar progress={(leadData.length/100)*100} subtitle={"Leads"}  background={"#ddd"} transitionDuration={0.5} gradient={[{stop: 0.0, color: '#9edeaf'}, {stop: 1, color: '#30f264'}]} />
       </div>
       <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
       <ProgressBar  progress={(userData.length/100)*100} subtitle={"Users"}  background={"#ddd"} transitionDuration={0.5} gradient={[{stop: 0.0, color: '#e39b96'}, {stop: 1, color: '#cc2216'}]} />
       </div>    
        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
       <ProgressBar progress={75} subtitle={"Task"}  background={"#ddd"} transitionDuration={0.5} gradient={[{stop: 0.0, color: '#9de3cf'}, {stop: 1, color: '#0bd49a'}]} />
       </div>     
    </div>

  </div>
  )
}

export default Card;