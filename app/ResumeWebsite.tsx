"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown, Mail, MapPin, Github, Linkedin, ExternalLink, Code, Zap, Monitor, Cpu, Database, Shield, Award, Calendar, ArrowRight, Download, User, Briefcase, GraduationCap, Star } from 'lucide-react';

const ResumeWebsite = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Estados do formulário de contato
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['hero', 'about', 'experience', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Limpar formulário
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const skills = [
    { name: 'Electrical Engineering', level: 95, icon: <Zap className="w-5 h-5" />, category: 'engineering' },
    { name: 'Circuit Design', level: 90, icon: <Cpu className="w-5 h-5" />, category: 'engineering' },
    { name: 'Full Stack Development', level: 88, icon: <Code className="w-5 h-5" />, category: 'tech' },
    { name: 'System Architecture', level: 92, icon: <Monitor className="w-5 h-5" />, category: 'tech' },
    { name: 'Database Management', level: 85, icon: <Database className="w-5 h-5" />, category: 'tech' },
    { name: 'Cybersecurity', level: 80, icon: <Shield className="w-5 h-5" />, category: 'tech' }
  ];

  const experiences = [
    {
      title: 'IT Specialist / Electrical Engineer',
      company: 'INESC P&D Brasil',
      duration: 'Nov 2023 - Present',
      location: 'Florianópolis, SC, Brazil',
      description: 'Designed and maintained IT infrastructure for synchrophasor-based R&D projects, configuring AWS S3 and EC2 for data storage and processing.',
      achievements: [
        'Implemented secure network communication (LAN, VPN, firewalls) for data exchange with partner universities',
        'Developed Python and C# applications for real-time data acquisition and processing',
        'Applied Kanban methodology to manage tasks and optimize workflow across all IT and development projects'
      ],
      type: 'current'
    },
    {
      title: 'IT Specialist / Electrical Engineer',
      company: 'FEESC',
      duration: 'Jun 2015 - Oct 2023',
      location: 'Florianópolis, SC, Brazil',
      description: 'Led IT operations for the MedFasee BT Brasil System, managing infrastructure configurations on Linux and Windows Server environments.',
      achievements: [
        'Configured and maintained databases (SQLite, PostgreSQL, SNAPdb) for synchrophasor data storage',
        'Developed Next.js-based dashboards for operational monitoring of synchrophasor systems across Brazil, Argentina, Chile, Portugal, and Spain',
        'Performed system administration tasks including firewall setup, computer formatting, and user management'
      ],
      type: 'past'
    },
    {
      title: 'IT Researcher',
      company: 'LabPlan',
      duration: 'Sep 2009 - May 2015',
      location: 'Florianópolis, SC, Brazil',
      description: 'Built and managed IT infrastructure for the MedFasee BT Project, configuring Zabbix for system monitoring and Docker for application deployment.',
      achievements: [
        'Developed C/C++ and Matlab scripts for synchronized phasor measurement systems',
        'Configured LAN networks and firewalls to enable secure data exchange between UFSC and partner institutions',
        'Authored technical manuals for firewall, PMU, and GPS clock configurations'
      ],
      type: 'past'
    }
  ];

  const projects = [
    {
      title: 'Synchrophasor Measurement System',
      tech: ['Python', 'C#', 'AWS S3', 'EC2'],
      description: 'Developed a comprehensive system for real-time synchrophasor data acquisition and processing with cloud integration.',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop',
      status: 'Completed',
      year: '2023'
    },
    {
      title: 'MedFasee BT Brasil System',
      tech: ['Next.js', 'PostgreSQL', 'SNAPdb', 'Linux'],
      description: 'Built operational monitoring dashboards for synchrophasor systems across multiple countries in South America and Europe.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      status: 'Completed',
      year: '2022'
    },
    {
      title: 'Smart Grid Infrastructure',
      tech: ['C/C++', 'Matlab', 'Zabbix', 'Docker'],
      description: 'Designed and implemented IT infrastructure for smart grid research projects with advanced monitoring capabilities.',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop',
      status: 'Completed',
      year: '2015'
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Electrical Engineering',
      school: 'Federal Institute of Santa Catarina',
      year: '2020',
      focus: 'Blockchain and Smart Contracts: Peer-to-Peer Transactions for Microgrid Electric Energy Trading'
    },
    {
      degree: 'Undergraduate Degree in Energy Systems Technology',
      school: 'Federal Institute of Santa Catarina',
      year: '2011',
      focus: 'Use of Object-Oriented Computational Paradigm for Phasor Data Request and Acquisition'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              Fabio Matheus Mantelli
            </div>
            <div className="hidden md:flex space-x-8">
              {[
                { name: 'Home', id: 'hero' },
                { name: 'About', id: 'about' },
                { name: 'Experience', id: 'experience' },
                { name: 'Skills', id: 'skills' },
                { name: 'Projects', id: 'projects' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative font-medium transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'text-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
                  )}
                </button>
              ))}
            </div>
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-gray-600"></div>
                <div className="w-full h-0.5 bg-gray-600"></div>
                <div className="w-full h-0.5 bg-gray-600"></div>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="text-center z-10 max-w-4xl mx-auto px-6">
          <div className="mb-8 relative">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-2xl ring-4 ring-white">
              <Image 
                src="/fabio.jpeg" 
                alt="Fabio Mantelli" 
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 leading-tight font-serif">
            Fabio Matheus Mantelli
          </h1>
          
          <div className="text-xl md:text-2xl mb-8 text-gray-600 font-medium">
            Electrical Engineer & IT Specialist
          </div>
          
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Bridging traditional electrical systems with cutting-edge digital technologies. 
            Specialized in creating innovative solutions for smart grid infrastructure and digital transformation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              Get In Touch <ArrowRight className="w-5 h-5" />
            </button>
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              About Me
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 font-serif">Professional Journey</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  With over 14 years of experience in electrical engineering and IT, I specialize in creating innovative solutions 
                  that merge traditional electrical systems with modern digital technologies. My expertise spans from power system 
                  design to full-stack development, with a focus on synchrophasor systems and smart grid infrastructure.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Star className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 font-serif">Innovation Focus</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  I&apos;m passionate about smart grid technologies, synchrophasor systems, and sustainable energy solutions. 
                  My goal is to contribute to a more connected and efficient world through intelligent electrical systems and advanced monitoring capabilities.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900 font-serif">Certifications</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    'Professional Engineer (PE)',
                    'AWS Solutions Architect',
                    'CompTIA (Expected 2025)',
                    'Project Management'
                  ].map((cert, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700 text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-900 font-serif">Education</h3>
                </div>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-green-200 pl-4">
                      <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                      <p className="text-green-600 font-medium">{edu.school}</p>
                      <p className="text-gray-600 text-sm">{edu.focus} • {edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              Professional Experience
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-blue-200"></div>
            
            {experiences.map((exp, index) => (
              <div key={index} className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2'}`}>
                <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span className="text-blue-600 font-semibold">{exp.duration}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        exp.type === 'current' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {exp.type === 'current' ? 'Current' : 'Previous'}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 font-serif">{exp.title}</h3>
                    <h4 className="text-xl text-blue-600 font-semibold mb-1">{exp.company}</h4>
                    <p className="text-gray-500 mb-4 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </p>
                    <p className="text-gray-600 mb-6 leading-relaxed">{exp.description}</p>
                    
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900 mb-3 font-serif">Key Achievements:</h5>
                      {exp.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <ArrowRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 top-8 w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              Skills & Expertise
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl ${
                    skill.category === 'engineering' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-green-100 text-green-600'
                  } group-hover:scale-110 transition-transform duration-300`}>
                    {skill.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 font-serif">{skill.name}</h3>
                    <p className="text-gray-500 text-sm capitalize">{skill.category === 'engineering' ? 'Engineering' : 'Technology'}</p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Proficiency</span>
                    <span className="text-sm font-bold text-gray-900">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-3 rounded-full transition-all duration-1000 ${
                        skill.category === 'engineering' 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                          : 'bg-gradient-to-r from-green-500 to-green-600'
                      }`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    width={400}
                    height={192}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Completed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white font-semibold">{project.year}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors font-serif">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300 group">
                    View Project 
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              Let&apos;s Connect
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Get In Touch</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  I&apos;m always interested in discussing new opportunities, innovative projects, 
                  or collaborations in electrical engineering and technology.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Email</span>
                      <p className="text-gray-900 font-semibold">fmmantelli@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {/* <div className="p-3 bg-green-100 rounded-xl">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Phone</span>
                      <p className="text-gray-900 font-semibold">+1 (407) 247-1860</p>
                    </div> */}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-100 rounded-xl">
                      <MapPin className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Location</span>
                      <p className="text-gray-900 font-semibold">Winter Garden, FL</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4 mt-8">
                  <a 
                    href="https://github.com/fabiomantelli" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-colors duration-300"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/fabiommantelli/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 font-serif">Send a Message</h3>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-xl">
                  <p className="text-green-800 font-medium">✅ Message sent successfully! I&apos;ll get back to you soon.</p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded-xl">
                  <p className="text-red-800 font-medium">❌ Failed to send message. Please try again or contact me directly.</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 Fabio Matheus Mantelli. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ResumeWebsite;