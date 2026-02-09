# Design Document - Portfolio Admin Dashboard

## Overview

The Portfolio Admin Dashboard is a full-stack web application that provides content management and analytics capabilities for the portfolio website. The system consists of three main layers: a React-based admin interface, a Node.js/Express backend API, and a database layer for persistent storage. The architecture follows a RESTful API pattern with real-time capabilities via WebSocket connections for live analytics updates.

The dashboard will be built as a separate application from the main portfolio, accessible via a `/admin` route with authentication protection. It will integrate with the existing Next.js portfolio to enable dynamic content updates without code deployments.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Admin Dashboard (React)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Auth Module  │  │ CMS Module   │  │Analytics UI  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ↓ (REST API + WebSocket)
┌─────────────────────────────────────────────────────────────┐
│                   Backend API (Node.js/Express)              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │Auth Service  │  │Content API   │  │Analytics API │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │Tracking SDK  │  │WebSocket Srv │                        │
│  └──────────────┘  └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Database Layer (MongoDB)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Users      │  │   Content    │  │  Analytics   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↑
                            │
┌─────────────────────────────────────────────────────────────┐
│              Portfolio Website (Next.js)                     │
│         (Tracking Script + Content API Consumer)             │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend (Admin Dashboard):**
- React 18 with hooks
- Material-UI (MUI) for dashboard components
- Recharts for analytics visualizations
- React Router for navigation
- Socket.io-client for real-time updates
- React Query for data fetching and caching
- React Hook Form for form management

**Backend:**
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Socket.io for WebSocket connections
- bcrypt for password hashing
- express-validator for input validation
- geoip-lite for IP geolocation
- ua-parser-js for user agent parsing

**Integration:**
- Next.js API routes for content delivery
- Client-side tracking script (lightweight JavaScript)
- REST API for content CRUD operations

## Components and Interfaces

### 1. Authentication Module

**Components:**
- `LoginPage` - Login form with email/password
- `AuthProvider` - React context for auth state
- `ProtectedRoute` - Route wrapper requiring authentication
- `PasswordResetForm` - Password reset request form

**API Endpoints:**
```
POST /api/auth/login
  Body: { email, password }
  Response: { token, user: { id, email, name } }

POST /api/auth/logout
  Headers: { Authorization: Bearer <token> }
  Response: { success: true }

POST /api/auth/refresh
  Body: { refreshToken }
  Response: { token }

POST /api/auth/reset-password
  Body: { email }
  Response: { success: true, message }

POST /api/auth/reset-password/:token
  Body: { password }
  Response: { success: true }
```

### 2. Content Management System (CMS)

**Components:**
- `ContentEditor` - Rich text editor for section content
- `LinkManager` - CRUD interface for links
- `SectionSelector` - Navigation between portfolio sections
- `PreviewPane` - Live preview of changes

**Data Structure:**
```javascript
// Content Document
{
  _id: ObjectId,
  section: String, // 'home', 'about', 'experience', 'projects'
  content: {
    title: String,
    subtitle: String,
    body: String, // Rich text HTML
    metadata: Object // Section-specific data
  },
  updatedAt: Date,
  updatedBy: ObjectId
}

// Link Document
{
  _id: ObjectId,
  category: String, // 'social', 'project', 'contact'
  label: String,
  url: String,
  icon: String, // Icon identifier
  order: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

**API Endpoints:**
```
GET /api/content/:section
  Response: { content: ContentDocument }

PUT /api/content/:section
  Body: { content: { title, subtitle, body, metadata } }
  Response: { success: true, content: ContentDocument }

GET /api/links
  Query: { category? }
  Response: { links: [LinkDocument] }

POST /api/links
  Body: { category, label, url, icon, order }
  Response: { success: true, link: LinkDocument }

PUT /api/links/:id
  Body: { label?, url?, icon?, order?, isActive? }
  Response: { success: true, link: LinkDocument }

DELETE /api/links/:id
  Response: { success: true }
