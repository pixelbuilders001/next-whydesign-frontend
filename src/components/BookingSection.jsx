"use client";
import React, { useEffect, useState } from 'react';
import { Calendar, Clock, Video, CheckCircle, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { bookCounselingSession, getCounselorList } from '@/lib/authService';
import { formatTime } from '@/lib/helper';
import Image from "next/image";
import SuccessModal from './SuccessModal';

const BookingSection = () => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [counselors, setCounselors] = useState([]);
  const [selectedCounselor, setSelectedCounselor] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: ''
  });
  const [isBooked, setIsBooked] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const topics = [
    'Portfolio Review & Feedback',
    'Career Guidance & Planning',
    'Study Abroad Consultation',
    'Fashion Business Strategy',
    'Industry Networking Tips',
    'General Fashion Advice'
  ];

  // Generate calendar data
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const calendar = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const isCurrentMonth = date.getMonth() === month;
      const isPast = date < today;
      const isAvailable = !isPast && isCurrentMonth && (date - today) / (1000 * 60 * 60 * 24) <= 14;

      calendar.push({
        date,
        day: date.getDate(),
        isCurrentMonth,
        isPast,
        isAvailable,
        isSelected: selectedDate === date.toISOString().split('T')[0],
        value: date.toISOString().split('T')[0]
      });
    }

    return calendar;
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCounselor || !selectedDate || !selectedTime) {
      alert("Please select a counselor, date, and time before booking.");
      return;
    }

    const payload = {
      counselorId: selectedCounselor,
      guestName: formData.name,
      guestEmail: formData.email,
      guestPhone: formData.phone,
      bookingDate: selectedDate,
      bookingTime: formatTime(selectedTime),
      duration: 60,
      discussionTopic: formData.topic,
    };

    try {
      setIsSubmitting(true);
      const result = await bookCounselingSession(payload);
      setIsSubmitting(false);
      if (result.success) {
        setIsBooked(true);
        setShowSuccessModal(true);
        setFormData({ name: '', email: '', phone: '', topic: '' });
        setSelectedDate('');
        setSelectedTime('');
        setSelectedCounselor('');
        setStep(1);
      } else {
        alert(result.message || "Booking failed. Please try again.");
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("Booking failed:", error);
      alert("Something went wrong while booking the session.");
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  useEffect(() => {
    const fetchCounselors = async () => {
      setIsLoading(true);
      try {
        const result = await getCounselorList(1, 10);
        if (result.success && result.data?.data) {
          const transformedCounselors = result.data.data.map((counselor) => ({
            id: counselor.id,
            name: counselor.fullName,
            title: counselor.title,
            experience: `${counselor.yearsOfExperience}+ years`,
            image: counselor.avatarUrl || 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
            specialties: counselor.specialties || [],
            rating: counselor.rating || 0,
          }));
          setCounselors(transformedCounselors);
        } else {
          setCounselors([]);
        }
      } catch (error) {
        console.error('Error fetching counselors:', error);
        setCounselors([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCounselors();
  }, []);

  const selectedCounselorData = counselors.find(c => c.id === selectedCounselor);

  return (
    <section id="booking" className="py-12 md:py-16 bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-gray-900 mb-3">
            Book a <span className="text-amber-600 font-normal">Video Counselling</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Get personalized guidance from industry experts in a 1-on-1 session.
          </p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-8 max-w-md mx-auto">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${step >= s ? 'bg-amber-600 text-white' : 'bg-stone-200 text-stone-500'
                  }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${step > s ? 'bg-amber-600' : 'bg-stone-200'
                  }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden">
          {/* Step 1: Counselor Selection */}
          {step === 1 && (
            <div className="p-6 md:p-10 animate-fade-in text-black">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center justify-center lg:justify-start">
                <User className="text-amber-600 mr-2" size={20} />
                Choose Your Counselor
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isLoading ? (
                  <div className="col-span-2 py-10 text-center text-stone-500">Loading experts...</div>
                ) : (
                  counselors.map((counselor) => (
                    <div
                      key={counselor.id}
                      onClick={() => {
                        setSelectedCounselor(counselor.id);
                        setStep(2);
                      }}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-md text-black ${selectedCounselor === counselor.id ? 'border-amber-500 bg-amber-50' : 'border-stone-100 hover:border-amber-200'
                        }`}
                    >
                      <div className="flex items-center space-x-4">
                        <Image
                          width={56}
                          height={56}
                          src={counselor.image}
                          alt={counselor.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 truncate">{counselor.name}</h4>
                          <p className="text-amber-600 text-xs font-medium">{counselor.title}</p>
                          <div className="flex items-center text-xs mt-1">
                            <span className="text-amber-500 mr-1">⭐</span>
                            <span className="text-gray-700 font-medium">{counselor.rating.toFixed(1)}</span>
                            <span className="text-gray-400 ml-1">({counselor.experience})</span>
                          </div>
                        </div>
                        <ChevronRight size={18} className="text-stone-300" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && (
            <div className="p-6 md:p-10 animate-fade-in text-black">
              <div className="flex items-center justify-between mb-6">
                <button onClick={() => setStep(1)} className="flex items-center text-amber-600 text-sm font-medium hover:underline">
                  <ChevronLeft size={16} className="mr-1" /> Change Counselor
                </button>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-stone-500">Counselor:</span>
                  <span className="text-xs font-bold text-stone-900">{selectedCounselorData?.name}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="text-amber-600 mr-2" size={20} />
                Select Date & Time
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Mini Calendar */}
                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100">
                  <div className="flex items-center justify-between mb-4">
                    <button type="button" onClick={() => navigateMonth(-1)} className="p-1 hover:bg-stone-200 rounded">
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-sm font-bold text-stone-900">
                      {currentMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                    <button type="button" onClick={() => navigateMonth(1)} className="p-1 hover:bg-stone-200 rounded">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
                      <div key={d} className="text-[10px] uppercase text-stone-400 font-bold">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {generateCalendar().map((day, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => day.isAvailable && setSelectedDate(day.value)}
                        disabled={!day.isAvailable}
                        className={`aspect-square flex items-center justify-center text-xs font-medium rounded-lg transition-all ${day.isSelected ? 'bg-amber-600 text-white' : day.isAvailable ? 'hover:bg-amber-100 text-gray-900' : 'text-gray-300 cursor-not-allowed'
                          } ${!day.isCurrentMonth ? 'opacity-20' : ''}`}
                      >
                        {day.day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Grid */}
                <div>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => {
                          setSelectedTime(time);
                          if (selectedDate) setStep(3);
                        }}
                        className={`p-3 rounded-xl border-2 text-xs font-medium transition-all ${selectedTime === time ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-stone-100 hover:border-amber-200 text-gray-600'
                          }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  {!selectedDate && (
                    <p className="text-[10px] text-amber-600 mt-4 text-center italic">* Please select a date on the calendar first</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {step === 3 && (
            <div className="p-6 md:p-10 animate-fade-in text-black">
              <button onClick={() => setStep(2)} className="flex items-center text-amber-600 text-sm font-medium hover:underline mb-6">
                <ChevronLeft size={16} className="mr-1" /> Back to Schedule
              </button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center justify-center lg:justify-start">
                    <Video className="text-amber-600 mr-2" size={20} />
                    Final Details
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-sm transition-all"
                        required
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-sm transition-all"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-sm transition-all"
                        required
                      />
                      <select
                        name="topic"
                        value={formData.topic}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-sm bg-white cursor-pointer"
                        required
                      >
                        <option value="">Select Topic</option>
                        {topics.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 mt-2"
                    >
                      {isSubmitting ? "Confirming..." : "Confirm Booking"}
                    </button>
                  </form>
                </div>

                <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 h-fit">
                  <h4 className="font-bold text-stone-900 mb-4 text-sm uppercase tracking-wider">Summary</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden">
                        <Image src={selectedCounselorData?.image} width={40} height={40} className="object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-900">{selectedCounselorData?.name}</p>
                        <p className="text-[10px] text-amber-600">{selectedCounselorData?.title}</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-stone-200 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-stone-500">Date:</span>
                        <span className="font-bold text-stone-900">{new Date(selectedDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-stone-500">Time:</span>
                        <span className="font-bold text-stone-900">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-stone-500">Duration:</span>
                        <span className="font-bold text-stone-900 text-black"> 45 Mins</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message="Session booked successfully! We will send you the meeting link very soon in your email"
      />
    </section>
  );
};

export default BookingSection;