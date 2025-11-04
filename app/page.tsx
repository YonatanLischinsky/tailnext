'use client';
import type { Metadata } from 'next';

import { SITE } from '~/config.js';

import Hero from '~/components/widgets/Hero';
import SocialProof from '~/components/widgets/SocialProof';
import Features from '~/components/widgets/Features';
import Content from '~/components/widgets/Content';
import Steps from '~/components/widgets/Steps';
import Testimonials from '~/components/widgets/Testimonials';
import FAQs2 from '~/components/widgets/FAQs2';
import Pricing from '~/components/widgets/Pricing';
import Team from '~/components/widgets/Team';
import CallToAction2 from '~/components/widgets/CallToAction2';
import Contact from '~/components/widgets/Contact';
import {
  callToAction2Home,
  contactHome,
  contentHomeOne,
  contentHomeTwo,
  faqs2Home,
  featuresHome,
  heroHome,
  pricingHome,
  socialProofHome,
  stepsHome,
  teamHome,
  testimonialsHome,
} from '~/shared/data/pages/home.data';
import { useContext } from 'react';
import { LanguageContext } from '~/context/LanguageContext';
import { getTranslation } from '~/utils/i18n';
import { HeroProps, StepsProps, FAQsProps } from '~/shared/types';
import { IconArrowDown } from '@tabler/icons-react';

// export const metadata: Metadata = {
//   title: SITE.title,
// };

export default function Page() {
  const { language } = useContext(LanguageContext);
  const t = (key: string) => getTranslation(language, key);

  const heroHomeWithTranslation: HeroProps = {
    ...heroHome,
    title: t('home.hero.title'),
    subtitle: t('home.hero.subtitle'),
    callToAction: {
      ...heroHome.callToAction,
      text: t('hero.registerNow'),
    },
  };

  const stepsHomeWithTranslation: StepsProps = {
    ...stepsHome,
    isReversed: language === 'he' ? true : false,
    header: {
      title: t('home.steps.title'),
    },
    items: [
      {
        ...stepsHome.items[0],
        title: t('home.steps.items.0.title'),
        description: t('home.steps.items.0.description'),
      },
      {
        ...stepsHome.items[1],
        title: t('home.steps.items.1.title'),
        description: t('home.steps.items.1.description'),
      },
      {
        ...stepsHome.items[2],
        title: t('home.steps.items.2.title'),
        description: t('home.steps.items.2.description'),
      },
      {
        ...stepsHome.items[3],
        title: t('home.steps.items.3.title'),
      },
    ],
  };

  const faqs2HomeWithTranslation: FAQsProps = {
    ...faqs2Home,
    header: {
      ...faqs2Home.header,
      title: t('home.faqs.title'),
      subtitle: "",
    },
    items: [
      {
        title: t('home.faqs.items.0.title'),
        description: t('home.faqs.items.0.description'),
      },
      {
        title: t('home.faqs.items.1.title'),
        description: t('home.faqs.items.1.description'),
      },
      {
        title: t('home.faqs.items.2.title'),
        description: t('home.faqs.items.2.description'),
      },
    ],
  };

  return (
    <>
      <Hero {...heroHomeWithTranslation} />
      {/* <SocialProof {...socialProofHome} /> */}
      {/* <Features {...featuresHome} /> */}
      {/* <Content {...contentHomeOne} /> */}
      {/* <Content {...contentHomeTwo} /> */}
      <Steps {...stepsHomeWithTranslation} />
      {/* <Testimonials {...testimonialsHome} /> */}
      {/* <Pricing {...pricingHome} /> */}
      <FAQs2 {...faqs2HomeWithTranslation} />
      {/* <Team {...teamHome} /> */}
      {/* <Contact {...contactHome} /> */}
      {/* <CallToAction2 {...callToAction2Home} /> */}
    </>
  );
}