```

### 3. Analytics Engine

**Components:**
- `AnalyticsDashboard` - Main analytics overview
- `VisitorChart` - Time-series visitor graph
- `GeographicMap` - World map with visitor locations
- `DeviceBreakdown` - Pie chart of device types
- `PageAnalytics` - Table of page views and engagement
- `RealTimeMonitor` - Live active visitors display
- `VisitorTable` - Detailed visitor log with filters

**Data Structure:**
```javascript
// Visit Document
{
  _id: ObjectId,
  sessionId: String, // Unique session identifier
  timestamp: Date,
  ip: String, // Hashed for privacy
  location: {
    country: String,
    city: String,
    coordinates: [Number, Number] // [lat, lng]
  },
  device: {
    type: String, // 'mobile', 'tablet', 'desktop'
    os: String,
    browser: String,
    browserVersion: String
  },
  referrer: {
    source: String, // 'direct', 'search', 'social', 'other'
    url: String,
    searchEngine: String // If from search
  },
  pages: [{
    section: String,
    enteredAt: Date,
    exitedAt: Date,
    duration: Number // seconds
  }],
  sessionDuration: Number, // Total seconds
  isActive: Boolean,
  lastActivity: Date
}

// Analytics Summary (Aggregated)
{
  _id: ObjectId,
  date: Date, // Daily aggregation
  totalVisits: Number,
  uniqueVisitors: Number,
  pageViews: {
    home: Number,
    about: Number,
    experience: Number,
    projects: Number
  },
  avgSessionDuration: Number,
  deviceBreakdown: {
    mobile: Number,
    tablet: Number,
    desktop: Number
  },
  topReferrers: [{
    source: String,
    count: Number
  }],
  topLocations: [{
    country: String,
    city: String,
    count: Number
  }]
}
```

**API Endpoints:**
```
GET /api/analytics/summary
  Query: { startDate?, endDate? }
  Response: { 
    totalVisits, 
    uniqueVisitors, 
    avgSessionDuration,
    pageViews: {},
    deviceBreakdown: {},
    topReferrers: [],
    topLocations: []
  }

GET /api/analytics/visits
  Query: { startDate?, endDate?, page?, limit?, country?, device? }
  Response: { 
    visits: [VisitDocument],
    pagination: { total, page, pages }
  }

GET /api/analytics/realtime
  Response: { 
    activeVisitors: Number,
    currentPages: [{ section, count }],
    recentVisits: [VisitDocument]
  }

GET /api/analytics/export
  Query: { startDate?, endDate?, format: 'csv'|'json'|'pdf' }
  Response: File download

POST /api/analytics/track
  Body: { 
    sessionId, 
    event: 'pageview'|'session_start'|'session_end',
    data: {}
  }
  Response: { success: true }
```

### 4. Tracking SDK (Client-Side)

**Lightweight JavaScript snippet embedded in portfolio:**

```javascript
// tracking.js - Embedded in portfolio website
(function() {
  const ANALYTICS_ENDPOINT = '/api/analytics/track';
  let sessionId = getOrCreateSessionId();
  let currentPage = null;
  let pageStartTime = null;
  
  // Track page views
  function trackPageView(section) {
    if (currentPage) {
      trackPageExit(currentPage);
    }
    currentPage = section;
    pageStartTime = Date.now();
    
    sendEvent('pageview', {
      section,
      timestamp: new Date().toISOString()
    });
  }
  
  // Track session start
  function trackSessionStart() {
    sendEvent('session_start', {
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      screenResolution: `${screen.width}x${screen.height}`,
      timestamp: new Date().toISOString()
    });
  }
  
  // Send tracking event
  function sendEvent(event, data) {
    fetch(ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        event,
        data
      })
    }).catch(err => console.error('Tracking error:', err));
  }
  
  // Initialize tracking
  trackSessionStart();
  
  // Track page visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && currentPage) {
      trackPageExit(currentPage);
    }
  });
  
  // Expose global tracking function
  window.trackPortfolioEvent = trackPageView;
})();
```

### 5. Real-Time Updates (WebSocket)

**Socket.io Events:**

```javascript
// Server emits
socket.emit('visitor:new', { visit: VisitDocument });
socket.emit('visitor:active', { count: Number, pages: [] });
socket.emit('visitor:left', { sessionId: String });
socket.emit('analytics:update', { summary: AnalyticsSummary });

