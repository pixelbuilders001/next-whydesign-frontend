"use client";
import React, { useState } from 'react';
import { Calendar, Clock, Video, CheckCircle, User, ChevronLeft, ChevronRight } from 'lucide-react';

const BookingSection = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCounselor, setSelectedCounselor] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: ''
  });
  const [isBooked, setIsBooked] = useState(false);

  const counselors = [
    {
      id: 'sarah',
      name: 'Sarah Chen',
      title: 'Senior Fashion Consultant',
      experience: '10+ years',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      specialties: ['Portfolio Review', 'Career Guidance', 'Study Abroad']
    },
    {
      id: 'marco',
      name: 'Marco Rodriguez',
      title: 'Creative Director',
      experience: '8+ years',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      specialties: ['Fashion Design', 'Brand Development', 'Industry Insights']
    },
    {
      id: 'emma',
      name: 'Emma Thompson',
      title: 'Fashion Entrepreneur',
      experience: '12+ years',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      specialties: ['Business Strategy', 'Entrepreneurship', 'Fashion Marketing']
    }
  ];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => setIsBooked(false), 5000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const selectedCounselorData = counselors.find(c => c.id === selectedCounselor);

  return (
    <section id="booking" className="py-24 bg-gradient-to-br from-stone-50 via-rose-50/30 to-amber-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-serif font-light text-gray-900 mb-8 leading-tight">
            Book Your Personal
            <span className="text-amber-600 block font-normal">Video Counselling</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Get personalized guidance from industry experts. Schedule a one-on-one video
            consultation to discuss your fashion career goals and receive tailored advice.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Counselor Selection */}
          <div className="space-y-10">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 lg:p-10 shadow-xl border border-white/50">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <User className="text-amber-600 mr-4" size={32} />
                Choose Your Counselor
              </h3>

              <div className="flex flex-row gap-4 overflow-x-auto pb-4 lg:flex-col lg:gap-6 lg:overflow-visible lg:pb-0">
                {counselors.map((counselor) => (
                  <div
                    key={counselor.id}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 flex-shrink-0 lg:w-full w-3/4 ${
                      selectedCounselor === counselor.id
                        ? 'border-amber-500 bg-amber-50 shadow-lg'
                        : 'border-stone-200 bg-white hover:border-amber-300 hover:shadow-md'
                    }`}
                    onClick={() => setSelectedCounselor(counselor.id)}
                  >
                    <div className="flex-col items-center text-center lg:flex lg:flex-row lg:items-center lg:space-x-4 lg:text-left">
                      <img
                        src={counselor.image}
                        alt={counselor.name}
                        className="w-20 h-20 mb-4 lg:w-16 lg:h-16 lg:mb-0 rounded-full object-cover border-3 border-amber-200"
                      />
                      <div className="flex-1 text-center lg:text-left lg:flex-1">
                        <h4 className="font-bold text-gray-900 text-lg">{counselor.name}</h4>
                        <p className="text-amber-600 font-medium">{counselor.title}</p>
                        <p className="text-gray-600 text-sm">{counselor.experience} experience</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-4 lg:mt-0 ${
                        selectedCounselor === counselor.id
                          ? 'border-amber-500 bg-amber-500'
                          : 'border-stone-300'
                      }`}>
                        {selectedCounselor === counselor.id && (
                          <div className="w-3 h-3 bg-white rounded-full" />
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {counselor.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-xs font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Counselor Details */}
            {selectedCounselorData && (
              <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-3xl p-8 border border-amber-200">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={selectedCounselorData.image}
                    alt={selectedCounselorData.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-amber-300"
                  />
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">{selectedCounselorData.name}</h4>
                    <p className="text-amber-700 font-medium text-lg">{selectedCounselorData.title}</p>
                  </div>
                </div>
                <p className="text-gray-700 font-light">
                  Specializing in {selectedCounselorData.specialties.join(', ').toLowerCase()},
                  {selectedCounselorData.name.split(' ')[0]} brings {selectedCounselorData.experience} of
                  industry experience to help guide your fashion career journey.
                </p>
              </div>
            )}
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-stone-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <Video className="text-amber-600 mr-4" size={32} />
              Schedule Your Session
            </h3>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white text-black placeholder-gray-500"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white text-black placeholder-gray-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white text-black placeholder-gray-500"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Discussion Topic
                  </label>
                  <select
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white text-black appearance-none"
                    required
                  >
                    <option value="">Select topic</option>
                    {topics.map((topic, index) => (
                      <option key={index} value={topic}>{topic}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Calendar Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Calendar className="mr-2" size={16} />
                  Select Date
                </label>
                <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-6">
                    <button
                      type="button"
                      onClick={() => navigateMonth(-1)}
                      className="p-2 hover:bg-stone-200 rounded-lg transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h4>
                    <button
                      type="button"
                      onClick={() => navigateMonth(1)}
                      className="p-2 hover:bg-stone-200 rounded-lg transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  {/* Days of Week */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2">
                    {generateCalendar().map((day, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => day.isAvailable && setSelectedDate(day.value)}
                        disabled={!day.isAvailable}
                        className={`aspect-square flex items-center justify-center text-sm font-medium rounded-xl transition-all duration-200 ${
                          day.isSelected
                            ? 'bg-amber-500 text-white shadow-lg'
                            : day.isAvailable
                            ? 'hover:bg-amber-100 text-gray-900 hover:shadow-md'
                            : 'text-gray-400 cursor-not-allowed'
                        } ${!day.isCurrentMonth ? 'opacity-30' : ''}`}
                      >
                        {day.day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Clock className="mr-2" size={16} />
                  Select Time
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                        selectedTime === time
                          ? 'border-amber-500 bg-amber-50 text-amber-700'
                          : 'border-stone-200 hover:border-amber-300 hover:bg-amber-50 text-gray-700'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={!selectedCounselor || !selectedDate || !selectedTime || isBooked}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-5 rounded-2xl font-medium text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isBooked ? (
                  <>
                    <CheckCircle size={22} />
                    <span>Session Booked Successfully!</span>
                  </>
                ) : (
                  <>
                    <Video size={20} />
                    <span>Book Video Counselling</span>
                  </>
                )}
              </button>

              {selectedDate && selectedTime && selectedCounselor && (
                <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
                  <h4 className="font-bold text-gray-900 mb-3">Booking Summary:</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><span className="font-medium">Counselor:</span> {selectedCounselorData?.name}</p>
                    <p><span className="font-medium">Date:</span> {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p><span className="font-medium">Time:</span> {selectedTime}</p>
                    <p><span className="font-medium">Duration:</span> 45 minutes</p>
                    <p><span className="font-medium">Platform:</span> Zoom (link will be sent via email)</p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;