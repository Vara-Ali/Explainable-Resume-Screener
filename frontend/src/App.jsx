import { useState } from 'react'
import { parseResume, summarizeResume, scoreResume } from './api'

function App () {
  const [file, setFile] = useState(null)
  const [jobDesc, setJobDesc] = useState('')
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [summary, setSummary] = useState(null)
  const [score, setScore] = useState(null)

  const handleParse = async () => {
    if (!file) return
    setLoading(true)
    try {
      const res = await parseResume(file)
      setPreview(res)
    } catch (e) {
      alert(e.message)
    }
    setLoading(false)
  }

  const handleSummarize = async () => {
    if (!file) return
    setLoading(true)
    try {
      const res = await summarizeResume(file)
      setSummary(res.summary)
    } catch (e) {
      alert(e.message)
    }
    setLoading(false)
  }

  const handleScore = async () => {
    if (!file || !jobDesc) return
    setLoading(true)
    try {
      const res = await scoreResume(file, jobDesc)
      setScore(res)
    } catch (e) {
      alert(e.message)
    }
    setLoading(false)
  }

  const styles = {
    body: {
      margin: 0,
      padding: 0,
      fontFamily:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      backgroundColor: '#ffffff',
      color: '#1a1a1a',
      lineHeight: 1.6,
      minHeight: '100vh',
      width: '100%'
    },

    // Navigation
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: 'white',
      borderBottom: '1px solid #f0f0f0',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      width: '100%',
      boxSizing: 'border-box'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#1a1a1a'
    },
    logoIcon: {
      width: '32px',
      height: '32px',
      backgroundColor: '#ff4757',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '1.2rem'
    },
    navLinks: {
      display: 'flex',
      gap: '2rem',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    navLink: {
      color: '#666',
      textDecoration: 'none',
      fontSize: '0.95rem',
      fontWeight: '500',
      transition: 'color 0.2s'
    },
    ctaButton: {
      backgroundColor: '#ff4757',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      textDecoration: 'none',
      fontSize: '0.9rem',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },

    // Hero Section
    hero: {
      backgroundColor: '#f8f9fa',
      padding: '4rem 2rem',
      textAlign: 'center',
      width: '100%'
    },
    heroContent: {
      maxWidth: '800px',
      margin: '0 auto'
    },
    heroSubtitle: {
      color: '#ff4757',
      fontSize: '0.9rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      marginBottom: '1rem'
    },
    heroTitle: {
      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
      fontWeight: 'bold',
      lineHeight: 1.1,
      marginBottom: '1.5rem',
      color: '#1a1a1a'
    },
    heroDescription: {
      fontSize: '1.1rem',
      color: '#666',
      marginBottom: '2rem',
      maxWidth: '600px',
      margin: '0 auto 2rem auto'
    },
    heroButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      marginBottom: '3rem',
      flexWrap: 'wrap'
    },
    primaryButton: {
      backgroundColor: '#ff4757',
      color: 'white',
      padding: '1rem 2rem',
      borderRadius: '8px',
      textDecoration: 'none',
      fontSize: '1rem',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      color: '#1a1a1a',
      padding: '1rem 2rem',
      borderRadius: '8px',
      textDecoration: 'none',
      fontSize: '1rem',
      fontWeight: '600',
      border: '2px solid #1a1a1a',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },

    // Main App Section
    appSection: {
      padding: '4rem 2rem',
      backgroundColor: 'white',
      width: '100%'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%'
    },
    sectionTitle: {
      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '1rem',
      color: '#1a1a1a'
    },
    sectionSubtitle: {
      fontSize: '1.1rem',
      color: '#666',
      textAlign: 'center',
      marginBottom: '3rem'
    },

    // App Interface
    appInterface: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '3rem',
      marginTop: '2rem',
      width: '100%'
    },
    appCard: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
      border: '1px solid #f0f0f0',
      width: '100%',
      boxSizing: 'border-box'
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '1.5rem'
    },
    cardIcon: {
      width: '24px',
      height: '24px',
      fontSize: '1.2rem'
    },
    cardTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1a1a1a',
      margin: 0
    },

    // Upload Area
    uploadArea: {
      border: '2px dashed #e0e0e0',
      borderRadius: '12px',
      padding: '2rem',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s',
      backgroundColor: '#fafafa',
      display: 'block',
      width: '100%',
      boxSizing: 'border-box'
    },
    uploadAreaActive: {
      borderColor: '#ff4757',
      backgroundColor: '#fff5f5'
    },
    uploadIcon: {
      fontSize: '2.5rem',
      color: '#ccc',
      marginBottom: '1rem'
    },
    uploadText: {
      fontSize: '1rem',
      fontWeight: '500',
      color: '#666',
      marginBottom: '0.5rem'
    },
    uploadSubtext: {
      fontSize: '0.875rem',
      color: '#999'
    },

    // File Indicator
    fileIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '1rem',
      backgroundColor: '#f0f9ff',
      border: '1px solid #bae6fd',
      borderRadius: '12px',
      marginTop: '1rem'
    },

    // Buttons
    buttonGroup: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.75rem',
      marginTop: '1.5rem'
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      padding: '0.875rem 1rem',
      borderRadius: '8px',
      border: 'none',
      fontSize: '0.9rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    parseButton: {
      backgroundColor: '#3b82f6',
      color: 'white'
    },
    summarizeButton: {
      backgroundColor: '#10b981',
      color: 'white'
    },
    scoreButton: {
      backgroundColor: '#8b5cf6',
      color: 'white',
      width: '100%',
      marginTop: '1rem'
    },
    disabledButton: {
      backgroundColor: '#f3f4f6',
      color: '#9ca3af',
      cursor: 'not-allowed'
    },

    // Form Elements - FIXED: Added proper text color
    textarea: {
      width: '100%',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1rem',
      fontSize: '0.9rem',
      fontFamily: 'inherit',
      resize: 'vertical',
      outline: 'none',
      transition: 'border-color 0.2s',
      backgroundColor: '#ffffff',
      color: '#1a1a1a', // FIXED: Added text color
      boxSizing: 'border-box'
    },

    // Results
    resultCard: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      border: '1px solid #f0f0f0',
      width: '100%',
      boxSizing: 'border-box'
    },
    resultHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginBottom: '1rem'
    },
    resultTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#1a1a1a',
      margin: 0
    },
    previewArea: {
      backgroundColor: '#f8f9fa',
      border: '1px solid #e9ecef',
      borderRadius: '8px',
      padding: '1rem',
      fontSize: '0.85rem',
      fontFamily: 'Monaco, monospace',
      maxHeight: '300px',
      overflowY: 'auto',
      whiteSpace: 'pre-wrap',
      color: '#495057',
      width: '100%',
      boxSizing: 'border-box'
    },
    summaryList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    summaryItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      padding: '0.875rem',
      backgroundColor: '#f0f9ff',
      border: '1px solid #bae6fd',
      borderRadius: '8px',
      marginBottom: '0.75rem',
      fontSize: '0.9rem',
      lineHeight: 1.5
    },
    checkIcon: {
      color: '#059669',
      fontSize: '1.1rem',
      marginTop: '0.1rem'
    },

    // Score Display
    scoreDisplay: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1.5rem',
      borderRadius: '12px',
      marginBottom: '1rem'
    },
    scoreNumber: {
      fontSize: '2.5rem',
      fontWeight: 'bold'
    },
    scoreLabel: {
      fontSize: '0.875rem',
      fontWeight: '500',
      opacity: 0.8
    },
    explanation: {
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      padding: '1rem',
      fontSize: '0.9rem',
      lineHeight: 1.6,
      color: '#495057'
    },

    // Loading
    loading: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      padding: '2rem',
      textAlign: 'center'
    },
    spinner: {
      width: '24px',
      height: '24px',
      border: '2px solid #f3f4f6',
      borderTop: '2px solid #ff4757',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },

    // Empty State
    emptyState: {
      textAlign: 'center',
      padding: '3rem 1rem',
      color: '#6b7280'
    },
    emptyIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
      opacity: 0.5
    },

    // Features Section
    features: {
      backgroundColor: '#f8f9fa',
      padding: '4rem 2rem',
      width: '100%'
    },
    featureGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      marginTop: '2rem'
    },
    featureCard: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '12px',
      textAlign: 'center',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
    },
    featureIcon: {
      fontSize: '2.5rem',
      marginBottom: '1rem'
    },
    featureTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: '#1a1a1a'
    },
    featureDescription: {
      color: '#666',
      fontSize: '0.95rem'
    }
  }

  const getScoreStyle = scoreValue => {
    const baseStyle = { ...styles.scoreDisplay }
    if (scoreValue >= 80) {
      return {
        ...baseStyle,
        backgroundColor: '#ecfdf5',
        color: '#059669',
        border: '1px solid #bbf7d0'
      }
    } else if (scoreValue >= 60) {
      return {
        ...baseStyle,
        backgroundColor: '#fffbeb',
        color: '#d97706',
        border: '1px solid #fed7aa'
      }
    } else {
      return {
        ...baseStyle,
        backgroundColor: '#fef2f2',
        color: '#dc2626',
        border: '1px solid #fecaca'
      }
    }
  }

  const scrollToApp = () => {
    document
      .getElementById('app-section')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          * {
            box-sizing: border-box;
          }
          
          html, body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            width: 100%;
            overflow-x: hidden;
          }
          
          #root {
            width: 100%;
            min-height: 100vh;
          }
          
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          
          .nav-link:hover {
            color: #1a1a1a;
          }
          
          .cta-button:hover {
            background-color: #ff3838;
            transform: translateY(-2px);
          }
          
          .primary-button:hover {
            background-color: #ff3838;
            transform: translateY(-2px);
          }
          
          .secondary-button:hover {
            background-color: #1a1a1a;
            color: white;
          }
          
          .upload-area:hover {
            border-color: #ff4757;
            background-color: #fff5f5;
          }
          
          .button:hover:not(.disabled) {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }
          
          .textarea:focus {
            border-color: #ff4757;
            outline: none;
          }
          
          /* Responsive Design */
          @media (max-width: 1024px) {
            .app-interface {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
            }
          }
          
          @media (max-width: 768px) {
            .nav {
              padding: 0.75rem 1rem !important;
            }
            
            .nav-links {
              gap: 1rem !important;
            }
            
            .hero {
              padding: 3rem 1rem !important;
            }
            
            .hero-buttons {
              flex-direction: column !important;
              align-items: center !important;
            }
            
            .button-group {
              grid-template-columns: 1fr !important;
            }
            
            .app-section {
              padding: 3rem 1rem !important;
            }
            
            .features {
              padding: 3rem 1rem !important;
            }
            
            .feature-grid {
              grid-template-columns: 1fr !important;
            }
          }
          
          @media (max-width: 480px) {
            .nav-links {
              flex-direction: column !important;
              gap: 0.5rem !important;
            }
            
            .app-card {
              padding: 1.5rem !important;
            }
            
            .hero-title {
              font-size: 2rem !important;
            }
          }
        `}
      </style>

      <div style={styles.body}>
        {/* Navigation */}
        <nav style={styles.nav} className='nav'>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>AI</div>
            <span>ResumeAI</span>
          </div>
          <div style={styles.navLinks} className='nav-links'>
            <a href='#features' style={styles.navLink} className='nav-link'>
              Features
            </a>
            <a href='#app-section' style={styles.navLink} className='nav-link'>
              Try Now
            </a>
            <a href='#contact' style={styles.navLink} className='nav-link'>
              Contact
            </a>
            <button
              style={styles.ctaButton}
              className='cta-button'
              onClick={scrollToApp}
            >
              Get Started
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section style={styles.hero} className='hero'>
          <div style={styles.heroContent}>
            <p style={styles.heroSubtitle}>AI-POWERED RECRUITMENT</p>
            <h1 style={styles.heroTitle} className='hero-title'>
              Smart Resume
              <br />
              Analysis & Matching
            </h1>
            <p style={styles.heroDescription}>
              Leverage advanced AI to parse, analyze, and score resumes against
              job descriptions. Make data-driven hiring decisions with
              explainable AI insights and detailed compatibility reports.
            </p>
            <div style={styles.heroButtons} className='hero-buttons'>
              <button
                style={styles.primaryButton}
                className='primary-button'
                onClick={scrollToApp}
              >
                Start Analysis
              </button>
              <button
                style={styles.secondaryButton}
                className='secondary-button'
              >
                View Demo
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id='features' style={styles.features} className='features'>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Powerful AI Features</h2>
            <p style={styles.sectionSubtitle}>
              Everything you need for intelligent resume screening
            </p>

            <div style={styles.featureGrid} className='feature-grid'>
              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>🔍</div>
                <h3 style={styles.featureTitle}>Smart Parsing</h3>
                <p style={styles.featureDescription}>
                  Extract and structure resume data from PDF, DOCX, and text
                  files with high accuracy
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>📊</div>
                <h3 style={styles.featureTitle}>AI Summarization</h3>
                <p style={styles.featureDescription}>
                  Generate concise, relevant summaries highlighting key
                  qualifications and experience
                </p>
              </div>

              <div style={styles.featureCard}>
                <div style={styles.featureIcon}>🎯</div>
                <h3 style={styles.featureTitle}>Job Matching</h3>
                <p style={styles.featureDescription}>
                  Score resume compatibility against job descriptions with
                  detailed explanations
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main App Section */}
        <section
          id='app-section'
          style={styles.appSection}
          className='app-section'
        >
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Try It Now</h2>
            <p style={styles.sectionSubtitle}>
              Upload a resume and see the AI in action
            </p>

            <div style={styles.appInterface} className='app-interface'>
              {/* Left Column - Controls */}
              <div>
                {/* Upload Card */}
                <div style={styles.appCard}>
                  <div style={styles.cardHeader}>
                    <span style={styles.cardIcon}>📤</span>
                    <h3 style={styles.cardTitle}>Upload Resume</h3>
                  </div>

                  <div>
                    <input
                      type='file'
                      onChange={e => setFile(e.target.files[0])}
                      style={{ display: 'none' }}
                      accept='.pdf,.docx,.txt'
                      id='file-upload'
                    />
                    <label
                      htmlFor='file-upload'
                      style={styles.uploadArea}
                      className='upload-area'
                    >
                      <div style={styles.uploadIcon}>📁</div>
                      <div style={styles.uploadText}>
                        {file ? file.name : 'Click to upload resume'}
                      </div>
                      <div style={styles.uploadSubtext}>
                        PDF, DOCX, or TXT files supported
                      </div>
                    </label>
                  </div>

                  {file && (
                    <div style={styles.fileIndicator}>
                      <span>📄</span>
                      <span
                        style={{
                          fontSize: '0.9rem',
                          fontWeight: '500',
                          color: '#0369a1'
                        }}
                      >
                        {file.name}
                      </span>
                    </div>
                  )}

                  <div style={styles.buttonGroup} className='button-group'>
                    <button
                      onClick={handleParse}
                      disabled={!file || loading}
                      style={{
                        ...styles.button,
                        ...styles.parseButton,
                        ...((!file || loading) && styles.disabledButton)
                      }}
                      className='button'
                    >
                      <span>📄</span> Parse
                    </button>
                    <button
                      onClick={handleSummarize}
                      disabled={!file || loading}
                      style={{
                        ...styles.button,
                        ...styles.summarizeButton,
                        ...((!file || loading) && styles.disabledButton)
                      }}
                      className='button'
                    >
                      <span>⚡</span> Summarize
                    </button>
                  </div>
                </div>

                {/* Job Description Card */}
                <div style={{ ...styles.appCard, marginTop: '2rem' }}>
                  <div style={styles.cardHeader}>
                    <span style={styles.cardIcon}>🎯</span>
                    <h3 style={styles.cardTitle}>Job Description</h3>
                  </div>

                  <textarea
                    placeholder='Paste the job description here to analyze resume compatibility...'
                    value={jobDesc}
                    onChange={e => setJobDesc(e.target.value)}
                    style={styles.textarea}
                    className='textarea'
                    rows='6'
                  />

                  <button
                    onClick={handleScore}
                    disabled={!file || !jobDesc || loading}
                    style={{
                      ...styles.button,
                      ...styles.scoreButton,
                      ...((!file || !jobDesc || loading) &&
                        styles.disabledButton)
                    }}
                    className='button'
                  >
                    <span>🎯</span> Analyze Match Score
                  </button>
                </div>
              </div>

              {/* Right Column - Results */}
              <div>
                {loading && (
                  <div style={styles.resultCard}>
                    <div style={styles.loading}>
                      <div style={styles.spinner}></div>
                      <p style={{ color: '#666', fontWeight: '500' }}>
                        Processing your resume...
                      </p>
                    </div>
                  </div>
                )}

                {preview && (
                  <div style={styles.resultCard}>
                    <div style={styles.resultHeader}>
                      <span>📄</span>
                      <h3 style={styles.resultTitle}>Resume Preview</h3>
                    </div>
                    <div style={styles.previewArea}>{preview.preview}</div>
                  </div>
                )}

                {summary && (
                  <div style={styles.resultCard}>
                    <div style={styles.resultHeader}>
                      <span>⚡</span>
                      <h3 style={styles.resultTitle}>AI Summary</h3>
                    </div>
                    <ul style={styles.summaryList}>
                      {summary.map((s, i) => (
                        <li key={i} style={styles.summaryItem}>
                          <span style={styles.checkIcon}>✓</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {score && (
                  <div style={styles.resultCard}>
                    <div style={styles.resultHeader}>
                      <span>🎯</span>
                      <h3 style={styles.resultTitle}>Match Analysis</h3>
                    </div>

                    <div style={getScoreStyle(score.score)}>
                      <span style={{ fontSize: '2rem' }}>
                        {score.score >= 80
                          ? '✅'
                          : score.score >= 60
                          ? '⚠️'
                          : '❌'}
                      </span>
                      <div>
                        <div style={styles.scoreNumber}>{score.score}%</div>
                        <div style={styles.scoreLabel}>Compatibility Score</div>
                      </div>
                    </div>

                    <div style={styles.explanation}>
                      <strong>Detailed Analysis:</strong>
                      <br />
                      {score.explanation}
                    </div>
                  </div>
                )}

                {!loading && !preview && !summary && !score && (
                  <div style={styles.resultCard}>
                    <div style={styles.emptyState}>
                      <div style={styles.emptyIcon}>🚀</div>
                      <h3
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: '600',
                          marginBottom: '0.5rem',
                          color: '#374151'
                        }}
                      >
                        Ready to Analyze
                      </h3>
                      <p style={{ fontSize: '0.95rem', margin: 0 }}>
                        Upload a resume and start the AI-powered analysis
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default App
