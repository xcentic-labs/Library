'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { FC } from "react";

// TypeScript interfaces
interface DashboardData {
  totalLayout: number;
  totalSeats: number;
  bookedSeats: number;
  notBookedSeats: number;
  totalCounsellingRequests: number;
  pendingCounsellingRequests: number;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  percentChange?: number;
  loading: boolean;
}

interface WideStatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  loading: boolean;
}

const AdminDashboard: FC = () => {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalLayout: 0,
    totalSeats: 0,
    bookedSeats: 0,
    notBookedSeats: 0,
    totalCounsellingRequests: 0,
    pendingCounsellingRequests: 0
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    const fetchDashboardData = async (): Promise<void> => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch('/api/admin/dashboard');
        
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        
        const data: DashboardData = await response.json();
        setDashboardData(data);
        setLastUpdated(new Date());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    
  }, []);

  // Stat Card with icon and trend indicator
  const StatCard: FC<StatCardProps> = ({ title, value, icon, color, percentChange, loading }) => (
    <div className={`w-full sm:w-64 h-32 bg-white rounded-xl flex flex-col justify-between p-4 shadow-lg hover:shadow-xl transition-shadow duration-200 border-l-4 ${color}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 font-medium mb-1">{title}</h3>
          <div className="flex items-baseline">
            {loading ? (
              <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
            ) : (
              <p className="text-3xl font-bold text-gray-800">{value.toLocaleString()}</p>
            )}
          </div>
        </div>
        <div className={`p-2 rounded-lg ${color.replace('border', 'bg').replace('-l-4', '/10')}`}>
          {icon}
        </div>
      </div>
      
      {!loading && (
        <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
          <div 
            className={`h-1.5 rounded-full ${color.replace('border', 'bg').replace('-l-4', '')}`} 
            style={{ width: `${Math.min(100, (value / 100) * 100)}%` }}
          ></div>
        </div>
      )}
    </div>
  );

  // Wide Stat Card with icon
  const WideStatCard: FC<WideStatCardProps> = ({ title, value, icon, color, loading }) => (
    <div className={`w-full sm:w-[48%] bg-white rounded-xl flex p-4 shadow-lg hover:shadow-xl transition-shadow duration-200 border-l-4 ${color}`}>
      <div className={`mr-4 p-3 rounded-lg self-center ${color.replace('border', 'bg').replace('-l-4', '/10')}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-gray-500 font-medium mb-1">{title}</h3>
        {loading ? (
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
        ) : (
          <p className="text-3xl font-bold text-gray-800">{value.toLocaleString()}</p>
        )}
      </div>
    </div>
  );

  // Icons for the cards
  const LayoutIcon: FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  );

  const SeatsIcon: FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );

  const BookedIcon: FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const NotBookedIcon: FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const RequestsIcon: FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
    </svg>
  );

  const PendingIcon: FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  // Manual refresh handler
  const handleManualRefresh = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/dashboard');
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      
      const data: DashboardData = await response.json();
      setDashboardData(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Show error state
  if (error) {
    return (
      <section className="w-full h-screen bg-gray-50 p-6 overflow-y-scroll scrollbar ">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-500">
            <div className="flex items-center">
              <div className="mr-4 p-3 bg-red-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Error Loading Dashboard</h3>
                <p className="text-gray-600">{error}</p>
                <button 
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
                  onClick={() => router.refresh()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full h-full bg-gray-50 p-6 overflow-y-scroll scrollbar ">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
        </div>
        
        {/* Seat Overview Section */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Seat Overview</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Total Layout" 
              value={dashboardData.totalLayout} 
              icon={<LayoutIcon />}
              color="border-blue-500"
              percentChange={12}
              loading={loading}
            />
            <StatCard 
              title="Total Seats" 
              value={dashboardData.totalSeats} 
              icon={<SeatsIcon />}
              color="border-purple-500"
              percentChange={5}
              loading={loading}
            />
            <StatCard 
              title="Booked Seats" 
              value={dashboardData.bookedSeats} 
              icon={<BookedIcon />}
              color="border-green-500"
              percentChange={8}
              loading={loading}
            />
            <StatCard 
              title="Not Booked Seats" 
              value={dashboardData.notBookedSeats} 
              icon={<NotBookedIcon />}
              color="border-red-500"
              percentChange={-3}
              loading={loading}
            />
          </div>
        </div>
        
        {/* User Overview Section */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-amber-500/20 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">User Overview</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WideStatCard 
              title="Total Counselling Requests" 
              value={dashboardData.totalCounsellingRequests} 
              icon={<RequestsIcon />}
              color="border-amber-500"
              loading={loading}
            />
            <WideStatCard 
              title="Pending Counselling Requests" 
              value={dashboardData.pendingCounsellingRequests} 
              icon={<PendingIcon />}
              color="border-indigo-500"
              loading={loading}
            />
          </div>
        </div>
        
        {/* Summary/Stats Section */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <div className="bg-emerald-500/20 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Summary</h2>
          </div>
          
          {loading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-3">
                Your platform currently has <span className="font-semibold text-gray-800">{dashboardData.totalLayout}</span> layout configurations with a total of <span className="font-semibold text-gray-800">{dashboardData.totalSeats}</span> seats.
              </p>
              <p className="text-gray-600 mb-3">
                Out of these, <span className="font-semibold text-gray-800">{dashboardData.bookedSeats}</span> seats are booked, representing <span className="font-semibold text-gray-800">{dashboardData.totalSeats > 0 ? Math.round((dashboardData.bookedSeats / dashboardData.totalSeats) * 100) : 0}%</span> occupancy rate.
              </p>
              <p className="text-gray-600">
                There are currently <span className="font-semibold text-gray-800">{dashboardData.pendingCounsellingRequests}</span> pending counselling requests out of <span className="font-semibold text-gray-800">{dashboardData.totalCounsellingRequests}</span> total requests.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;