'use client';

import {
  _brands,
  _members,
  _caseStudies,
  _testimonials,
  _marketingPosts,
  _pricingMarketing,
} from 'src/_mock';

import MarketingTeam from '../team/marketing-team';
import MarketingNewsletter from '../marketing-newsletter';
import MarketingOurClients from '../marketing-our-clients';
import PricingDashboard from '../../pricing/dashboard/pricing-dashboard';
import BlogDashboardLatestPosts from '../../blog/dashboard/dashboard-latest-posts';
import DashboardLandingFaqs from '../../_dashboard/landing/dashboard-landing-faqs';
import DashboardLandingHero from '../../_dashboard/landing/dashboard-landing-hero';
import DashboardLandingAbout from '../../_dashboard/landing/dashboard-landing-about';
import DashboardTestimonial from '../../_dashboard/testimonial/dashboard-testimonial';
import DashboardLandingProcess from '../../_dashboard/landing/dashboard-landing-process';
import DashboardLandingFreeSEO from '../../_dashboard/landing/dashboard-landing-free-seo';
import DashboardLandingServices from '../../_dashboard/landing/dashboard-landing-services';
import DashboardLandingCaseStudies from '../../_dashboard/landing/dashboard-landing-case-studies';

// ----------------------------------------------------------------------

export default function MarketingLandingView() {
  return (
    <>
      <DashboardLandingHero />

      <MarketingOurClients brands={_brands} />

      <DashboardLandingAbout />

      <DashboardLandingServices />

      <DashboardLandingProcess />

      <DashboardLandingCaseStudies caseStudies={_caseStudies.slice(-6)} />

      <MarketingTeam members={_members} />

      <PricingDashboard plans={_pricingMarketing} />

      <DashboardLandingFaqs />

      <DashboardTestimonial testimonials={_testimonials} />

      <BlogDashboardLatestPosts posts={_marketingPosts.slice(0, 4)} />

      <DashboardLandingFreeSEO />

      <MarketingNewsletter />
    </>
  );
}
