'use client';

import { useState, useEffect, useContext } from 'react';
import { getTranslation } from '~/utils/i18n';
import { LanguageContext } from '~/context/LanguageContext';
import { supabase } from '~/utils/supabase';

const dummyPosts_EN = [
  {
    id: 1,
    title: 'Construction Worker',
    location: 'New York, NY',
    description: 'General construction work, including digging, lifting, and mixing concrete.',
    company: 'Build-It-Right',
    postedAt: '2024-05-10T10:00:00Z',
    experience: 2,
    requiresApartment: true,
    area: 'Center',
  },
  {
    id: 2,
    title: 'Electrician',
    location: 'San Francisco, CA',
    description: 'Install and maintain electrical systems in new construction projects.',
    company: 'Sparky & Co.',
    postedAt: '2024-05-09T12:30:00Z',
    experience: 4,
    requiresApartment: false,
    area: 'North',
  },
  {
    id: 3,
    title: 'Plumber',
    location: 'Austin, TX',
    description: 'Install and repair pipes and fixtures for water, gas, and sewage.',
    company: 'Pipe Dreams',
    postedAt: '2024-05-08T15:00:00Z',
    experience: 3,
    requiresApartment: true,
    area: 'South',
  },
  {
    id: 4,
    title: 'Carpenter',
    location: 'Boston, MA',
    description: 'Cut, shape, and install building materials during the construction of buildings.',
    company: 'Woodchuckers',
    postedAt: '2024-05-07T11:00:00Z',
    experience: 5,
    requiresApartment: false,
    area: 'Center',
  },
  {
    id: 5,
    title: 'Crane Operator',
    location: 'Seattle, WA',
    description: 'Operate cranes to lift and move heavy materials on construction sites.',
    company: 'Up and Away',
    postedAt: '2024-05-06T14:00:00Z',
    experience: 3,
    requiresApartment: true,
    area: 'North',
  },
  {
    id: 6,
    title: 'Welder',
    location: 'Chicago, IL',
    description: 'Join metal parts together using heat and pressure.',
    company: 'Metalurgists',
    postedAt: '2024-05-05T16:00:00Z',
    experience: 2,
    requiresApartment: false,
    area: 'Center',
  },
  {
    id: 7,
    title: 'Painter',
    location: 'Los Angeles, CA',
    description: 'Apply paint, stain, and coatings to walls and other surfaces.',
    company: 'The Color Crew',
    postedAt: '2024-05-04T09:00:00Z',
    experience: 1,
    requiresApartment: true,
    area: 'South',
  },
  {
    id: 8,
    title: 'Roofer',
    location: 'Denver, CO',
    description: 'Install and repair roofs on buildings.',
    company: 'Top Tier Roofing',
    postedAt: '2024-05-03T13:00:00Z',
    experience: 6,
    requiresApartment: false,
    area: 'North',
  },
  {
    id: 9,
    title: 'Bricklayer',
    location: 'Miami, FL',
    description: 'Lay bricks, pre-cut stone, and other types of building blocks in mortar.',
    company: 'The Wall',
    postedAt: '2024-05-02T17:00:00Z',
    experience: 3,
    requiresApartment: true,
    area: 'South',
  },
  {
    id: 10,
    title: 'Heavy Equipment Operator',
    location: 'Dallas, TX',
    description: 'Operate heavy machinery like bulldozers, excavators, and loaders.',
    company: 'Big Movers',
    postedAt: '2024-05-01T10:00:00Z',
    experience: 5,
    requiresApartment: false,
    area: 'Center',
  },
  {
    id: 11,
    title: 'Surveyor',
    location: 'Atlanta, GA',
    description: 'Take measurements and collect data on land for construction projects.',
    company: 'Landmarkers',
    postedAt: '2024-04-30T11:00:00Z',
    experience: 4,
    requiresApartment: true,
    area: 'South',
  },
  {
    id: 12,
    title: 'Foreman',
    location: 'Phoenix, AZ',
    description: 'Supervise construction crews and ensure projects are completed on time.',
    company: 'Site Supervisors',
    postedAt: '2024-04-29T14:00:00Z',
    experience: 2,
    requiresApartment: false,
    area: 'North',
  },
  {
    id: 13,
    title: 'Glazier',
    location: 'Portland, OR',
    description: 'Install glass in windows, skylights, and other fixtures.',
    company: 'Crystal Clear',
    postedAt: '2024-04-28T16:00:00Z',
    experience: 3,
    requiresApartment: true,
    area: 'Center',
  },
  {
    id: 14,
    title: 'Ironworker',
    location: 'Washington, DC',
    description: 'Install iron or steel beams, girders, and columns to form building skeletons.',
    company: 'Steel Erectors',
    postedAt: '2024-04-27T09:00:00Z',
    experience: 5,
    requiresApartment: false,
    area: 'North',
  },
  {
    id: 15,
    title: 'Concrete Finisher',
    location: 'San Diego, CA',
    description: 'Smooth and finish freshly poured concrete.',
    company: 'Smooth Operators',
    postedAt: '2024-04-26T13:00:00Z',
    experience: 7,
    requiresApartment: true,
    area: 'South',
  },
];

