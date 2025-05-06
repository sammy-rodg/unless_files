import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Activity, Award, Zap, Lightbulb, Settings, RefreshCw, Eye, Ear, MessageSquare, Mic, Filter, Accessibility, PlusCircle, X, Save, Globe, ChevronDown } from 'lucide-react';

// Circular Progress Component
const CircularProgress = ({ value, size = 80, strokeWidth = 8, color, userName, userColor }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#f0f0f0"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-in-out"
        />
      </svg>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-bold text-3xl text-gray-800">{value}</span>
      </div>
      
      {/* User/Live indicator */}
      <div 
        className="absolute -top-2 -right-2 text-white text-xs px-2 py-0.5 rounded-full flex items-center"
        style={{ backgroundColor: userColor || "#3B82F6" }}
      >
        {userName ? (
          <span>{userName}'s</span>
        ) : (
          <>
            <RefreshCw className="w-3 h-3 mr-1" />
            <span>Live</span>
          </>
        )}
      </div>
    </div>
  );
};

// Impact Score Ring
const ImpactRing = ({ value, size = 60, color }) => {
  const radius = (size - 8) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#f0f0f0"
          strokeWidth="4"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-in-out"
        />
      </svg>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-bold text-xl text-gray-800">{value}</span>
      </div>
    </div>
  );
};