// Client listens
socket.on('visitor:new', handleNewVisitor);
socket.on('visitor:active', updateActiveCount);
socket.on('visitor:left', handleVisitorLeft);
socket.on('analytics:update', refreshDashboard);
```

## Data Models

### User Model (Admin Authentication)

```javascript
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'viewer'],
    default: 'admin'
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  lastLogin: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Methods
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { id: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};
```

### Content Model

```javascript
const ContentSchema = new Schema({
  section: {
    type: String,
    required: true,
    enum: ['home', 'about', 'experience', 'projects'],
    unique: true
  },
  content: {
    title: String,
    subtitle: String,
    body: String, // HTML content
    metadata: Schema.Types.Mixed // Flexible for section-specific data
  },
  version: {
    type: Number,
    default: 1
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to increment version on update
ContentSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    this.version += 1;
    this.updatedAt = Date.now();
  }
  next();
});
```

### Link Model

```javascript
const LinkSchema = new Schema({
  category: {
    type: String,
    required: true,
    enum: ['social', 'project', 'contact']
  },
  label: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Invalid URL format'
    }
  },
  icon: String,
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

LinkSchema.index({ category: 1, order: 1 });
```

### Visit Model

```javascript
const VisitSchema = new Schema({
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  ipHash: String, // Hashed IP for privacy compliance
  location: {
    country: String,
    city: String,
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere'
    }
  },
  device: {
    type: {
      type: String,
      enum: ['mobile', 'tablet', 'desktop', 'unknown']
    },
    os: String,
    browser: String,
    browserVersion: String
  },
  referrer: {
    source: {
      type: String,
      enum: ['direct', 'search', 'social', 'other']
    },
    url: String,
    searchEngine: String
  },
  pages: [{
    section: String,
    enteredAt: Date,
    exitedAt: Date,
    duration: Number
  }],
  sessionDuration: Number,
  isActive: {
    type: Boolean,
    default: true
  },
  lastActivity: {
    type: Date,
    default: Date.now
  }
});

// Indexes for efficient queries
VisitSchema.index({ timestamp: -1 });
VisitSchema.index({ 'location.country': 1 });
VisitSchema.index({ 'device.type': 1 });
VisitSchema.index({ isActive: 1, lastActivity: -1 });

