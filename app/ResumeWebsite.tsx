"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  ChevronDown, Mail, MapPin, Github, Linkedin, Code, Zap, Cpu, Database,
  Shield, Award, Calendar, ArrowRight, Download, Briefcase, GraduationCap,
  Cloud, Activity, Server, Globe, Menu, X, CheckCircle2, BookOpen
} from 'lucide-react';

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

const ResumeWebsite = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      const sections = ['hero', 'services', 'about', 'experience', 'capabilities', 'projects', 'contact'];
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
    setIsMobileMenuOpen(false);
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

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'Services', id: 'services' },
    { name: 'About', id: 'about' },
    { name: 'Experience', id: 'experience' },
    { name: 'Work', id: 'projects' },
  ];

  const stats = [
    { value: '15+', label: 'Years in Critical Infrastructure' },
    { value: '8', label: 'Countries with Live Systems' },
    { value: '100+', label: 'PMU Devices Supervised' },
    { value: '2', label: 'Peer-Reviewed Publications' },
  ];

  const services = [
    {
      title: 'Real-Time Data & Monitoring',
      description: 'Telemetry pipelines and dashboards built on Zabbix, Grafana, and openHistorian — proven across monitoring systems live in eight countries, supervising 100+ real-time measurement devices.',
      icon: <Activity className="w-6 h-6" />,
      span: 'md:col-span-2',
      featured: true,
    },
    {
      title: 'Cloud Infrastructure & Migration',
      description: 'AWS environments (EC2, S3) designed for reliability and scale — not just launch day.',
      icon: <Cloud className="w-6 h-6" />,
      span: 'md:col-span-1',
    },
    {
      title: 'Network & Security',
      description: 'VPNs and TCP/IP architecture for environments where data integrity is not optional.',
      icon: <Shield className="w-6 h-6" />,
      span: 'md:col-span-1',
    },
    {
      title: 'Systems Administration & DevOps',
      description: 'Linux/Windows Server administration, Python/Bash automation, CI/CD workflows, and Docker deployments for infrastructure that runs 24/7.',
      icon: <Server className="w-6 h-6" />,
      span: 'md:col-span-2',
    },
  ];

  const capabilities = [
    {
      category: 'Cloud',
      icon: <Cloud className="w-5 h-5" />,
      tags: ['AWS EC2', 'AWS S3'],
    },
    {
      category: 'Monitoring & Observability',
      icon: <Activity className="w-5 h-5" />,
      tags: ['Zabbix', 'Grafana', 'openHistorian', 'openPDC'],
    },
    {
      category: 'Systems',
      icon: <Server className="w-5 h-5" />,
      tags: ['Linux', 'Windows Server', 'VPN Configuration', 'TCP/IP Networking'],
    },
    {
      category: 'Databases',
      icon: <Database className="w-5 h-5" />,
      tags: ['PostgreSQL', 'MySQL', 'InfluxDB', 'SNAPdb'],
    },
    {
      category: 'Programming & Scripting',
      icon: <Code className="w-5 h-5" />,
      tags: ['Python', 'Bash', 'C / C++', 'MATLAB'],
    },
    {
      category: 'Domain Knowledge',
      icon: <Zap className="w-5 h-5" />,
      tags: ['Electrical Engineering', 'Power Systems', 'IEEE C37.118'],
    },
  ];

  const experiences = [
    {
      title: 'Infrastructure & Data Engineer',
      company: 'INESC P&D Brasil',
      duration: 'Nov 2023 – Present',
      location: 'Remote',
      description: 'Build and maintain Python-based data integration pipelines for real-time telemetry ingestion and validation across distributed measurement infrastructure serving high-voltage transmission monitoring systems.',
      achievements: [
        'Administer Linux environments supporting continuous data acquisition from high-voltage transmission monitoring systems',
        'Validate telemetry data quality and pipeline integrity, ensuring reliable delivery of real-time operational data for engineering analysis',
        'Design and implement post-event analysis tooling to support infrastructure performance reporting and incident review',
        'Contribute to applied research on synchrophasor-based protection analytics for interconnected AC/DC power systems with embedded HVDC infrastructure'
      ],
      type: 'current'
    },
    {
      title: 'Infrastructure Engineer — International Monitoring Platform',
      company: 'FEESC / MedFasee Program',
      duration: 'Jun 2015 – Oct 2023',
      location: 'Florianópolis, SC, Brazil',
      description: 'Deployed and operated Zabbix monitoring across an 8-country international infrastructure (Brazil, Argentina, Chile, Uruguay, Portugal, Spain, Italy, Croatia), supervising 100+ synchronized phasor measurement devices.',
      achievements: [
        'Administered Windows Server and Linux environments supporting 24/7 real-time data collection, concentrator services, and time-synchronized telemetry pipelines',
        'Configured VPN tunnels and secure communication channels for inter-site data exchange between measurement stations and central data centers',
        'Managed PostgreSQL and InfluxDB databases for time-series telemetry storage, performing data completeness tracking, latency validation, and capacity monitoring'
      ],
      type: 'past'
    },
    {
      title: 'Research Engineer — Monitoring Infrastructure & Software Development',
      company: 'Federal University of Santa Catarina (UFSC)',
      duration: 'Sep 2009 – May 2015',
      location: 'Florianópolis, SC, Brazil',
      description: 'Developed C/C++ analytical tooling applying OOP design principles for real-time data processing and disturbance detection in synchrophasor infrastructure.',
      achievements: [
        'Deployed and maintained PMU-based monitoring infrastructure at transmission substations, including hardware commissioning, software configuration, and data pipeline validation',
        'Built MATLAB-based analysis tools for time-series signal processing and infrastructure performance evaluation',
        'Authored technical manuals for firewall, PMU, and GPS clock configurations'
      ],
      type: 'past'
    }
  ];

  const projects = [
    {
      title: 'openPDC/openHistorian Deployment — CTEEP',
      tech: ['openPDC', 'openHistorian 2', 'openXDA'],
      description: 'Delivered full technical implementation of the Grid Protection Alliance open-source monitoring stack at CTEEP, the largest transmission utility in São Paulo state.',
      icon: <Activity className="w-9 h-9" />,
      gradient: 'from-blue-600 to-slate-900',
      status: 'Completed',
      year: '2022',
      span: 'md:col-span-2',
      featured: true,
    },
    {
      title: 'Zabbix International Deployment',
      tech: ['Zabbix', 'Grafana', 'TCP/IP'],
      description: '8-country network (Europe & South America) supervising 100+ real-time phasor measurement devices with alerting and performance dashboards.',
      icon: <Globe className="w-8 h-8" />,
      gradient: 'from-indigo-600 to-slate-900',
      status: 'Completed',
      year: '2015 – 2023',
      span: 'md:col-span-1',
    },
    {
      title: 'Python Telemetry Pipeline',
      tech: ['Python', 'PostgreSQL', 'InfluxDB'],
      description: 'Data integration pipelines for real-time telemetry ingestion, quality validation, and operational reporting from distributed infrastructure endpoints.',
      icon: <Code className="w-8 h-8" />,
      gradient: 'from-slate-700 to-slate-900',
      status: 'Ongoing',
      year: '2023 – Present',
      span: 'md:col-span-1',
    },
    {
      title: 'Real-Time Protection Analytics Infrastructure',
      tech: ['C/C++', 'MATLAB', 'HVDC Systems'],
      description: 'Telemetry and data-processing infrastructure supporting synchrophasor-based protection and transient instability studies for interconnected AC/DC transmission systems — published in Electric Power Systems Research (Qualis A1) and at PSCC.',
      icon: <Cpu className="w-9 h-9" />,
      gradient: 'from-blue-700 to-indigo-900',
      status: 'Published',
      year: '2026',
      span: 'md:col-span-2',
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
      degree: 'Graduate-Level Coursework in Electrical Engineering — Power Systems',
      school: 'Federal University of Santa Catarina (UFSC)',
      year: '2012 – 2013',
      focus: '27 graduate credits: Power System Dynamics, Operation Planning, Control Systems, Numerical Optimization'
    },
    {
      degree: 'Associate Degree in Energy Systems',
      school: 'Federal Institute of Santa Catarina',
      year: '2011',
      focus: 'Use of Object-Oriented Computational Paradigm for Phasor Data Request and Acquisition'
    }
  ];

  const publications = [
    {
      venue: 'Electric Power Systems Research (Qualis A1)',
      year: '2026',
      description: 'Co-author: synchrophasor-based backup protection analytics and transient instability mitigation in HVDC-integrated transmission systems.'
    },
    {
      venue: 'Power Systems Computation Conference (PSCC)',
      year: '2026',
      description: 'Real-time synchrophasor analytics and protection strategies for interconnected AC/DC systems.'
    }
  ];

  const credentials = [
    'AWS Certified AI Practitioner',
    'AWS Solutions Architect – Associate (In Progress)',
    'Licensed Electrical Engineer (CREA, Brazil)',
    'Graduate Coursework, Power Systems (UFSC)',
  ];

  const trustBadges = [
    'AWS Certified AI Practitioner',
    '15+ Years in Critical Infrastructure',
    'Live Systems in 8 Countries',
    'U.S. Work Authorized — No Sponsorship Required',
  ];

  const statusStyles: Record<string, string> = {
    Completed: 'bg-emerald-500 text-white',
    Ongoing: 'bg-blue-500 text-white',
    Published: 'bg-indigo-500 text-white',
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-100' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => scrollToSection('hero')}
              className={`text-lg font-bold tracking-tight transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'}`}
            >
              Fabio Mantelli
            </button>
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-blue-600'
                      : isScrolled ? 'text-slate-600 hover:text-slate-900' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
                  )}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-all duration-300 shadow-sm"
              >
                Let&apos;s Talk
              </button>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 space-y-1">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === item.id ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-center mt-2 px-4 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold"
              >
                Let&apos;s Talk
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero + Stats (dark block) */}
      <div className="bg-slate-950">
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
              backgroundSize: '48px 48px'
            }}
          ></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-blue-600/20 rounded-full blur-[140px]"></div>

          <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-32 pb-20">
            <div className="mb-8 relative inline-block">
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden shadow-2xl ring-4 ring-white/10">
                <Image
                  src="/fabio.jpeg"
                  alt="Fabio Mantelli"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-slate-950"></div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-white/5 border border-white/10 rounded-full text-sm text-slate-300">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
              AWS Certified AI Practitioner · Winter Garden, FL
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              Cloud Infrastructure for<br className="hidden sm:block" /> Mission-Critical Energy Systems
            </h1>

            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              DevOps and Infrastructure Engineer with 15+ years building the monitoring and data
              infrastructure behind real-time power grid systems across eight countries. AWS
              Certified AI Practitioner, helping energy, utility, and industrial teams design
              cloud systems that stay online.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                Book a Consultation <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-white/20 text-white rounded-full font-semibold hover:bg-white/5 transition-all duration-300 flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {trustBadges.map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  {badge}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => scrollToSection('services')}
            aria-label="Scroll to services"
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/40 hover:text-white/70 transition-colors"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </section>

        {/* Stats band */}
        <div className="border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/10">
              {stats.map((stat, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="px-6 py-10 text-center">
                    <div className="text-4xl md:text-5xl font-bold text-white tracking-tight">{stat.value}</div>
                    <div className="text-xs md:text-sm text-slate-400 mt-2 uppercase tracking-wide">{stat.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-sm font-semibold text-blue-600 tracking-wide uppercase">Services</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-4 tracking-tight">
              Cloud infrastructure built for systems that can&apos;t go down
            </h2>
            <p className="text-slate-600 leading-relaxed">
              I bring the same engineering discipline used to keep national power grids online
              to your company&apos;s cloud infrastructure.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5">
            {services.map((service, index) => (
              <Reveal key={index} delay={index * 80} className={service.span}>
                <div className={`h-full rounded-2xl p-8 transition-all duration-300 ${
                  service.featured
                    ? 'bg-slate-900 text-white hover:bg-slate-800'
                    : 'bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-lg'
                }`}>
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-6 ${
                    service.featured ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white'
                  }`}>
                    {service.icon}
                  </div>
                  <h3 className={`text-lg font-bold mb-3 ${service.featured ? 'text-white' : 'text-slate-900'}`}>{service.title}</h3>
                  <p className={`text-sm leading-relaxed ${service.featured ? 'text-slate-300' : 'text-slate-600'}`}>{service.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-14">
            <span className="text-sm font-semibold text-blue-600 tracking-wide uppercase">Why Work With Me</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 tracking-tight max-w-2xl">
              Engineering rigor meets cloud expertise
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 space-y-10">
              <Reveal>
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-slate-900">Built for Critical Infrastructure</h3>
                </div>
                <p className="text-slate-600 leading-relaxed text-lg">
                  For over <span className="text-slate-900 font-semibold">15 years</span> I&apos;ve
                  designed and operated the monitoring infrastructure behind synchrophasor-based
                  power grid systems — including an <span className="text-slate-900 font-semibold">8-country
                  Zabbix deployment</span> supervising <span className="text-slate-900 font-semibold">100+
                  real-time phasor measurement devices</span> — where downtime isn&apos;t an
                  inconvenience, it&apos;s a risk to grid reliability. That same discipline now shapes
                  how I build infrastructure for clients: secure by design, monitored continuously,
                  and documented clearly.
                </p>
              </Reveal>

              <Reveal delay={100}>
                <div className="flex items-center gap-3 mb-3">
                  <Cpu className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-slate-900">From Electrical Engineering to AWS</h3>
                </div>
                <p className="text-slate-600 leading-relaxed text-lg">
                  I hold a degree in Electrical Engineering, graduate-level coursework in Power
                  Systems from UFSC, and an AWS Certified AI Practitioner credential — a combination
                  that lets me speak both languages: the physical systems your infrastructure
                  supports, and the cloud architecture that keeps the data flowing. I&apos;ve built
                  this cross-domain expertise for utilities, research institutions, and industrial
                  R&amp;D teams across eight countries in South America and Europe.
                </p>
              </Reveal>

              <Reveal delay={200}>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Credentials</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {credentials.map((cred, i) => (
                    <span key={i} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700">
                      {cred}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-2 space-y-10">
              <Reveal delay={100}>
                <div className="flex items-center gap-2 mb-5">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Education</span>
                </div>
                <div className="divide-y divide-slate-200">
                  {education.map((edu, index) => (
                    <div key={index} className="py-4 first:pt-0">
                      <h4 className="font-semibold text-slate-900 text-sm">{edu.degree}</h4>
                      <p className="text-blue-600 font-medium text-sm mt-0.5">{edu.school}</p>
                      <p className="text-slate-500 text-sm mt-0.5">{edu.focus} · {edu.year}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="flex items-center gap-2 mb-5">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Research &amp; Publications</span>
                </div>
                <div className="divide-y divide-slate-200">
                  {publications.map((pub, index) => (
                    <div key={index} className="py-4 first:pt-0">
                      <h4 className="font-semibold text-slate-900 text-sm">{pub.venue}</h4>
                      <p className="text-slate-500 text-sm mt-0.5">{pub.description} · {pub.year}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="mb-14">
            <span className="text-sm font-semibold text-blue-600 tracking-wide uppercase">Track Record</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 tracking-tight">
              Professional Experience
            </h2>
          </Reveal>

          <div className="divide-y divide-slate-200">
            {experiences.map((exp, index) => (
              <Reveal key={index} delay={index * 80}>
                <div
                  className={`group grid md:grid-cols-[220px_1fr] gap-4 md:gap-10 -mx-6 px-6 pb-12 rounded-2xl transition-colors duration-300 hover:bg-slate-50 ${
                    index === 0 ? 'pt-0' : 'pt-12'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      {exp.duration}
                    </div>
                    <span className={`inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-xs font-medium ${
                      exp.type === 'current'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {exp.type === 'current' && (
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                        </span>
                      )}
                      {exp.type === 'current' ? 'Current' : 'Previous'}
                    </span>
                    <p className="text-slate-500 text-sm mt-3 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      {exp.location}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{exp.title}</h3>
                    <h4 className="text-base text-blue-600 font-semibold mt-1 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      {exp.company}
                    </h4>
                    <p className="text-slate-600 mt-4 leading-relaxed">{exp.description}</p>

                    <ul className="mt-5 space-y-2.5">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                          <ArrowRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-14">
            <span className="text-sm font-semibold text-blue-600 tracking-wide uppercase">Capabilities</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 tracking-tight">
              Technical Toolkit
            </h2>
          </Reveal>

          <Reveal>
            <div className="bg-white rounded-3xl border border-slate-100 divide-y divide-slate-100 overflow-hidden">
              {capabilities.map((group, index) => (
                <div key={index} className="flex flex-col md:flex-row md:items-center gap-4 px-8 py-6">
                  <div className="flex items-center gap-3 md:w-64 flex-shrink-0">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      {group.icon}
                    </div>
                    <span className="text-sm font-bold text-slate-900">{group.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Projects / Case Studies Section */}
      <section id="projects" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-14">
            <span className="text-sm font-semibold text-blue-600 tracking-wide uppercase">Case Studies</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 tracking-tight">
              Featured Work
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Reveal key={index} delay={index * 80} className={project.span}>
                <div className={`group h-full rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${project.featured ? 'md:flex md:flex-row' : ''}`}>
                  <div className={`relative bg-gradient-to-br ${project.gradient} flex items-center justify-center ${project.featured ? 'h-48 md:h-auto md:w-2/5' : 'h-40'}`}>
                    <div className="text-white/90 group-hover:scale-110 transition-transform duration-500">
                      {project.icon}
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[project.status] ?? 'bg-white/15 text-white border border-white/20'}`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="text-white/80 text-sm font-semibold">{project.year}</span>
                    </div>
                  </div>

                  <div className={`p-6 bg-white ${project.featured ? 'md:w-3/5 md:flex md:flex-col md:justify-center' : ''}`}>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 mb-5 leading-relaxed text-sm">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-xs font-medium border border-slate-100">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact + Footer (dark block) */}
      <div className="bg-slate-950 text-white">
        <section id="contact" className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-5 gap-12">
              <Reveal className="lg:col-span-2">
                <span className="text-sm font-semibold text-blue-400 tracking-wide uppercase">Contact</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 tracking-tight">
                  Let&apos;s talk about your infrastructure
                </h2>
                <p className="text-slate-400 leading-relaxed mb-10">
                  Whether you need a cloud migration, a monitoring system, or a second set of eyes
                  on your architecture — I&apos;d like to hear about it.
                </p>

                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">
                      <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <span className="text-slate-500 text-xs">Email</span>
                      <p className="text-white font-medium">fmmantelli@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">
                      <MapPin className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <span className="text-slate-500 text-xs">Location</span>
                      <p className="text-white font-medium">Winter Garden, FL</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-500 mt-6 max-w-sm">
                  Fabio Mantelli LLC · U.S. Permanent Resident (Green Card) — authorized to work
                  without sponsorship.
                </p>

                <div className="flex gap-3 mt-8">
                  <a
                    href="https://github.com/fabiomantelli"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="p-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl transition-colors duration-300"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/fabiommantelli/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="p-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl transition-colors duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </Reveal>

              <Reveal delay={120} className="lg:col-span-3">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-400/30 rounded-xl">
                      <p className="text-emerald-300 text-sm font-medium">Message sent successfully. I&apos;ll get back to you soon.</p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-400/30 rounded-xl">
                      <p className="text-red-300 text-sm font-medium">Failed to send message. Please try again or contact me directly.</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          placeholder="Your email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        rows={5}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Tell me about your project"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-600/20 hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} Fabio Mantelli LLC. All rights reserved.
            </p>
            <p className="text-slate-600 text-sm text-center sm:text-right">
              Cloud Infrastructure for Energy &amp; Utility Systems · Winter Garden, FL
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ResumeWebsite;