const dummyPosts_HE = [
  {
    id: 1,
    title: 'פועל בניין',
    location: 'ניו יורק, ארה"ב',
    description: 'עבודות בנייה כלליות, כולל חפירה, הרמה וערבוב בטון.',
    company: 'Build-It-Right',
    postedAt: '2024-05-10T10:00:00Z',
    experience: 2,
    requiresApartment: true,
    area: 'Center',
  },
  {
    id: 2,
    title: 'חשמלאי',
    location: 'סן פרנסיסקו, ארה"ב',
    description: 'התקנה ותחזוקה של מערכות חשמל בפרויקטי בנייה חדשים.',
    company: 'Sparky & Co.',
    postedAt: '2024-05-09T12:30:00Z',
    experience: 4,
    requiresApartment: false,
    area: 'North',
  },
  {
    id: 3,
    title: 'אינסטלטור',
    location: 'אוסטין, ארה"ב',
    description: 'התקנה ותיקון צנרת ומערכות מים, גז וביוב.',
    company: 'Pipe Dreams',
    postedAt: '2024-05-08T15:00:00Z',
    experience: 3,
    requiresApartment: true,
    area: 'South',
  },
  {
    id: 4,
    title: 'נגר',
    location: 'בוסטון, ארה"ב',
    description: 'חיתוך, עיבוד והתקנת חומרי בנייה במהלך עבודות בנייה.',
    company: 'Woodchuckers',
    postedAt: '2024-05-07T11:00:00Z',
    experience: 5,
    requiresApartment: false,
    area: 'Center',
  },
  {
    id: 5,
    title: 'מפעיל עגורן',
    location: 'סיאטל, ארה"ב',
    description: 'הפעלת עגורנים להרמת והזזת חומרים כבדים באתרי בנייה.',
    company: 'Up and Away',
    postedAt: '2024-05-06T14:00:00Z',
    experience: 3,
    requiresApartment: true,
    area: 'North',
  },
  {
    id: 6,
    title: 'רתך',
    location: 'שיקגו, ארה"ב',
    description: 'חיבור חלקי מתכת באמצעות חום ולחץ.',
    company: 'Metalurgists',
    postedAt: '2024-05-05T16:00:00Z',
    experience: 2,
    requiresApartment: false,
    area: 'Center',
  },
  {
    id: 7,
    title: 'צבעי',
    location: 'לוס אנג\'לס, ארה"ב',
    description: 'צביעה וציפוי קירות ומשטחים אחרים.',
    company: 'The Color Crew',
    postedAt: '2024-05-04T09:00:00Z',
    experience: 1,
    requiresApartment: true,
    area: 'South',
  },
  {
    id: 8,
    title: 'קבלן גגות / מתקין גגות',
    location: 'דנבר, ארה"ב',
    description: 'התקנה ותיקון גגות למבנים.',
    company: 'Top Tier Roofing',
    postedAt: '2024-05-03T13:00:00Z',
    experience: 6,
    requiresApartment: false,
    area: 'North',
  },
  {
    id: 9,
    title: 'בנאי / סתת',
    location: 'מיאמי, ארה"ב',
    description: 'בניית קירות מלבנים, אבנים וחומרים דומים.',
    company: 'The Wall',
    postedAt: '2024-05-02T17:00:00Z',
    experience: 3,
    requiresApartment: true,
    area: 'South',
  },
  {
    id: 10,
    title: 'מפעיל ציוד כבד',
    location: 'דאלאס, ארה"ב',
    description: 'הפעלת ציוד כבד כגון דחפורים, מחפרים וטעונים.',
    company: 'Big Movers',
    postedAt: '2024-05-01T10:00:00Z',
    experience: 5,
    requiresApartment: false,
    area: 'Center',
  },
  {
    id: 11,
    title: 'מודד שטח',
    location: 'אטלנטה, ארה"ב',
    description: 'מדידת שטחים ואיסוף נתונים לשימוש בפרויקטי בנייה.',
    company: 'Landmarkers',
    postedAt: '2024-04-30T11:00:00Z',
    experience: 4,
    requiresApartment: true,
    area: 'South',
  },
  {
    id: 12,
    title: 'ראש צוות / מנהל עבודה',
    location: 'פניקס, ארה"ב',
    description: 'פיקוח על צוותי עבודה והקפדה על עמידה בלוחות זמנים.',
    company: 'Site Supervisors',
    postedAt: '2024-04-29T14:00:00Z',
    experience: 2,
    requiresApartment: false,
    area: 'North',
  },
  {
    id: 13,
    title: 'זגג',
    location: 'פורטלנד, ארה"ב',
    description: 'התקנת זכוכיות בחלונות, סקיילייטים ועוד.',
    company: 'Crystal Clear',
    postedAt: '2024-04-28T16:00:00Z',
    experience: 3,
    requiresApartment: true,
    area: 'Center',
  },
  {
    id: 14,
    title: 'עובד מתכת / מרכיב שלד פלדה',
    location: 'וושינגטון די.סי.',
    description: 'התקנת קורות ועמודי פלדה ושלד מבנה.',
    company: 'Steel Erectors',
    postedAt: '2024-04-27T09:00:00Z',
    experience: 5,
    requiresApartment: false,
    area: 'North',
  },
  {
    id: 15,
    title: 'מחליק בטון',
    location: 'סן דייגו, ארה"ב',
    description: 'החלקה וגימור של בטון טרי.',
    company: 'Smooth Operators',
    postedAt: '2024-04-26T13:00:00Z',
    experience: 7,
    requiresApartment: true,
    area: 'South',
  },
];


