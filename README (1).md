# Enhanced MDRRMO Admin Dashboard

## Overview

A comprehensive admin dashboard for the Municipal Disaster Risk Reduction and Management Office (MDRRMO) of Pio Duran, Albay. This enhanced system provides powerful tools for managing emergency response, community engagement, and administrative operations.

## 🚀 Features

### Enhanced Admin Dashboard
- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Collapsible Sidebar**: Intuitive navigation with nested menu items
- **Real-time Updates**: Live data synchronization with Supabase
- **Advanced Data Tables**: Sortable, filterable, and searchable tables
- **Bulk Operations**: Multi-select actions for efficient management
- **Form Builder**: Dynamic form generation with validation
- **Audit Logging**: Complete audit trail for all admin actions

### Management Modules
- **Incident Map**: Location-based incident tracking with coordinates
- **Response Tracking**: Emergency response task management
- **Public Feedback**: Citizen feedback and sentiment analysis
- **Feedback Analytics**: Visual analytics with charts and graphs
- **Survey Responses**: Survey management with export capabilities
- **News & Updates**: Content management system
- **Activities**: Event and training management
- **Gallery**: Image and media management
- **Videos**: Video content management
- **Resources**: Document and file management
- **Maps**: Disaster and evacuation map management
- **Hotline Numbers**: Emergency contact management

### Technical Features
- **TypeScript**: Full type safety and better developer experience
- **Supabase Integration**: Real-time database with RLS policies
- **Authentication**: Secure admin authentication flow
- **Performance Optimized**: Code splitting and lazy loading
- **Mobile Responsive**: Mobile-first responsive design
- **Accessibility**: WCAG 2.1 AA compliance
- **Error Handling**: Comprehensive error boundaries and validation

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI, Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: React Query, React Hook Form
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd mdrrmo-admin-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Environment Setup**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Update the following environment variables:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   \`\`\`

4. **Database Setup**
   \`\`\`bash
   # Run database migrations
   npm run db:migrate
   
   # Seed initial data
   npm run db:seed
   \`\`\`

5. **Start Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

## 🗄️ Database Schema

### Core Tables
- `profiles` - User profiles and admin accounts
- `incident_reports` - Emergency incident tracking
- `contact_messages` - Public inquiries and messages
- `volunteer_applications` - Community volunteer applications

### Content Management
- `announcements` - Public announcements and alerts
- `news_articles` - News and updates
- `events_activities` - Events and training activities
- `gallery_images` - Image gallery management
- `videos` - Video content management
- `public_documents` - Document and resource management

### System Tables
- `admin_audit_logs` - Complete audit trail
- `system_settings` - Configurable system settings
- `notification_preferences` - User notification settings
- `hotline_numbers` - Emergency contact management
- `maps` - Disaster and evacuation maps
- `weather_updates` - Weather monitoring data

## 🔐 Security Features

### Row Level Security (RLS)
- Admin-only access to sensitive data
- User-specific data isolation
- Public read access for appropriate content

### Audit Trail
- Complete logging of all admin actions
- IP address and user agent tracking
- Before/after value tracking for updates

### Authentication
- Supabase Auth integration
- Email domain validation for admin access
- Session management and timeout

## 📱 API Endpoints

### Public APIs
- `GET /api/incidents` - Public incident reports
- `POST /api/contact-message` - Submit contact messages
- `POST /api/volunteer-application` - Submit volunteer applications
- `POST /api/incident-report` - Submit incident reports

### Admin APIs
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/audit-logs` - Audit trail data
- `POST /api/admin/export` - Data export functionality

## 🚀 Deployment

### Vercel Deployment
1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
\`\`\`bash
npm run build
npm run start
\`\`\`

## 📊 Performance Optimizations

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js Image component with Cloudinary
- **Database Indexing**: Optimized database queries with proper indexes
- **Caching**: Supabase query caching and real-time subscriptions
- **Bundle Analysis**: Webpack bundle analyzer for optimization

## 🧪 Testing

\`\`\`bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e
\`\`\`

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For technical support or questions:
- Email: admin@mdrrmo.gov.ph
- Phone: (052) 234-5678
- Emergency: 911

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**MDRRMO Pio Duran** - Building Resilient Communities Through Technology

*Enhancing disaster preparedness, strengthening community resilience, and ensuring safety for all.*


Your project is live at:

**[https://vercel.com/pertezthos-projects/v0-mdrrmowebapp9212](https://vercel.com/pertezthos-projects/v0-mdrrmowebapp9212)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/widdNhm6QsU](https://v0.app/chat/projects/widdNhm6QsU)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
