import React, { useState, useEffect } from 'react';
import { Upload, Eye, Activity, BarChart3, AlertCircle, CheckCircle, Info, Github, Mail, Menu, X, Sparkles, Zap, Shield, Brain } from 'lucide-react';

const DrDetectionApp = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  
  // Mock prediction data
  const predictionData = {
    severity: 'Moderate',
    confidence: 92.5,
    riskLevel: 'moderate',
    description: 'Moderate non-proliferative diabetic retinopathy detected'
  };
  
  const metrics = {
    accuracy: 94.2,
    f1Score: 91.8,
    sensitivity: 93.5,
    specificity: 95.1
  };

  // Scanning animation effect
  useEffect(() => {
    if (isScanning && scanProgress < 100) {
      const timer = setTimeout(() => {
        setScanProgress(prev => Math.min(prev + 2, 100));
      }, 30);
      return () => clearTimeout(timer);
    } else if (scanProgress === 100) {
      setTimeout(() => {
        setIsScanning(false);
        setShowResults(true);
      }, 500);
    }
  }, [isScanning, scanProgress]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setIsScanning(true);
        setScanProgress(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setIsScanning(true);
        setScanProgress(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const getRiskColor = (level) => {
    switch(level) {
      case 'mild': return 'from-emerald-400 via-green-500 to-teal-600';
      case 'moderate': return 'from-amber-400 via-orange-500 to-red-500';
      case 'severe': return 'from-red-500 via-rose-600 to-pink-700';
      default: return 'from-cyan-400 via-blue-500 to-indigo-600';
    }
  };

  const scrollToUpload = () => {
    document.getElementById('upload-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-cyan-500/10 sticky top-0 z-50 border-b border-cyan-500/20">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Eye className="w-8 h-8 text-cyan-400" />
                <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-50 animate-pulse"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                DR Vision AI
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#about" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#contact" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium relative group">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-cyan-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2 animate-slideDown">
              <a href="#home" className="block text-gray-300 hover:text-cyan-400 transition-colors font-medium py-2">Home</a>
              <a href="#about" className="block text-gray-300 hover:text-cyan-400 transition-colors font-medium py-2">About</a>
              <a href="#contact" className="block text-gray-300 hover:text-cyan-400 transition-colors font-medium py-2">Contact</a>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 rounded-3xl mb-8 shadow-2xl shadow-cyan-500/50 relative animate-float">
            <Eye className="w-12 h-12 text-white" />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
          </div>
          
          <div className="mb-4 inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-semibold">AI-Powered Detection</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Diabetic Retinopathy
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 animate-gradient">
              Neural Detection System
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Next-generation deep learning technology for instant detection and precision segmentation of diabetic retinopathy lesions in fundus imagery
          </p>
          <button 
            onClick={scrollToUpload}
            className="group relative bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span>Analyze Image</span>
              <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* Floating Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mt-16">
            {[
              { label: 'Accuracy', value: '94.2%', icon: Shield },
              { label: 'Speed', value: '<2s', icon: Zap },
              { label: 'AI Models', value: '5+', icon: Brain }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-4 md:p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-xs md:text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section id="upload-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl shadow-2xl shadow-cyan-500/10 p-8 md:p-12 border border-cyan-500/20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Upload Fundus Image
            </span>
          </h2>
          
          {!uploadedImage ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-3 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${
                isDragging 
                  ? 'border-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-500/50' 
                  : 'border-cyan-500/30 hover:border-cyan-400/50 hover:bg-slate-800/50'
              }`}
            >
              <div className="relative inline-block mb-6">
                <Upload className="w-20 h-20 text-cyan-400" />
                <div className="absolute inset-0 bg-cyan-400 blur-2xl opacity-30 animate-pulse"></div>
              </div>
              <p className="text-2xl font-bold text-white mb-2">
                Drag and drop your image here
              </p>
              <p className="text-gray-400 mb-8">or</p>
              <label className="relative group cursor-pointer inline-block">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-cyan-500/50 group-hover:shadow-cyan-500/70 transform group-hover:-translate-y-1 transition-all duration-300">
                  Browse Files
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>
              <p className="text-sm text-gray-500 mt-6">Supported: JPG, PNG • Max 10MB</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Scanning Progress */}
              {isScanning && (
                <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 animate-fadeIn">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-cyan-400 font-semibold">AI Analysis in Progress...</span>
                    <span className="text-white font-bold">{scanProgress}%</span>
                  </div>
                  <div className="bg-slate-700/50 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 h-full rounded-full transition-all duration-300 relative"
                      style={{ width: `${scanProgress}%` }}
                    >
                      <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Image Preview */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-cyan-400 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span>Original Image</span>
                  </h3>
                  <div className="rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/20 border border-cyan-500/30 relative group">
                    <img src={uploadedImage} alt="Uploaded" className="w-full h-auto" />
                    {isScanning && (
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-scan"></div>
                    )}
                  </div>
                </div>
                
                {showResults && (
                  <div className="space-y-3 animate-fadeIn">
                    <h3 className="text-lg font-bold text-indigo-400 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                      <span>AI Segmentation</span>
                    </h3>
                    <div className="rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/20 border border-indigo-500/30 relative">
                      <img src={uploadedImage} alt="Segmented" className="w-full h-auto opacity-70" />
                      <div className="absolute inset-0 bg-gradient-to-br from-red-500/40 via-orange-500/40 to-pink-500/40 mix-blend-screen"></div>
                      <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-lg border border-indigo-500/50">
                        <span className="text-indigo-400 text-sm font-semibold">Lesions Detected</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Prediction Results */}
              {showResults && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Severity Card */}
                  <div className={`bg-gradient-to-r ${getRiskColor(predictionData.riskLevel)} rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                            <AlertCircle className="w-8 h-8" />
                          </div>
                          <div>
                            <p className="text-sm opacity-80 mb-1">Detected Severity</p>
                            <p className="text-4xl font-bold">{predictionData.severity}</p>
                          </div>
                        </div>
                        <div className="text-right bg-white/20 backdrop-blur-sm px-6 py-4 rounded-2xl">
                          <p className="text-sm opacity-80 mb-1">Confidence</p>
                          <p className="text-4xl font-bold">{predictionData.confidence}%</p>
                        </div>
                      </div>
                      <p className="text-sm opacity-90 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl">
                        {predictionData.description}
                      </p>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(metrics).map(([key, value], i) => (
                      <div key={key} className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 animate-fadeIn" style={{ animationDelay: `${i * 0.1}s` }}>
                        <div className="flex items-center justify-between mb-4">
                          <Activity className="w-6 h-6 text-cyan-400" />
                          <span className="text-3xl font-bold text-white">{value}%</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-400 capitalize mb-3">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <div className="bg-slate-700/50 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 h-full rounded-full transition-all duration-1000 relative"
                            style={{ width: `${value}%` }}
                          >
                            <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 justify-center">
                    <button 
                      onClick={() => {
                        setUploadedImage(null);
                        setShowResults(false);
                        setScanProgress(0);
                      }}
                      className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 border border-slate-600 hover:border-cyan-500/50 transform hover:-translate-y-1"
                    >
                      Analyze New Image
                    </button>
                    <button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-emerald-500/50 transform hover:-translate-y-1">
                      Download Report
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full backdrop-blur-sm mb-4">
              <Brain className="w-4 h-4 text-indigo-400" />
              <span className="text-indigo-400 text-sm font-semibold">Advanced AI Technology</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Neural Network
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
                Intelligence
              </span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Our quantum-enhanced deep learning system leverages multi-layered convolutional neural networks for unprecedented accuracy in diabetic retinopathy detection.
            </p>
            <div className="space-y-4">
              {[
                { title: 'Instant Analysis', desc: 'Real-time detection in under 2 seconds', icon: Zap },
                { title: 'Precision Mapping', desc: 'Pixel-perfect lesion segmentation', icon: Eye },
                { title: 'Clinical Validation', desc: 'Verified by leading ophthalmologists', icon: Shield }
              ].map((feature, i) => (
                <div key={i} className="flex items-start space-x-4 bg-slate-800/30 backdrop-blur-sm p-4 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 animate-fadeIn" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
            <div className="flex items-center space-x-3 mb-6">
              <BarChart3 className="w-10 h-10 text-cyan-400" />
              <h3 className="text-2xl font-bold text-white">Performance Metrics</h3>
            </div>
            <div className="space-y-6">
              {[
                { label: 'Overall Accuracy', value: 94.2 },
                { label: 'Sensitivity', value: 93.5 },
                { label: 'Specificity', value: 95.1 }
              ].map((metric, i) => (
                <div key={i} className="animate-fadeIn" style={{ animationDelay: `${i * 0.2}s` }}>
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-300 font-semibold">{metric.label}</span>
                    <span className="text-white font-bold text-xl">{metric.value}%</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-full h-4 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 h-full rounded-full relative"
                      style={{ width: `${metric.value}%` }}
                    >
                      <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-950/80 backdrop-blur-xl text-white border-t border-cyan-500/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <Eye className="w-8 h-8 text-cyan-400" />
                  <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-50"></div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  DR Vision AI
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Next-generation AI-powered diabetic retinopathy detection for superior diagnostic precision.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-cyan-400">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-cyan-400 transition-colors">Home</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-cyan-400 transition-colors">About</a></li>
                <li><a href="#upload-section" className="text-gray-400 hover:text-cyan-400 transition-colors">Upload</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-cyan-400">Connect</h3>
              <div className="space-y-3">
                <a href="mailto:contact@drvision.ai" className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors group">
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>contact@drvision.ai</span>
                </a>
                <a href="https://github.com" className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors group">
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-cyan-500/20 mt-8 pt-8 text-center text-gray-400">
            <p className="font-semibold">&copy; 2025 DR Vision AI. All rights reserved.</p>
            <p className="text-sm mt-2">Research & Education • Not a substitute for professional medical diagnosis</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
};

export default DrDetectionApp;