// Method to mark session as inactive
VisitSchema.methods.endSession = function() {
  this.isActive = false;
  this.sessionDuration = (Date.now() - this.timestamp) / 1000;
  return this.save();
};
```

### Analytics Summary Model (Pre-aggregated)

```javascript
const AnalyticsSummarySchema = new Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
    index: true
  },
  totalVisits: {
    type: Number,
    default: 0
  },
  uniqueVisitors: {
    type: Number,
    default: 0
  },
  pageViews: {
    home: { type: Number, default: 0 },
    about: { type: Number, default: 0 },
    experience: { type: Number, default: 0 },
    projects: { type: Number, default: 0 }
  },
  avgSessionDuration: Number,
  deviceBreakdown: {
    mobile: { type: Number, default: 0 },
    tablet: { type: Number, default: 0 },
    desktop: { type: Number, default: 0 }
  },
  topReferrers: [{
    source: String,
    count: Number
  }],
  topLocations: [{
    country: String,
    city: String,
    count: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Daily aggregation job updates this collection
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Authentication token validity

*For any* authentication request with valid credentials, the generated JWT token should be verifiable and contain the correct user ID and email, and the token should expire after exactly 24 hours.

**Validates: Requirements 1.2, 1.3**

### Property 2: Content update propagation

*For any* content update saved through the CMS, querying the content API within 5 seconds should return the updated content, ensuring changes are immediately visible.

**Validates: Requirements 2.3**

### Property 3: URL validation consistency

*For any* link URL submitted to the system, if it passes validation, it must start with "http://" or "https://", and if it fails validation, it must not be persisted to the database.

**Validates: Requirements 3.2, 3.5**

### Property 4: Unique visitor session counting

*For any* set of visits from the same IP address within a 30-minute window, the system should count them as a single unique visitor session, not multiple sessions.

**Validates: Requirements 4.5**

### Property 5: Timestamp accuracy

*For any* recorded visit, the timestamp should be within 1 second of the actual time the tracking event was received by the server.

**Validates: Requirements 5.1**

### Property 6: Geographic data consistency

*For any* visitor with a valid IP address, if geolocation succeeds, the location must contain both country and city fields, and if geolocation fails, the location should be recorded as "Unknown".

**Validates: Requirements 6.1, 6.4**

### Property 7: Session duration calculation

*For any* completed visitor session, the calculated session duration should equal the difference between the last activity timestamp and the first page entry timestamp, measured in seconds.

**Validates: Requirements 7.4**

### Property 8: Device detection completeness

*For any* visitor, the device type must be one of: 'mobile', 'tablet', 'desktop', or 'unknown', and the browser field must be populated with either a detected browser name or 'Unknown'.

**Validates: Requirements 8.1, 8.2, 8.5**

### Property 9: Referrer categorization

*For any* visit with a referrer URL, if the referrer contains 'google', 'bing', or 'yahoo', it should be categorized as 'search' with the appropriate search engine name, otherwise it should be categorized as 'other' or 'social' based on domain matching.

**Validates: Requirements 9.1, 9.2, 9.5**

### Property 10: Export data completeness

*For any* analytics export request with a date range, the exported file should contain all visits within that range (inclusive), and the number of records in the export should match the count returned by a database query for the same date range.

**Validates: Requirements 10.2, 10.3**

### Property 11: Real-time active visitor accuracy

*For any* visitor marked as active, their last activity timestamp should be within 30 seconds of the current time, and any visitor with last activity older than 30 seconds should not be counted in the active visitors total.

**Validates: Requirements 11.2, 11.3**

### Property 12: Responsive layout breakpoint

*For any* viewport width less than 768 pixels, the dashboard UI should apply mobile-specific CSS classes and render the mobile layout, and for any viewport width 768 pixels or greater, it should render the desktop layout.

**Validates: Requirements 12.2**

## Error Handling

### Authentication Errors

- **Invalid Credentials**: Return 401 with message "Invalid email or password"
- **Expired Token**: Return 401 with message "Token expired, please login again"
- **Missing Token**: Return 401 with message "Authentication required"
- **Invalid Token Format**: Return 400 with message "Invalid token format"

### Content Management Errors

- **Section Not Found**: Return 404 with message "Content section not found"
- **Validation Error**: Return 400 with detailed field errors
- **Database Error**: Return 500 with message "Failed to save content, please try again"
- **Unauthorized Update**: Return 403 with message "Insufficient permissions"

### Analytics Errors

- **Invalid Date Range**: Return 400 with message "Invalid date range specified"
- **Export Generation Failed**: Return 500 with message "Failed to generate export file"
- **Tracking Error**: Log error server-side, return 200 to client (fail silently)
- **Database Query Timeout**: Return 504 with message "Request timeout, please try again"

### General Error Handling Strategy

1. **Client-Side**: Display user-friendly error messages in toast notifications
2. **Server-Side**: Log detailed errors with stack traces for debugging
3. **Network Errors**: Implement retry logic with exponential backoff
4. **Validation Errors**: Return specific field-level error messages
5. **Rate Limiting**: Return 429 with "Too many requests" when limits exceeded

## Testing Strategy

### Unit Testing

**Authentication Service:**
- Test password hashing and comparison
- Test JWT token generation and verification
- Test token expiration logic
- Test password reset token generation

**Content API:**
- Test content CRUD operations
- Test URL validation for links
- Test content update propagation
- Test authorization checks

**Analytics Engine:**
- Test visitor session creation
- Test unique visitor counting logic
- Test session duration calculations
- Test device/browser detection
- Test referrer categorization
- Test geographic data extraction

**Data Models:**
- Test schema validation
- Test model methods
- Test indexes and queries
- Test data relationships

### Property-Based Testing

Property-based tests will be implemented using **fast-check** for JavaScript. Each test should run a minimum of 100 iterations to ensure comprehensive coverage across random inputs.

**Authentication Properties:**
- Property 1: Token validity and expiration

**Content Management Properties:**
- Property 2: Content update propagation
- Property 3: URL validation consistency

**Analytics Properties:**
- Property 4: Unique visitor session counting
- Property 5: Timestamp accuracy
- Property 6: Geographic data consistency
- Property 7: Session duration calculation
- Property 8: Device detection completeness
- Property 9: Referrer categorization
- Property 10: Export data completeness
- Property 11: Real-time active visitor accuracy

**UI Properties:**
- Property 12: Responsive layout breakpoint

### Integration Testing

- Test complete authentication flow (login → access protected route → logout)
- Test content update flow (edit → save → verify on live site)
- Test analytics tracking flow (visit → track → display in dashboard)
- Test real-time updates (new visit → WebSocket event → UI update)
- Test export functionality (request → generate → download)

### End-to-End Testing

Use Playwright or Cypress for E2E tests:
- Complete admin workflow: login → edit content → save → verify
- Analytics dashboard: view summary → filter by date → export data
- Real-time monitoring: simulate visits → verify active count updates
- Mobile responsiveness: test on various viewport sizes

### Performance Testing

- Load test: Simulate 1000 concurrent visitors tracking events
- Dashboard load time: Should load within 2 seconds
- Real-time updates: WebSocket latency should be < 100ms
- Database queries: Analytics queries should complete within 500ms
- Export generation: Should handle exports of 10,000+ records

## Security Considerations

### Authentication Security

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens with 24-hour expiration
- HTTP-only cookies for token storage (optional)
- Rate limiting on login attempts (5 attempts per 15 minutes)
- Password reset tokens expire after 1 hour

### Data Privacy

- IP addresses hashed before storage (SHA-256)
- No personally identifiable information (PII) collected
- GDPR compliance: Provide data deletion endpoint
- Analytics data retention policy (e.g., 90 days)

### API Security

- CORS configuration to allow only portfolio domain
- Input validation and sanitization on all endpoints
- SQL injection prevention via Mongoose ODM
- XSS prevention via content sanitization
- Rate limiting on all API endpoints

### Infrastructure Security

- HTTPS required for all connections
- Environment variables for sensitive configuration
- Database connection string encryption
- Regular security audits and dependency updates

## Deployment Architecture

### Development Environment

- Local MongoDB instance
- Node.js server on localhost:5000
- React dev server on localhost:3000
- Hot reloading enabled

### Production Environment

**Backend:**
- Deploy to Vercel/Railway/Render
- MongoDB Atlas for database
- Environment variables for configuration
- Automatic SSL certificates

**Frontend:**
- Deploy admin dashboard to Vercel
- Separate subdomain: admin.portfolio.com
- CDN for static assets
- Gzip compression enabled

**Monitoring:**
- Error tracking with Sentry
- Performance monitoring with New Relic
- Uptime monitoring with UptimeRobot
- Log aggregation with LogRocket

## Future Enhancements

- A/B testing capabilities for content variations
- Email notifications for traffic milestones
- Custom dashboard widgets and layouts
- Multi-user support with role-based permissions
- API rate limiting per user
- Advanced analytics: funnel analysis, cohort analysis
- Integration with Google Analytics for comparison
- Automated content backup and versioning
- Dark mode for dashboard UI
- Mobile app for analytics monitoring
