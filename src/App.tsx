import { useEffect, useState } from 'react';
import { 
  Menu, X, Linkedin, Github, Globe, Mail, Phone, MapPin, 
  ExternalLink, Code, Cloud, Users, Award, 
  TrendingUp, Facebook, Instagram, Twitter,
  Eye, Calendar, ChevronRight, Send, Briefcase, GraduationCap,
  Star, Target, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import './App.css';

// Types
interface VisitStats {
  totalVisits: number;
  uniqueVisitors: number;
  todayVisits: number;
}

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
}

interface Skill {
  category: string;
  items: string[];
  icon: React.ReactNode;
}

interface Achievement {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visitStats, setVisitStats] = useState<VisitStats>({ totalVisits: 0, uniqueVisitors: 0, todayVisits: 0 });
  const [activeSection, setActiveSection] = useState('home');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  // Track visits using localStorage (GitHub Pages compatible - no backend needed)
  useEffect(() => {
    const trackVisit = () => {
      let visitorId = localStorage.getItem('visitorId');
      if (!visitorId) {
        visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('visitorId', visitorId);
      }

      // Use localStorage for visit tracking
      const storedVisits = localStorage.getItem('portfolioVisits');
      const visits = storedVisits ? JSON.parse(storedVisits) : { count: 0, visitors: [] };
      
      visits.count++;
      if (!visits.visitors.includes(visitorId)) {
        visits.visitors.push(visitorId);
      }
      
      localStorage.setItem('portfolioVisits', JSON.stringify(visits));
      setVisitStats({
        totalVisits: visits.count,
        uniqueVisitors: visits.visitors.length,
        todayVisits: 0
      });
    };

    trackVisit();
    fetchStats();
  }, []);

  const fetchStats = () => {
    const storedVisits = localStorage.getItem('portfolioVisits');
    if (storedVisits) {
      const visits = JSON.parse(storedVisits);
      setVisitStats({
        totalVisits: visits.count || 0,
        uniqueVisitors: visits.visitors?.length || 0,
        todayVisits: 0
      });
    }
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  // Handle contact form submission (GitHub Pages compatible)
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage
    const contacts = JSON.parse(localStorage.getItem('portfolioContacts') || '[]');
    contacts.push({
      ...contactForm,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('portfolioContacts', JSON.stringify(contacts));
    
    // Show success message
    toast.success('Message saved! Contact me directly at imdharamdk@gmail.com');
    setContactForm({ name: '', email: '', message: '' });
    
    // Optional: Open email client
    const mailtoLink = `mailto:imdharamdk@gmail.com?subject=Portfolio Contact from ${contactForm.name}&body=${encodeURIComponent(contactForm.message)}`;
    window.open(mailtoLink, '_blank');
  };

  // Data from LaTeX resume
  const experiences: Experience[] = [
    {
      title: 'Analyst (Sales Agent)',
      company: 'eClerx Services Limited',
      location: 'Chandigarh IT Park',
      period: 'July 2023 -- April 2025',
      achievements: [
        'Drove sales of premium technology products (smartphones, tablets, wearables) for Apple, Samsung, Motorola, and Google',
        'Consistently exceeded 6+ critical KPIs including NPS, AICR, CHT, FRT, and Shift Adherence',
        'Recognized as Training Champion of the batch for exceptional performance',
        'Received multiple awards for outstanding attendance and critical support to WFM/LAT teams',
        'Conducted educational sessions on AI benefits and cloud computing training events'
      ]
    },
    {
      title: 'Customer Support Specialist (Retention/Sales Agent)',
      company: 'Teleperformance',
      location: 'Mohali',
      period: 'December 2022 -- June 2023',
      achievements: [
        'Achieved 300+ monthly retention targets through strategic upselling',
        'Developed data-driven retention strategies improving customer lifetime value',
        'Analyzed customer behavior patterns to identify upselling opportunities',
        'Maintained top-tier performance metrics in high-volume environment'
      ]
    },
    {
      title: 'Virtual Customer Service Associate',
      company: 'Amazon',
      location: 'Chandigarh',
      period: 'July 2022 -- December 2022',
      achievements: [
        'Delivered exceptional customer service in fast-paced e-commerce environment',
        'Resolved complex customer issues efficiently while maintaining high service standards',
        'Collaborated with cross-functional teams to improve customer experience workflows'
      ]
    },
    {
      title: 'Customer Service Associate',
      company: 'Conneqt Business Solutions',
      location: 'Mohali',
      period: 'March 2022 -- July 2022',
      achievements: [
        'Provided technical and customer support across multiple service lines',
        'Demonstrated adaptability in learning new systems and processes quickly'
      ]
    }
  ];

  const skills: Skill[] = [
    {
      category: 'Web Development',
      items: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'React', 'TypeScript'],
      icon: <Code className="w-6 h-6" />
    },
    {
      category: 'Cloud Computing',
      items: ['Cloud Consulting', 'Cloud Architecture', 'AWS Basics', 'Azure Fundamentals'],
      icon: <Cloud className="w-6 h-6" />
    },
    {
      category: 'CRM & Analytics',
      items: ['Salesforce', 'Sales Operations', 'Customer Data Analysis', 'KPI Tracking'],
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      category: 'Core Competencies',
      items: ['Team Leadership', 'Training & Mentoring', 'KPI Optimization', 'Customer Success'],
      icon: <Users className="w-6 h-6" />
    }
  ];

  const achievements: Achievement[] = [
    {
      title: 'Training Champion',
      description: 'Selected as batch training champion for exceptional performance and peer mentorship',
      icon: <Award className="w-8 h-8" />
    },
    {
      title: 'Multiple Recognition Awards',
      description: 'Honored for outstanding attendance and critical team support during high-demand periods',
      icon: <Star className="w-8 h-8" />
    },
    {
      title: 'Consistent High Performer',
      description: 'Exceeded 300+ monthly retention targets and all major KPIs consistently',
      icon: <Target className="w-8 h-8" />
    },
    {
      title: 'Technology Educator',
      description: 'Conducted sessions on AI benefits and cloud computing for college students',
      icon: <Zap className="w-8 h-8" />
    }
  ];

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                DK Thakur
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-700 focus:outline-none"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-slate-700"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/50 to-slate-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="mb-6">
              <div className="inline-block p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
                <div className="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center">
                  <span className="text-5xl font-bold text-white">DK</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Dharmender Kumar Thakur
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-6">
              Technology Professional | Web Developer | Cloud Enthusiast
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Sahibzada Ajit Singh Nagar, Punjab, India
              </span>
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +91-8679215898
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> imdharamdk@gmail.com
              </span>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4 mb-8">
              <a
                href="https://www.linkedin.com/in/imdharamdk"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-slate-800 hover:bg-blue-600 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/imdharamdk"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-slate-800 hover:bg-gray-600 transition-all duration-300 hover:scale-110"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/imdharamdk"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-slate-800 hover:bg-blue-500 transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/imdharamdk"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-slate-800 hover:bg-pink-600 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com/imdharamdk"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-slate-800 hover:bg-sky-500 transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://imdksunny.glitch.me"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-slate-800 hover:bg-green-600 transition-all duration-300 hover:scale-110"
              >
                <Globe className="w-6 h-6" />
              </a>
            </div>

            {/* Visitor Stats */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-blue-400">
                  <Eye className="w-5 h-5" />
                  <span className="text-2xl font-bold">{visitStats.totalVisits.toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-400">Total Visits</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-purple-400">
                  <Users className="w-5 h-5" />
                  <span className="text-2xl font-bold">{visitStats.uniqueVisitors.toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-400">Unique Visitors</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-green-400">
                  <Calendar className="w-5 h-5" />
                  <span className="text-2xl font-bold">{visitStats.todayVisits}</span>
                </div>
                <p className="text-sm text-gray-400">Today's Visits</p>
              </div>
            </div>

            <Button
              onClick={() => scrollToSection('about')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-full"
            >
              Explore My Profile <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">Professional Summary</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Results-driven technology professional with <span className="text-blue-400 font-semibold">2.5+ years of experience</span> in customer-centric roles, 
                achieving <span className="text-blue-400 font-semibold">300+ monthly retention targets</span> and exceeding KPIs consistently.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Passionate about web development and cloud technologies with proven ability to educate others on AI and cloud computing. 
                Recognized training champion with strong technical foundation and sales expertise.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30 px-4 py-2">Customer Success</Badge>
                <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/30 px-4 py-2">Web Development</Badge>
                <Badge className="bg-green-600/20 text-green-400 border-green-500/30 px-4 py-2">Cloud Computing</Badge>
                <Badge className="bg-pink-600/20 text-pink-400 border-pink-500/30 px-4 py-2">Training & Mentoring</Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-slate-700/50 border-slate-600">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">2.5+</div>
                  <p className="text-gray-300">Years Experience</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-700/50 border-slate-600">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">300+</div>
                  <p className="text-gray-300">Monthly Targets</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-700/50 border-slate-600">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">6+</div>
                  <p className="text-gray-300">KPIs Exceeded</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-700/50 border-slate-600">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-pink-400 mb-2">4</div>
                  <p className="text-gray-300">Companies</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">Technical Skills</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                      {skill.icon}
                    </div>
                    <CardTitle className="text-lg text-white">{skill.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-slate-700 text-gray-300">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">Professional Experience</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </div>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-blue-400" />
                        {exp.title}
                      </h3>
                      <p className="text-blue-400 font-medium">{exp.company}</p>
                      <p className="text-gray-400 text-sm">{exp.location}</p>
                    </div>
                    <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/30 mt-2 md:mt-0 w-fit">
                      {exp.period}
                    </Badge>
                  </div>
                  <Separator className="my-4 bg-slate-700" />
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300">
                        <ChevronRight className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">Education</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </div>
          
          <Card className="bg-slate-800/50 border-slate-700 max-w-3xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white">Bachelor of Technology in Computer Science</h3>
                  <p className="text-blue-400 font-medium text-lg">Punjab Technical University</p>
                  <Badge className="bg-green-600/20 text-green-400 border-green-500/30 mt-2">
                    July 2018 -- July 2022
                  </Badge>
                  <Separator className="my-4 bg-slate-700" />
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>Developed strong foundation in algorithms, data structures, and software development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>Completed coursework in web technologies, database management, and cloud computing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">Key Achievements</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 mb-4">
                    {achievement.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{achievement.title}</h3>
                  <p className="text-gray-400 text-sm">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">Portfolio & Social Media</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </div>
          
          {/* Personal Website */}
          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="p-4 rounded-lg bg-gradient-to-r from-green-600 to-teal-600">
                  <Globe className="w-12 h-12" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">Personal Website</h3>
                  <p className="text-gray-400 mb-4">Portfolio showcasing web development projects and technical skills</p>
                  <a
                    href="https://imdksunny.glitch.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    imdksunny.glitch.me <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <Button 
                  onClick={() => window.open('https://imdksunny.glitch.me', '_blank')}
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                >
                  Visit Website <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Social Media Embeds */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* LinkedIn */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Linkedin className="w-6 h-6 text-blue-400" />
                  <CardTitle className="text-white">LinkedIn</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                  <p className="text-gray-300 text-sm mb-2">Connect with me on LinkedIn for professional updates</p>
                  <a 
                    href="https://www.linkedin.com/in/imdharamdk" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                  >
                    linkedin.com/in/imdharamdk <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="text-center text-gray-500 text-sm italic">
                  Embed your LinkedIn profile badge here
                </div>
              </CardContent>
            </Card>

            {/* GitHub */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Github className="w-6 h-6 text-gray-400" />
                  <CardTitle className="text-white">GitHub</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                  <p className="text-gray-300 text-sm mb-2">Check out my code repositories and projects</p>
                  <a 
                    href="https://github.com/imdharamdk" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                  >
                    github.com/imdharamdk <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="text-center text-gray-500 text-sm italic">
                  Embed your GitHub profile here
                </div>
              </CardContent>
            </Card>

            {/* Instagram */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Instagram className="w-6 h-6 text-pink-400" />
                  <CardTitle className="text-white">Instagram</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                  <p className="text-gray-300 text-sm mb-2">Follow me for personal updates and tech content</p>
                  <a 
                    href="https://www.instagram.com/imdharamdk" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-pink-400 hover:text-pink-300 text-sm flex items-center gap-1"
                  >
                    @imdharamdk <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="text-center text-gray-500 text-sm italic">
                  Embed your Instagram posts here
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Embed Instructions */}
          <Card className="bg-slate-800/50 border-slate-700 mt-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Code className="w-5 h-5" />
                How to Add Social Media Embeds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-300">
                <p>To add your social media posts, follow these steps:</p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Go to the post you want to embed on each platform</li>
                  <li>Click the embed/share option</li>
                  <li>Copy the embed code provided</li>
                  <li>Paste it in the respective section above</li>
                </ol>
                <div className="bg-slate-700/50 rounded-lg p-4 mt-4">
                  <p className="text-sm font-mono text-green-400">
                    {/* Example embed code structure */}
                    &lt;iframe src=&quot;https://...&quot; ...&gt;&lt;/iframe&gt;
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-blue-600/20">
                      <Phone className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p className="text-white">+91-8679215898</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-purple-600/20">
                      <Mail className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white">imdharamdk@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-green-600/20">
                      <MapPin className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-white">Sahibzada Ajit Singh Nagar, Punjab, India</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6 bg-slate-700" />

                <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
                <div className="flex gap-3">
                  <a href="https://www.linkedin.com/in/imdharamdk" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-slate-700 hover:bg-blue-600 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://github.com/imdharamdk" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-slate-700 hover:bg-gray-600 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://www.facebook.com/imdharamdk" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-slate-700 hover:bg-blue-500 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://www.instagram.com/imdharamdk" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-slate-700 hover:bg-pink-600 transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Send Message</h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Name</label>
                    <Input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Your name"
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Email</label>
                    <Input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="your@email.com"
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Message</label>
                    <Textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Your message..."
                      rows={4}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-500"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Send Message <Send className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-white font-semibold">Dharmender Kumar Thakur</p>
              <p className="text-gray-400 text-sm">Technology Professional & Web Developer</p>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Eye className="w-4 h-4" />
              <span>{visitStats.totalVisits.toLocaleString()} visits</span>
            </div>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