const PlatformPage = () => {
  const { language } = useContext(LanguageContext);
  const t = (key) => getTranslation(language, key);

  const [posts, setPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [location, setLocation] = useState('All');
  const [experience, setExperience] = useState('All');
  const [requiresApartment, setRequiresApartment] = useState('Default');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('posts_hr').select('*');

      if (error) {
        console.error('Error fetching posts:', error);
      } else if (data) {
        const formattedData = data.map((post) => ({
          ...post,
          postedAt: post.posted_at,
          requiresApartment: post.requires_apartment,
        }));
        setPosts(formattedData);
        setFilteredPosts(formattedData);
        if (formattedData.length > 0) {
          setSelectedPost(formattedData[0]);
        }
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    let newFilteredPosts = [...posts];

    if (location !== 'All') {
      newFilteredPosts = newFilteredPosts.filter((post) => post.area === location);
    }

    if (experience !== 'All') {
      switch (experience) {
        case '0-2':
          newFilteredPosts = newFilteredPosts.filter((post) => post.experience >= 0 && post.experience <= 2);
          break;
        case '2-5':
          newFilteredPosts = newFilteredPosts.filter((post) => post.experience >= 2 && post.experience <= 5);
          break;
        case '5+':
          newFilteredPosts = newFilteredPosts.filter((post) => post.experience >= 5);
          break;
        default:
          break;
      }
    }

    if (requiresApartment !== 'Default') {
      newFilteredPosts = newFilteredPosts.filter(
        (post) => post.requiresApartment === (requiresApartment === 'Yes')
      );
    }

    setFilteredPosts(newFilteredPosts);

    if (newFilteredPosts.length > 0) {
      const postToSelect = newFilteredPosts.find((p) => p.id === selectedPost?.id) || newFilteredPosts[0];
      if (postToSelect && (postToSelect.id !== selectedPost?.id || postToSelect.title !== selectedPost?.title)) {
        setSelectedPost(postToSelect);
      }
    } else {
      setSelectedPost(null);
    }
  }, [location, experience, requiresApartment, posts, selectedPost]);

  const handleResetFilters = () => {
    setLocation('All');
    setExperience('All');
    setRequiresApartment('Default');
  };

  const dir = language === 'he' ? 'rtl' : 'ltr';

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center" dir={dir}>
        {t('platform.loading')}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" dir={dir}>
      <div className="mb-8 p-4 rounded-lg bg-gray-200 dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-700">
        <div className="max-w-4xl">
          <div className="grid grid-cols-[1fr,1fr,1.5fr,auto] gap-4 items-end">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('platform.location')}
              </label>
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('platform.workExperience')}
              </label>
            </div>
            <div>
              <label htmlFor="requiresApartment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('platform.requiresApartment')}
              </label>
            </div>
            <div></div> {/* Empty label for the button */}
            <div>
              <select
                id="location"
                name="location"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="All">{t('platform.allOption')}</option>
                <option value="South">{t('platform.southOption')}</option>
                <option value="Center">{t('platform.centerOption')}</option>
                <option value="North">{t('platform.northOption')}</option>
              </select>
            </div>
            <div>
              <select
                id="experience"
                name="experience"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="All">{t('platform.allOption')}</option>
                <option value="0-2">0-2</option>
                <option value="2-5">2-5</option>
                <option value="5+">5+</option>
              </select>
            </div>
            <div>
              <select
                id="requiresApartment"
                name="requiresApartment"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                value={requiresApartment}
                onChange={(e) => setRequiresApartment(e.target.value)}
              >
                <option value="Default">{t('platform.defaultOption')}</option>
                <option value="Yes">{t('platform.yesOption')}</option>
                <option value="No">{t('platform.noOption')}</option>
              </select>
            </div>
            <div>
              <button
                onClick={handleResetFilters}
                className="rounded-md px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {t('platform.resetFilters')}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="space-y-4 h-96 overflow-y-auto rounded-lg border-2 border-gray-300 dark:border-slate-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
              <thead className="bg-gray-200 dark:bg-slate-700">
                <tr>
                  <th
                    scope="col"
                    className={`px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                  >
                    {t('platform.availablePosts')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-slate-800 dark:divide-slate-700">
                {filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 ${
                      selectedPost?.id === post.id ? 'bg-gray-200 dark:bg-slate-900' : ''
                    }`}
                  >
                    <td className={`px-6 py-4 whitespace-nowrap ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{post.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{post.company}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="md:col-span-2">
          {selectedPost && (
            <div className="p-4 border-2 border-gray-300 rounded-lg dark:border-slate-700">
              <h3 className="font-bold text-xl mb-2 dark:text-white">{selectedPost.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {selectedPost.company} - {selectedPost.location}
              </p>
              <p className="mb-4 dark:text-gray-400">{selectedPost.description}</p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>{t('platform.areaLabel')}: {t(`platform.${selectedPost.area.toLowerCase()}Option`)}</p>
                <p>{t('platform.experienceLabel')}: {selectedPost.experience} {t('platform.yearsLabel')}</p>
                <p>{t('platform.requiresApartment')}: {selectedPost.requiresApartment ? t('platform.yesOption') : t('platform.noOption')}</p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">{t('platform.postedOnLabel')}: {new Date(selectedPost.postedAt).toLocaleDateString('en-GB')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlatformPage;
