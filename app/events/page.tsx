'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingLink } from '@/components/LoadingLink';
import api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

import ResponsiveLayout from '@/components/ResponsiveLayout';

export default function EventsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'registered' | 'upcoming' | 'closed'>('all');
  const [registrations, setRegistrations] = useState<Set<string>>(new Set());
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    if (!authLoading) {
      fetchEvents();
      fetchUserProfile();
    }
  }, [authLoading]);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/profiles/me');
      if (response.data.success) {
        setUserProfile(response.data.profile);
      }
    } catch (error) {
      console.error('Fetch profile error:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const [eventsRes, registeredRes] = await Promise.all([
        api.get('/events'),
        api.get('/events/user/registered')
      ]);

      if (eventsRes.data.success) {
        setEvents(eventsRes.data.events || []);

        // Log all events with their dates
        console.log('📅 [FRONTEND - EVENTS] Events fetched successfully:', {
          totalEvents: eventsRes.data.events?.length || 0,
          fetchedAt: new Date().toISOString(),
          events: eventsRes.data.events?.map((evt: any) => ({
            eventId: evt._id,
            title: evt.title,
            location: evt.location,
            startDate: evt.startDate,
            startDateFormatted: new Date(evt.startDate).toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'UTC'
            }),
            endDate: evt.endDate,
            endDateFormatted: evt.endDate ? new Date(evt.endDate).toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'UTC'
            }) : 'N/A',
            capacity: evt.capacity
          })) || []
        });
      }

      if (registeredRes.data.success) {
        const registeredEventIds = new Set<string>(registeredRes.data.events.map((evt: any) => evt._id as string));
        setRegistrations(registeredEventIds);
        console.log('✅ [FRONTEND - EVENTS] User registrations loaded:', {
          registeredCount: registeredEventIds.size,
          registeredEventIds: Array.from(registeredEventIds)
        });
      }
    } catch (err) {
      console.error('❌ [FRONTEND - EVENTS] Fetch events error', err);
    } finally {
      setLoading(false);
    }
  };

  const isEventClosed = (event: any) => {
    const now = new Date();
    const eventStart = new Date(event.startDate);
    return now > eventStart;
  };

  const isUserRegistered = (eventId: string) => {
    return registrations.has(eventId);
  };

  const getFilteredEvents = () => {
    const now = new Date();

    return events.filter(evt => {
      const eventStart = new Date(evt.startDate);
      const isClosed = now > eventStart;
      const isRegistered = isUserRegistered(evt._id);

      switch (filter) {
        case 'registered':
          return isRegistered;
        case 'upcoming':
          return !isClosed;
        case 'closed':
          return isClosed;
        case 'all':
        default:
          return true;
      }
    });
  };

  const filteredEvents = getFilteredEvents();
  const userProfilePhoto = userProfile?.photos?.find((p: any) => p.isPrimary)?.url || userProfile?.photos?.[0]?.url;

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-spiritual-violet-600" />
      </div>
    );
  }

  return (
    <ResponsiveLayout userProfilePhoto={userProfilePhoto}>
      <div className="w-full overflow-x-hidden max-w-5xl mx-auto px-4 py-8 md:px-10 pb-28 md:pb-10">
        {/* Header Section */}
        <div className="flex items-center gap-6 mb-10">
          <button
            onClick={() => router.back()}
            className="w-12 h-12 rounded-[20px] bg-white/40 backdrop-blur-xl border border-white/60 shadow-sm flex items-center justify-center hover:bg-white/60 transition-all group active:scale-95"
          >
            <svg className="w-5 h-5 text-gray-800 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              Events <span className="text-2xl animate-pulse">🌟</span>
            </h1>
            <p className="text-gray-500 font-semibold mt-1.5 opacity-80 tracking-wide uppercase text-[11px]">Discover spiritual gatherings & community</p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar -mx-1 px-1">
          {['all', 'upcoming', 'registered', 'closed'].map(f => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-5 py-2.5 rounded-2xl whitespace-nowrap text-[13px] font-bold transition-all duration-300 border shadow-sm flex-shrink-0 ${isActive
                    ? 'bg-white/80 text-[#8b5cf6] border-white/60 shadow-purple-100 scale-[1.02]'
                    : 'bg-white/30 backdrop-blur-md text-gray-500 border-white/40 hover:bg-white/50 hover:text-gray-900'
                  }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            );
          })}
        </div>

        {/* Events Layout */}
        <div className="space-y-6">
          {filteredEvents.length === 0 ? (
            <div className="bg-white/40 backdrop-blur-2xl rounded-[36px] border border-white/60 p-8 text-center flex flex-col items-center justify-center space-y-6 shadow-2xl w-full">
              <div className="relative">
                <div className="w-24 h-24 bg-white/40 rounded-full flex items-center justify-center text-5xl shadow-inner">
                  🕯️
                </div>
                <div className="absolute -bottom-2 -right-2 w-9 h-9 bg-[#8b5cf6] rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                  ✨
                </div>
              </div>
              <div className="w-full">
                <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">
                  {filter === 'all' && 'Journey Together'}
                  {filter === 'upcoming' && 'Patience is a Virtue'}
                  {filter === 'registered' && 'The Universe Awaits'}
                  {filter === 'closed' && 'Past Wisdom'}
                </h2>
                <p className="text-gray-600 font-semibold text-sm leading-relaxed opacity-70 px-2">
                  {filter === 'all' && 'No spiritual gatherings yet. The stars are aligning!'}
                  {filter === 'upcoming' && 'We are preparing new soul-enriching experiences for you.'}
                  {filter === 'registered' && "You haven't joined any events yet. Your path begins here."}
                  {filter === 'closed' && 'No past wisdom to reflect upon at this gathering.'}
                </p>
              </div>
              <button
                onClick={() => setFilter('all')}
                className="w-full bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] text-white py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all"
              >
                Browse All Events
              </button>
            </div>
          ) : (
            <div className="grid gap-8 pb-10">
              {filteredEvents.map(evt => {
                const isClosed = isEventClosed(evt);
                const isRegistered = isUserRegistered(evt._id);

                return (
                  <div key={evt._id} className="bg-white/40 backdrop-blur-xl rounded-[32px] border border-white/70 p-5 md:p-7 flex flex-col md:flex-row gap-5 md:gap-8 relative hover:shadow-2xl hover:bg-white/50 transition-all duration-500 group shadow-lg w-full overflow-hidden">
                    {/* Status Badges */}
                    <div className="absolute top-7 right-7 flex gap-3 z-10">
                      {isRegistered && (
                        <span className="bg-[#10b981] text-white text-[10px] px-4 py-2 rounded-full font-black uppercase tracking-widest shadow-xl shadow-green-400/20 animate-pulse">
                          ✓ Joined
                        </span>
                      )}
                      {isClosed && (
                        <span className="bg-gray-800/60 backdrop-blur-lg text-white text-[10px] px-4 py-2 rounded-full font-black uppercase tracking-widest">
                          Closed
                        </span>
                      )}
                    </div>

                    {/* Image Area */}
                    <div className="w-full md:w-64 h-44 md:h-44 rounded-[24px] overflow-hidden flex-shrink-0 border-4 border-white/40 shadow-xl">
                      {evt.image ? (
                        <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-100/50 to-blue-50/50 flex items-center justify-center">
                          <span className="text-5xl">🌌</span>
                        </div>
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 flex flex-col justify-center py-2">
                      <LoadingLink href={`/events/${evt._id}`} className="text-3xl font-black text-gray-900 group-hover:text-[#8b5cf6] transition-all mb-3 leading-tight tracking-tight">
                        {evt.title}
                      </LoadingLink>

                      <div className="flex flex-wrap gap-6 text-[14px] text-gray-500 font-bold mb-5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-2xl bg-white/60 shadow-sm border border-white/80 flex items-center justify-center text-[#8b5cf6]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <span className="tracking-wide">
                            {new Date(evt.startDate).toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        {evt.location && (
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-2xl bg-white/60 shadow-sm border border-white/80 flex items-center justify-center text-[#3b82f6]">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                            <span className="tracking-wide">{evt.location}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-[16px] text-gray-600 line-clamp-2 leading-relaxed font-semibold opacity-70 pr-4">
                        {evt.description}
                      </p>

                      <div className="mt-8 flex items-center gap-4">
                        <LoadingLink
                          href={`/events/${evt._id}`}
                          className="px-8 py-3 rounded-2xl bg-white/80 backdrop-blur-xl text-[#8b5cf6] font-black text-xs uppercase tracking-[0.15em] border border-white shadow-lg hover:bg-[#8b5cf6] hover:text-white hover:scale-[1.05] transition-all active:scale-95"
                        >
                          View Details
                        </LoadingLink>
                        {!isRegistered && !isClosed && (
                          <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 opacity-60">
                            ✦ Registration Open
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </ResponsiveLayout>
  );
}
