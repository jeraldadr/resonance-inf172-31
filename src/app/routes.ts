import { createBrowserRouter } from 'react-router';
import LandingPage from './components/LandingPage';
import OnboardingPage from './components/OnboardingPage';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './components/DashboardHome';
import InsightsPage from './components/InsightsPage';
import CommunityPage from './components/CommunityPage';
import ProfilePage from './components/ProfilePage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LandingPage,
  },
  {
    path: '/onboarding',
    Component: OnboardingPage,
  },
  {
    path: '/dashboard',
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardHome },
      { path: 'insights', Component: InsightsPage },
      { path: 'community', Component: CommunityPage },
      { path: 'profile', Component: ProfilePage },
    ],
  },
]);
