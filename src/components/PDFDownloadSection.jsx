import React, { useState, useEffect } from 'react';
import { Download, FileText, Star, BookOpen } from 'lucide-react';
import { getMaterials, trackMaterialDownload } from '@/lib/authService';

const PDFDownloadSection = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        setLoading(true);
        const response = await getMaterials(1, 10);
        
        if (response.success) {
          setMaterials(response.data);
        } else {
          setError(response.message || 'Failed to fetch materials');
        }
      } catch (err) {
        setError('An error occurred while fetching materials');
        console.error('Error fetching materials:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  // const handleDownload = () => {
  //   if (materials.length > 0) {
  //     const firstMaterial = materials[0];
  //     if (firstMaterial.fileUrl) {
  //       // Create a temporary anchor element to trigger download
  //       const link = document.createElement('a');
  //       link.href = firstMaterial.fileUrl;
  //       link.download = firstMaterial.fileName || 'download.pdf';
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     }
  //   }
  // };
  const handleDownload = async () => {
    if (materials.length > 0) {
      const firstMaterial = materials[0];
      if (firstMaterial.fileUrl) {
        try {
          // First, open the PDF in a new tab for viewing
          // window.open(firstMaterial.fileUrl, '_blank', 'noopener,noreferrer');
          
          // Then, create a downloadable version
          const response = await fetch(firstMaterial.fileUrl);
          if (!response.ok) {
            throw new Error('Failed to fetch file');
          }
          
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download ='fashion-career-guide.pdf';
          document.body.appendChild(link);
          link.click();
          
          // Clean up
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);

          try {
            await trackMaterialDownload(firstMaterial.id);
            console.log('✅ Download tracked successfully');
          } catch (trackError) {
            console.warn('⚠️ Download tracking failed:', trackError);
            // Don't fail the whole process if tracking fails
          }
          
          console.log('✅ PDF opened in new tab and downloaded successfully');
        } catch (error) {
          console.error('❌ Download/view failed:', error);
          // Fallback: just open in new tab
          window.open(firstMaterial.fileUrl, '_blank', 'noopener,noreferrer');
        }
      }
    }
  };
  
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-stone-50 to-rose-50/50 rounded-3xl p-10 lg:p-16 shadow-xl border border-stone-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* PDF Mockup */}
            <div className="relative group">
              <div className="relative transform group-hover:scale-105 transition-transform duration-500">
                {/* Main PDF Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-2 group-hover:rotate-3 transition-transform duration-500 border border-stone-100">
                  <div className="flex items-center mb-6">
                    <div className="bg-amber-100 rounded-full p-3 mr-4">
                      <FileText className="text-amber-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Fashion Career Guide</h4>
                      <p className="text-gray-600 text-sm">Complete roadmap to success</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    <div className="h-2 bg-stone-200 rounded-full w-full" />
                    <div className="h-2 bg-stone-200 rounded-full w-4/5" />
                    <div className="h-2 bg-amber-200 rounded-full w-3/5" />
                    <div className="h-2 bg-stone-200 rounded-full w-2/3" />
                  </div>
                  
                  <img
                    src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                    alt="Fashion design"
                    className="w-full h-40 object-cover rounded-2xl"
                  />
                  
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center">
                      <BookOpen className="text-gray-500 mr-2" size={16} />
                      <span className="text-gray-600 text-sm">50 pages</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="text-amber-500 fill-current mr-1" size={16} />
                      <span className="text-gray-600 text-sm">4.9/5</span>
                    </div>
                  </div>
                </div>
                
                {/* Badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full p-3 shadow-lg">
                  <Star className="fill-current" size={20} />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div>
                <span className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  FREE DOWNLOAD
                </span>
                <h3 className="text-4xl lg:text-5xl font-serif font-light text-gray-900 mb-6 leading-tight">
                  The Ultimate Fashion
                  <span className="text-amber-600 block font-normal">Career Guide</span>
                </h3>
                <p className="text-xl text-gray-600 leading-relaxed font-light mb-8">
                  Download our comprehensive 50-page guide covering everything from 
                  portfolio creation to landing your dream job in fashion. Includes 
                  exclusive interviews with industry professionals and step-by-step career roadmaps.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-amber-600 rounded-full" />
                  <span className="text-gray-700 font-light">Portfolio building strategies & templates</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-amber-600 rounded-full" />
                  <span className="text-gray-700 font-light">Industry insider tips and current trends</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-amber-600 rounded-full" />
                  <span className="text-gray-700 font-light">International study opportunities guide</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-amber-600 rounded-full" />
                  <span className="text-gray-700 font-light">Career roadmaps for different specializations</span>
                </div>
              </div>

              <button 
                className="group cursor-pointer bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-10 py-5 rounded-2xl font-medium text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleDownload}
                disabled={loading || materials.length === 0}
              >
                <Download className={`group-hover:animate-bounce ${loading ? 'animate-spin' : ''}`} size={20} />
                <span>{loading ? 'Loading...' : 'Download Free Guide'}</span>
              </button>

              <p className="text-sm text-gray-500 font-light">
                ✓ No spam, ever. ✓ Instant download. ✓ 10,000+ downloads
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PDFDownloadSection;