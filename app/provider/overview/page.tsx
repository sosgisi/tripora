import { Calendar, DollarSign, MapPin, Users } from "lucide-react";

export default function Overview(){
    return(
        <div>
            <h1 className="text-heading">Dashboard Overview</h1>
            <p className="text-sub-heading">{`Welcome back! Here's what's happening with your travel platform.`}</p>
            <div className="grid grid-cols-4 gap-5 mt-5">
                <div className="overview-card">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-primary font-medium">Total Trips</h1>
                        <h1 className="text-black dark:text-white font-bold text-2xl">1,234</h1>
                        <p className="text-green-700 text-sm font-light">+12% from last month</p>
                    </div>
                    <MapPin size={35} className="text-blue-500"/>
                </div>
                <div className="overview-card">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-primary font-medium">Active Booking</h1>
                        <h1 className="text-black dark:text-white font-bold text-2xl">856</h1>
                        <p className="text-green-700 text-sm font-light">+8% from last month</p>
                    </div>
                    <Calendar size={35} className="text-green-600"/>
                </div>
                <div className="overview-card">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-primary font-medium">Total Revenue</h1>
                        <h1 className="text-black dark:text-white font-bold text-2xl">Rp. 2.5B</h1>
                        <p className="text-green-700 text-sm font-light">+15% from last month</p>
                    </div>
                    <DollarSign size={35} className="text-yellow-500"/>
                </div>
                <div className="overview-card">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-primary font-medium">Total Users</h1>
                        <h1 className="text-black dark:text-white font-bold text-2xl">12,456</h1>
                        <p className="text-green-700 text-sm font-light">+23% from last month</p>
                    </div>
                    <Users size={35} className="text-indigo-500"/>
                </div>
            </div>
        </div>
    )
}