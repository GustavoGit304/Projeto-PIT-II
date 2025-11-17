import React from 'react';

interface AboutProps {
  onBackToShop: () => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const About: React.FC<AboutProps> = ({ onBackToShop, t }) => {
  const storyYear = new Date().getFullYear() - 3;

  return (
    <main className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-cover bg-center" style={{ backgroundImage: "url('https://i.imgur.com/GUPqUsS.jpeg')" }}>
        <div className="absolute inset-0 bg-purple-900/40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            {t('about.hero.title')}
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
            {t('about.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gray-800/60 rounded-xl shadow-lg p-8 md:p-12 border border-gray-700">
          <div className="space-y-10 text-gray-300 leading-relaxed">
            <div>
              <h2 className="text-3xl font-bold text-purple-400 mb-4">{t('about.story.title')}</h2>
              <p>
                {t('about.story.content', { year: storyYear.toString() })}
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-purple-400 mb-4">{t('about.mission.title')}</h2>
              <p>
                {t('about.mission.content')}
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-purple-400 mb-4">{t('about.values.title')}</h2>
              <ul className="list-disc list-inside space-y-2 pl-4 text-purple-400">
                <li><span className="text-gray-300" dangerouslySetInnerHTML={{ __html: t('about.values.quality') }}></span></li>
                <li><span className="text-gray-300" dangerouslySetInnerHTML={{ __html: t('about.values.passion') }}></span></li>
                <li><span className="text-gray-300" dangerouslySetInnerHTML={{ __html: t('about.values.happiness') }}></span></li>
                <li><span className="text-gray-300" dangerouslySetInnerHTML={{ __html: t('about.values.community') }}></span></li>
              </ul>
            </div>
            
            <div className="text-center pt-6">
              <button 
                onClick={onBackToShop} 
                className="bg-purple-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 text-lg"
              >
                {t('about.backToShop')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;