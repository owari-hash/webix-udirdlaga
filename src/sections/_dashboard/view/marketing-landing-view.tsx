'use client';

import {
  _brands,
  _members,
  _caseStudies,
  _testimonials,
  _marketingPosts,
  _pricingMarketing,
} from 'src/_mock';

import DashboardTeam from '../team/dashboard-team';
import DashboardNewsletter from '../dashboard-newsletter';
import DashboardOurClients from '../dashboard-our-clients';
import DashboardLandingHero from '../landing/dashboard-landing-hero';
import DashboardLandingFaqs from '../landing/dashboard-landing-faqs';
import DashboardLandingAbout from '../landing/dashboard-landing-about';
import DashboardTestimonial from '../testimonial/dashboard-testimonial';
import PricingDashboard from '../../pricing/dashboard/pricing-dashboard';
import DashboardLandingProcess from '../landing/dashboard-landing-process';
import DashboardLandingFreeSEO from '../landing/dashboard-landing-free-seo';
import DashboardLandingServices from '../landing/dashboard-landing-services';
import BlogDashboardLatestPosts from '../../blog/dashboard/dashboard-latest-posts';
import DashboardLandingCaseStudies from '../landing/dashboard-landing-case-studies';

// ----------------------------------------------------------------------

export default function DashboardLandingView() {
  return (
    <>
      <DashboardLandingHero />

      <DashboardOurClients brands={_brands} />

      <DashboardLandingAbout />

      <DashboardLandingServices />

      <DashboardLandingProcess />

      <DashboardLandingCaseStudies caseStudies={_caseStudies.slice(-6)} />

      <DashboardTeam members={_members} />

      <PricingDashboard plans={_pricingMarketing} />

      <DashboardLandingFaqs />

      <DashboardTestimonial testimonials={_testimonials} />

      <BlogDashboardLatestPosts posts={_marketingPosts.slice(0, 4)} />

      <DashboardLandingFreeSEO />

      <DashboardNewsletter />
    </>
  );
}
