'use client';

import { _members, _brandsColor, _testimonials } from 'src/_mock';

import MarketingAbout from '../about/marketing-about';
import MarketingNewsletter from '../marketing-newsletter';
import MarketingTeamAbout from '../team/marketing-team-about';
import MarketingAboutStory from '../about/marketing-about-story';
import MarketingAboutOurClients from '../marketing-about-our-clients';
import MarketingTestimonial from '../testimonial/marketing-testimonial';
import MarketingAboutOurVision from '../about/marketing-about-our-vision';
import DashboardLandingFaqs from '../../_dashboard/landing/dashboard-landing-faqs';
import DashboardLandingFreeSEO from '../../_dashboard/landing/dashboard-landing-free-seo';
import MarketingAboutCoreValues from '../about/marketing-about-core-values';

// ----------------------------------------------------------------------

export default function MarketingAboutView() {
  return (
    <>
      <MarketingAbout />

      <MarketingAboutOurVision />

      <MarketingAboutCoreValues />

      <MarketingAboutStory />

      <MarketingTeamAbout members={_members} />

      <MarketingAboutOurClients brands={_brandsColor} />

      <MarketingTestimonial testimonials={_testimonials} />

      <DashboardLandingFaqs />

      <DashboardLandingFreeSEO />

      <MarketingNewsletter />
    </>
  );
}