// Modality Progress Bar
const ModalityBar = ({ label, value, color, icon: Icon }) => {
  return (
    <div className="flex items-center gap-3 mb-2">
      <div className="flex items-center gap-2 w-24">
        <Icon className="w-4 h-4" style={{ color: color }} />
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      <div className="flex-1 relative h-2 bg-gray-200 rounded-full">
        <div 
          className="absolute left-0 top-0 h-full rounded-full transition-all duration-1000"
          style={{ 
            width: `${value}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  );
};

// Form Input Component
const FormInput = ({ label, type = "text", value, onChange, min = 0, max = 100, step = 1, placeholder }) => {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
    </div>
  );
};

const WebsiteAnalysisDashboard = () => {
  // Website data with scores and metrics
  const [websites, setWebsites] = useState([
    {
      id: 1,
      name: "Instagram",
      domain: "instagram.com",
      logo: "/api/placeholder/48/48",
      iconColor: "#E1306C",
      overallScore: 80,
      userName: "Sam",
      userColor: "#F97316",
      modalities: {
        speech: 65,
        vision: 30,
        hearing: 12,
        language: 90
      },
      impacts: {
        productivity: 68,
        creativity: 92,
        adaptability: 79
      },
      featureCount: "6/12",
      isAnalyzing: false,
      rank: 2,
      change: 1
    },
    {
      id: 2,
      name: "LinkedIn",
      domain: "linkedin.com",
      logo: "/api/placeholder/48/48",
      iconColor: "#0077B5",
      overallScore: 85,
      modalities: {
        speech: 71,
        vision: 80,
        hearing: 62,
        language: 94
      },
      impacts: {
        productivity: 89,
        creativity: 74,
        adaptability: 82
      },
      featureCount: "7/12",
      isAnalyzing: false,
      rank: 1,
      change: 2
    },
    {
      id: 3,
      name: "New York Times",
      domain: "nytimes.com",
      logo: "/api/placeholder/48/48",
      iconColor: "#000000",
      overallScore: 78,
      modalities: {
        speech: 42,
        vision: 82,
        hearing: 48,
        language: 93
      },
      impacts: {
        productivity: 75,
        creativity: 86,
        adaptability: 73
      },
      featureCount: "6/12",
      isAnalyzing: false,
      rank: 3,
      change: -1
    },
    {
      id: 4,
      name: "NYU",
      domain: "nyu.edu",
      logo: "/api/placeholder/48/48",
      iconColor: "#57068C",
      overallScore: 76,
      modalities: {
        speech: 39,
        vision: 75,
        hearing: 45,
        language: 88
      },
      impacts: {
        productivity: 81,
        creativity: 78,
        adaptability: 68
      },
      featureCount: "5/12",
      isAnalyzing: false,
      rank: 4,
      change: 0
    },
    {
      id: 5,
      name: "Wells Fargo",
      domain: "wellsfargo.com",
      logo: "/api/placeholder/48/48",
      iconColor: "#D71E28",
      overallScore: 73,
      modalities: {
        speech: 51,
        vision: 78,
        hearing: 52,
        language: 82
      },
      impacts: {
        productivity: 72,
        creativity: 63,
        adaptability: 70
      },
      featureCount: "6/12",
      isAnalyzing: false,
      rank: 5,
      change: 0
    },
    {
      id: 6,
      name: "Ticketmaster",
      domain: "ticketmaster.com",
      logo: "/api/placeholder/48/48",
      iconColor: "#026CDF",
      overallScore: 71,
      modalities: {
        speech: 48,
        vision: 74,
        hearing: 50,
        language: 79
      },
      impacts: {
        productivity: 67,
        creativity: 71,
        adaptability: 75
      },
      featureCount: "5/12",
      isAnalyzing: false,
      rank: 6,
      change: 0
    },
    {
      id: 7,
      name: "eBay",
      domain: "ebay.com",
      logo: "/api/placeholder/48/48",
      iconColor: "#86B817",
      overallScore: 69,
      modalities: {
        speech: 40,
        vision: 72,
        hearing: 45,
        language: 82
      },
      impacts: {
        productivity: 65,
        creativity: 58,
        adaptability: 72
      },
      featureCount: "5/12",
      isAnalyzing: false,
      rank: 7,
      change: 0
    },
    {
      id: 8,
      name: "Yelp",
      domain: "yelp.com",
      logo: "/api/placeholder/48/48",
      iconColor: "#D32323",
      overallScore: 67,
      modalities: {
        speech: 38,
        vision: 69,
        hearing: 42,
        language: 85
      },
      impacts: {
        productivity: 62,
        creativity: 56,
        adaptability: 68
      },
      featureCount: "4/12",
      isAnalyzing: false,
      rank: 8,
      change: 1
    }
  ]);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  
  // State for expanded items
  const [expandedItems, setExpandedItems] = useState({});
  
  // Toggle expanded state for an item
  const toggleExpanded = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Form state
  const [formData, setFormData] = useState({
    userName: "",
    userColor: "#6366F1",
    name: "",
    domain: "",
    overallScore: 50,
    modalities: {
      speech: 50,
      vision: 50,
      hearing: 50,
      language: 50
    },
    impacts: {
      productivity: 50,
      creativity: 50,
      adaptability: 50
    },
    featureCount: "0/12"
  });

  // Handle form input changes
  const handleChange = (field, value) => {
    setFormData(prev => {
      if (field.includes('.')) {
        const [category, key] = field.split('.');
        return {
          ...prev,
          [category]: {
            ...prev[category],
            [key]: value
          }
        };
      }
      return {
        ...prev,
        [field]: value
      };
    });
  };

  // Calculate feature count based on modality scores
  const calculateFeatureCount = (modalities) => {
    let count = 0;
    Object.values(modalities).forEach(value => {
      if (value >= 50) count++;
    });
    return `${count}/12`;
  };

  // Submit form data
  const handleSubmit = () => {
    // Calculate feature count
    const featureCount = calculateFeatureCount(formData.modalities);
    
    // Create new website entry
    const newWebsite = {
      id: websites.length + 1,
      ...formData,
      featureCount,
      iconColor: "#" + Math.floor(Math.random()*16777215).toString(16), // Random color
      isAnalyzing: false,
      rank: websites.length + 1,
      change: 0
    };
    
    // Add to websites
    setWebsites(prev => [...prev, newWebsite]);
    
    // Reset form
    setFormData({
      userName: "",
      userColor: "#6366F1",
      name: "",
      domain: "",
      overallScore: 50,
      modalities: {
        speech: 50,
        vision: 50,
        hearing: 50,
        language: 50
      },
      impacts: {
        productivity: 50,
        creativity: 50,
        adaptability: 50
      },
      featureCount: "0/12"
    });
    
    // Close modal
    setShowModal(false);
  };

  // Simulate analyzing websites in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * websites.length);
      
      setWebsites(prevWebsites => {
        const newWebsites = [...prevWebsites];
        
        newWebsites.forEach(site => {
          site.isAnalyzing = false;
        });
        
        newWebsites[randomIndex].isAnalyzing = true;
        
        // Randomly update modality values
        if (Math.random() > 0.3) {
          const modalityTypes = ['speech', 'vision', 'hearing', 'language'];
          const randomModality = modalityTypes[Math.floor(Math.random() * modalityTypes.length)];
          
          const currentValue = newWebsites[randomIndex].modalities[randomModality];
          const change = Math.floor(Math.random() * 10) - 5;
          const newValue = Math.min(100, Math.max(0, currentValue + change));
          
          newWebsites[randomIndex].modalities[randomModality] = newValue;
          
          // Update overall score based on modalities
          newWebsites[randomIndex].overallScore = Math.round(
            (newWebsites[randomIndex].modalities.speech * 0.25) +
            (newWebsites[randomIndex].modalities.vision * 0.25) +
            (newWebsites[randomIndex].modalities.hearing * 0.25) +
            (newWebsites[randomIndex].modalities.language * 0.25)
          );
        }
        
        return newWebsites;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [websites.length]);

  // Sort websites by overall score and update ranks
  useEffect(() => {
    const interval = setInterval(() => {
      setWebsites(prevWebsites => {
        const oldRanks = {};
        prevWebsites.forEach(site => {
          oldRanks[site.id] = site.rank;
        });
        
        const sortedWebsites = [...prevWebsites].sort(
          (a, b) => b.overallScore - a.overallScore
        );
        
        sortedWebsites.forEach((site, index) => {
          const newRank = index + 1;
          site.rank = newRank;
          site.change = oldRanks[site.id] - newRank;
        });
        
        return sortedWebsites;
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const getModalityColor = (modality) => {
    const colors = {
      speech: '#8B5CF6',   // Purple
      vision: '#3B82F6',   // Blue
      hearing: '#10B981',  // Emerald
      language: '#F59E0B'  // Amber
    };
    return colors[modality];
  };

  const getModalityIcon = (modality) => {
    const icons = {
      speech: Mic,
      vision: Eye,
      hearing: Ear,
      language: MessageSquare
    };
    return icons[modality];
  };

  const getImpactColor = (impact) => {
    const colors = {
      productivity: '#F97316',  // Orange
      creativity: '#10B981',    // Emerald
      adaptability: '#F97316'   // Orange
    };
    return colors[impact];
  };

  const getImpactIcon = (impact) => {
    const icons = {
      productivity: Zap,
      creativity: Lightbulb,
      adaptability: RefreshCw
    };
    return icons[impact];
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-lg max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-medium">
            <span className="text-indigo-400">un</span><span className="text-indigo-600">less</span><span className="text-indigo-600">,</span>
          </h1>
          <p className="text-indigo-300">multimodal accessibility is all you need.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-indigo-500">
            <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
            <span className="text-sm">Analyzing in real-time</span>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-full flex items-center"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Share Your Results
          </button>
          <a 
            href="https://unless-more.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full flex items-center"
          >
            <Globe className="w-4 h-4 mr-2" />
            unless-more.com
          </a>
        </div>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-700">Recent Website Results</h2>
        <button
          onClick={() => setExpandedItems(prev => {
            // Toggle all items expanded/collapsed
            const allExpanded = Object.values(prev).every(v => v);
            const newState = {};
            websites.forEach(w => {
              if (w.rank > 6) newState[w.id] = !allExpanded;
            });
            return newState;
          })}
          className="text-sm text-indigo-600 flex items-center"
        >
          <ChevronDown className="w-4 h-4 mr-1" />
          {Object.values(expandedItems).every(v => v) ? "Collapse All" : "Expand All"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {websites.map((website) => {
          const isRecent = website.rank <= 6;
          const isExpanded = expandedItems[website.id] || false;
          
          // Full card for recent items (rank 1-6)
          if (isRecent) {
            return (
              <div 
                key={website.id} 
                className={`${website.isAnalyzing ? 'ring-2 ring-indigo-400 ring-opacity-50' : ''} 
                            relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg`}
              >
                {/* Top Bar with Rank and Website Info */}
                <div className="flex items-center px-4 py-2 bg-gray-50 border-b">
                  <div className="flex items-center">
                    <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center font-medium text-indigo-600 mr-3">
                      {website.rank}
                    </div>
                    {website.change > 0 && (
                      <div className="flex items-center text-indigo-500 text-xs mr-3">
                        <ArrowUp className="w-3 h-3 mr-1" />
                        {website.change}
                      </div>
                    )}
                    {website.change < 0 && (
                      <div className="flex items-center text-red-500 text-xs mr-3">
                        <ArrowDown className="w-3 h-3 mr-1" />
                        {Math.abs(website.change)}
                      </div>
                    )}
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center overflow-hidden mr-2 rounded-full" style={{ backgroundColor: website.iconColor + '20' }}>
                        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#6366F1' }}>
                          <span className="text-white font-bold text-sm">{website.name.charAt(0)}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-gray-800">{website.name}</h3>
                        <p className="text-gray-500 text-xs">{website.domain}</p>
                      </div>
                    </div>
                  </div>
                  {website.isAnalyzing && (
                    <div className="ml-3">
                      <div className="flex items-center text-indigo-500 text-xs animate-pulse">
                        <Activity className="w-3 h-3 mr-1" />
                        Analyzing...
                      </div>
                    </div>
                  )}
                </div>
    
                {/* Main Content */}
                <div className="grid grid-cols-12 gap-4 p-4">
                  {/* Left Section: Main Score */}
                  <div className="col-span-3 flex flex-col items-center justify-center p-2">
                    <CircularProgress 
                      value={website.overallScore} 
                      size={100} 
                      strokeWidth={8}
                      color="#3B82F6"
                      userName={website.userName}
                      userColor={website.userColor}
                    />
                    <div className="text-sm text-indigo-400 mt-2 font-medium">MODALITY</div>
                  </div>
    
                  {/* Middle Section: Modality Features */}
                  <div className="col-span-5 p-2">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center text-indigo-600 text-sm">
                        <Settings className="w-4 h-4 mr-1" />
                        <span className="font-medium">Modality Features</span>
                      </div>
                      <span className="text-indigo-600 text-sm bg-indigo-50 px-2 py-0.5 rounded-full">{website.featureCount}</span>
                    </div>
                    
                    {Object.entries(website.modalities).map(([modality, value]) => {
                      const Icon = getModalityIcon(modality);
                      const color = getModalityColor(modality);
                      
                      return (
                        <ModalityBar
                          key={modality}
                          label={modality.charAt(0).toUpperCase() + modality.slice(1)}
                          value={value}
                          color={color}
                          icon={Icon}
                        />
                      );
                    })}
                  </div>
    
                  {/* Right Section: Impact Scores */}
                  <div className="col-span-4 p-2">
                    <div className="mb-3">
                      <div className="flex items-center text-indigo-600 text-sm">
                        <Activity className="w-4 h-4 mr-1" />
                        <span className="font-medium">Potential Impact</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {Object.entries(website.impacts).map(([impact, value]) => {
                        const Icon = getImpactIcon(impact);
                        const color = getImpactColor(impact);
                        
                        return (
                          <div key={impact} className="flex items-center">
                            <div className="flex items-center w-28">
                              <Icon className="w-4 h-4 mr-2" style={{ color }} />
                              <span className="text-sm text-gray-700 capitalize">{impact}</span>
                            </div>
                            <ImpactRing value={value} size={48} color={color} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          } else {
            // Compact/Collapsed item for older entries (rank > 6)
            return (
              <div key={website.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Collapsed view */}
                <div 
                  className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleExpanded(website.id)}
                >
                  <div className="flex items-center">
                    <div className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center font-medium text-indigo-600 mr-2">
                      {website.rank}
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center overflow-hidden mr-2 rounded-full" style={{ backgroundColor: website.iconColor + '20' }}>
                        <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#6366F1' }}>
                          <span className="text-white font-bold text-xs">{website.name.charAt(0)}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-sm text-gray-800">{website.name}</h3>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full mr-3">
                      <span className="text-gray-800 font-medium text-sm">{website.overallScore}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} />
                  </div>
                </div>
                
                {/* Expanded details */}
                {isExpanded && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border-t border-gray-100">
                    {/* Modality Features */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center text-indigo-600 text-xs">
                          <Settings className="w-3 h-3 mr-1" />
                          <span className="font-medium">Modality Features</span>
                        </div>
                        <span className="text-indigo-600 text-xs bg-indigo-50 px-1.5 py-0.5 rounded-full">{website.featureCount}</span>
                      </div>
                      
                      {Object.entries(website.modalities).map(([modality, value]) => {
                        const Icon = getModalityIcon(modality);
                        const color = getModalityColor(modality);
                        
                        return (
                          <div key={modality} className="flex items-center gap-2 mb-1.5">
                            <Icon className="w-3 h-3" style={{ color }} />
                            <span className="text-xs text-gray-700 w-16">{modality}</span>
                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
                              <div 
                                className="h-full rounded-full" 
                                style={{ width: `${value}%`, backgroundColor: color }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Impact Scores */}
                    <div>
                      <div className="flex items-center text-indigo-600 text-xs mb-2">
                        <Activity className="w-3 h-3 mr-1" />
                        <span className="font-medium">Potential Impact</span>
                      </div>
                      
                      {Object.entries(website.impacts).map(([impact, value]) => {
                        const Icon = getImpactIcon(impact);
                        const color = getImpactColor(impact);
                        
                        return (
                          <div key={impact} className="flex items-center mb-1.5">
                            <div className="flex items-center w-20">
                              <Icon className="w-3 h-3 mr-1" style={{ color }} />
                              <span className="text-xs text-gray-700 capitalize">{impact}</span>
                            </div>
                            <div className="relative w-8 h-8">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs font-medium" style={{ color }}>{value}</span>
                              </div>
                              <svg className="w-8 h-8 transform -rotate-90">
                                <circle cx="16" cy="16" r="14" fill="transparent" stroke="#f0f0f0" strokeWidth="2" />
                                <circle 
                                  cx="16" cy="16" r="14" 
                                  fill="transparent" 
                                  stroke={color} 
                                  strokeWidth="3"
                                  strokeDasharray={2 * Math.PI * 14}
                                  strokeDashoffset={2 * Math.PI * 14 * (1 - value/100)}
                                  strokeLinecap="round"
                                />
                              </svg>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Additional Info */}
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{website.domain}</p>
                      {website.userName && (
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: website.userColor || '#6366F1' }}></div>
                          <span className="text-xs text-gray-700">{website.userName}'s submission</span>
                        </div>
                      )}
                      <div className="mt-2 flex items-center">
                        <span className="text-xs text-gray-500">Rank: {website.rank}</span>
                        {website.change !== 0 && (
                          <span className={`ml-2 text-xs flex items-center ${website.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {website.change > 0 ? <ArrowUp className="w-2 h-2 mr-0.5" /> : <ArrowDown className="w-2 h-2 mr-0.5" />}
                            {Math.abs(website.change)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          }
        })}
      </div>

      {/* Submit Results Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-4 max-w-sm w-full max-h-[70vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-semibold text-indigo-600">Share Your Unless Results</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              {/* User Information */}
              <div>
                <h3 className="text-gray-700 text-xs font-medium mb-2">Your Information</h3>
                <div className="grid grid-cols-2 gap-2">
                  <FormInput
                    label="Your Name"
                    value={formData.userName || ""}
                    onChange={(e) => handleChange('userName', e.target.value)}
                    placeholder="e.g. Sam"
                  />
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Your Color
                    </label>
                    <div className="flex gap-1">
                      {["#6366F1", "#F97316", "#10B981", "#8B5CF6", "#F43F5E"].map(color => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => handleChange('userColor', color)}
                          className={`w-5 h-5 rounded-full ${formData.userColor === color ? 'ring-1 ring-offset-1 ring-gray-400' : ''}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Website Information */}
              <div>
                <h3 className="text-gray-700 text-xs font-medium mb-2">Website Information</h3>
                <div className="space-y-2">
                  <FormInput
                    label="Website Name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="e.g. Twitter, CNN"
                  />
                  
                  <FormInput
                    label="Domain"
                    value={formData.domain}
                    onChange={(e) => handleChange('domain', e.target.value)}
                    placeholder="e.g. twitter.com"
                  />
                  
                  <FormInput
                    label="Overall Modality Score"
                    type="number"
                    value={formData.overallScore}
                    onChange={(e) => handleChange('overallScore', parseInt(e.target.value))}
                  />
                </div>
              </div>
              
              {/* Modality & Impact Scores */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <h3 className="text-gray-700 text-xs font-medium mb-2">Modality Scores</h3>
                  <div className="space-y-2">
                    {Object.entries(formData.modalities).map(([modality, value]) => {
                      return (
                        <FormInput
                          key={modality}
                          label={`${modality.charAt(0).toUpperCase() + modality.slice(1)}`}
                          type="number"
                          value={value}
                          onChange={(e) => handleChange(`modalities.${modality}`, parseInt(e.target.value))}
                        />
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-gray-700 text-xs font-medium mb-2">Impact</h3>
                  <div className="space-y-2">
                    {Object.entries(formData.impacts).map(([impact, value]) => {
                      return (
                        <FormInput
                          key={impact}
                          label={`${impact.charAt(0).toUpperCase() + impact.slice(1)}`}
                          type="number"
                          value={value}
                          onChange={(e) => handleChange(`impacts.${impact}`, parseInt(e.target.value))}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end gap-2">
              <button 
                onClick={() => setShowModal(false)}
                className="px-2 py-1 border border-gray-300 text-xs rounded-lg text-gray-700 flex items-center"
              >
                <X className="w-3 h-3 mr-1" />
                Exit
              </button>
              <button 
                onClick={handleSubmit}
                className="px-2 py-1 bg-indigo-600 text-white text-xs rounded-lg flex items-center"
              >
                <Save className="w-3 h-3 mr-1" />
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Multimodal Interface Analysis Box */}
      <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-indigo-600 mb-3">Multimodal Interface Analysis</h3>
        <p className="text-indigo-400 text-sm mb-6">Real-time accessibility evaluation of popular platforms. Scores reflect a comprehensive algorithm measuring multimodal accessibility features.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Speech', 'Vision', 'Hearing', 'Language'].map((modality) => {
            const lowerModality = modality.toLowerCase();
            const Icon = getModalityIcon(lowerModality);
            const color = getModalityColor(lowerModality);
            
            return (
              <div key={modality} className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: color + '20' }}>
                  <Icon className="w-6 h-6" style={{ color: color }} />
                </div>
                <h4 className="font-medium text-gray-800">{modality}</h4>
                <p className="text-xs text-gray-500 mt-1">Multimodal feature detection</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Understanding Impact Scores Box */}
      <div className="mt-6 p-6 bg-white rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-indigo-600 mb-4">Understanding Impact Scores</h3>
        <p className="text-sm text-indigo-400 mb-6">
          Impact scores represent how well a website's multimodal accessibility features enhance user experience across three critical dimensions.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center mb-3">
              <Zap className="w-5 h-5 mr-2 text-amber-600" />
              <h4 className="font-medium text-gray-800">Productivity</h4>
            </div>
            <p className="text-sm text-gray-600">
              Measures how multimodal features enhance user efficiency and task completion. Higher scores indicate interfaces that allow users to work faster and with fewer obstacles, providing multiple input/output methods that accommodate different workflows and abilities.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center mb-3">
              <Lightbulb className="w-5 h-5 mr-2 text-emerald-600" />
              <h4 className="font-medium text-gray-800">Creativity</h4>
            </div>
            <p className="text-sm text-gray-600">
              Evaluates how multimodal features inspire and empower creative expression. Higher scores reflect interfaces that offer diverse means of interaction, allowing users to express ideas through various modalities and providing tools that elevate creative thinking regardless of ability.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center mb-3">
              <RefreshCw className="w-5 h-5 mr-2 text-orange-600" />
              <h4 className="font-medium text-gray-800">Adaptability</h4>
            </div>
            <p className="text-sm text-gray-600">
              Reflects how well multimodal features accommodate diverse user needs and contexts. Higher scores indicate interfaces that are flexible across different situations, devices, and abilities, providing seamless alternatives when one modality is unavailable or unsuitable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteAnalysisDashboard;