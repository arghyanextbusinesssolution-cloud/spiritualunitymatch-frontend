'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';

interface CheckInCalendarProps {
  onDateSelect?: (date: Date) => void;
}

interface CheckInData {
  emotion: string;
  need: string;
  energy: string;
  hasCheckIn: boolean;
}

export default function CheckInCalendar({ onDateSelect }: CheckInCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [checkIns, setCheckIns] = useState<Record<string, CheckInData>>({});
  const [loading, setLoading] = useState(true);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  useEffect(() => {
    fetchCheckInHistory();
  }, [month, year]);

  const fetchCheckInHistory = async () => {
    try {
      setLoading(true);
      const response = await api.get('/soul/check-in/history', {
        params: { month: month, year: year }
      });
      if (response.data.success) {
        setCheckIns(response.data.checkIns || {});
      }
    } catch (error) {
      console.error('Error fetching check-in history:', error);
    } finally {
      setLoading(false);
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const today = new Date();
  const isCurrentMonth = currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let day = 1; day <= daysInMonth; day++) days.push(day);

  const getDateString = (day: number | null) => {
    if (day === null) return '';
    const d = new Date(year, month, day);
    return d.toISOString().split('T')[0];
  };

  const getEmotionEmoji = (emotion: string) => {
    const emojiMap: Record<string, string> = {
      calm: '😌',
      heavy: '😔',
      open: '😊',
      confused: '😕',
      hopeful: '✨',
    };
    return emojiMap[emotion] || '○';
  };

  const isToday = (day: number | null) => {
    if (day === null || !isCurrentMonth) return false;
    return day === today.getDate();
  };

  return (
    <div className="w-full bg-white/40 backdrop-blur-xl rounded-3xl border border-white/60 overflow-hidden shadow-lg">
      <div className="flex items-center justify-between px-3 pt-3 pb-2">
        <button
          onClick={() => setCurrentDate(new Date(year, month - 1))}
          className="w-7 h-7 rounded-lg bg-white/50 border border-white/60 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
        >
          <svg className="w-3 h-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h3 className="text-[10px] font-black text-gray-900 tracking-widest uppercase">
          {monthNames[month]} {year}
        </h3>

        <button
          onClick={() => setCurrentDate(new Date(year, month + 1))}
          className="w-7 h-7 rounded-lg bg-white/50 border border-white/60 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
        >
          <svg className="w-3 h-3 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-6">
          <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="px-2 pb-3 w-full">
          <div className="grid grid-cols-7 mb-1 w-full">
            {dayNames.map((day, idx) => (
              <div key={idx} className="text-center text-[8px] font-black text-gray-400 py-1 uppercase">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 w-full">
            {days.map((day, index) => {
              const dateString = getDateString(day);
              const checkInData = day !== null ? checkIns[dateString] : null;
              const isTodayDate = isToday(day);

              return (
                <div
                  key={index}
                  onClick={() => {
                    if (day !== null && onDateSelect) {
                      onDateSelect(new Date(year, month, day));
                    }
                  }}
                  className={`
                    aspect-square rounded-lg flex flex-col items-center justify-center relative transition-all
                    ${day === null ? 'bg-transparent' : 'bg-white/30 border border-white/20 cursor-pointer active:scale-95'}
                    ${isTodayDate ? 'ring-1 ring-purple-500 bg-white/60' : ''}
                    ${checkInData?.hasCheckIn ? 'bg-purple-100/50 border-purple-200' : ''}
                  `}
                >
                  {day !== null && (
                    <>
                      <span className={`text-[9px] font-black ${isTodayDate ? 'text-purple-600' : 'text-gray-700'}`}>{day}</span>
                      {checkInData?.hasCheckIn && (
                        <span className="text-[7px] absolute bottom-0.5 right-0.5">{getEmotionEmoji(checkInData.emotion)}</span>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}