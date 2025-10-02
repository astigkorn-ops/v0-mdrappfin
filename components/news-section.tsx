import Image from "next/image"

export default function NewsSection() {
  const newsItems = [
    {
  id: 1,
  title: "Pio Duran Prepacking Food Packs for #OpongPH Relief",
  excerpt: "The LGU of Pio Duran has begun unloading food packs for relief operations in preparation for the expected landfall of Severe Tropical Storm #OpongPH.",
  date: "2025-09-25",
  category: "Disaster Preparedness",
  image: "https://hqgprclcbzdkifryjbbv.supabase.co/storage/v1/object/public/mdrrmo-images/555527036_122194756010442336_5223210281996700861_n.webp?w=640&h=360&fit=crop",
  alt: "Relief goods and food packs being prepared for storm Opong in Pio Duran"
},
{
  id: 2,
  title: "Trucks Stranded in Pio Duran as Storm Makes Landfall in Masbate",
  excerpt: "A long line of trucks bound for Masbate was stranded in Pio Duran, Albay, following the second landfall of Severe Tropical Storm Opong in Palanas, Masbate.",
  date: "2025-09-26",
  category: "Storm Impact",
  image: "https://hqgprclcbzdkifryjbbv.supabase.co/storage/v1/object/public/mdrrmo-images/553128686_122194702082442336_7305770528192399375_n.webp",
  alt: "Stranded trucks in Pio Duran due to tropical storm Opong"
},
{
  id: 3,
  title: "MDRRMO Pio Duran, Albay conduct BDRRMP Training/Seminar",
  excerpt: "MDRRMO Pioduran, led by Mr. Noel F. Ordona, conducted Barangay Disaster Risk Reduction and Management Planning (BDRRMP) Training/Seminar in Barangay Rawis.",
  date: "2025-09-11",
  category: "Community Training",
  image: "https://hqgprclcbzdkifryjbbv.supabase.co/storage/v1/object/public/mdrrmo-images/541045673_1184186697071812_6224742840574434577_n.webp?w=640&h=360&fit=crop",
  alt: "Fire truck orientation and hose management training for OJT students"
},
{
  id: 4,
  title: "Albay's Vulnerable Sectors Equipped for Disasters Through Forum",
  excerpt: "Senior citizens and PWDs in Albay participated in a disaster preparedness forum with PAGASA and PHIVOLCS to enhance emergency response knowledge.",
  date: "2025-09-28",
  category: "Education",
  image: "https://hqgprclcbzdkifryjbbv.supabase.co/storage/v1/object/public/mdrrmo-images/532508660_122187820424442336_7245000719938064814_n.webp?w=640&h=360&fit=crop",
  alt: "Senior citizens and PWDs participating in a disaster preparedness forum"
}
  ];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section id="news" className="bg-gray-50" aria-labelledby="news-heading">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 id="news-heading" className="section-title text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            News & Updates
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6" role="presentation"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Stay informed with the latest news, updates, and announcements from our team.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {newsItems.map((newsItem) => (
            <article key={newsItem.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-48 overflow-hidden relative">
                <Image
                  src={newsItem.image}
                  alt={newsItem.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mb-3">
                  {newsItem.category}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-2 mb-3 line-clamp-2">
                  {newsItem.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                  {newsItem.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <time dateTime={newsItem.date} className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(newsItem.date)}
                  </time>
                </div>
                <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-yellow-500 font-semibold py-2 px-4 rounded-lg w-full hover:shadow-lg transition-all duration-300 text-sm focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                  Read More
                  <span className="sr-only"> about {newsItem.title}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center">
          <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-yellow-500 font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out hover:shadow-lg hover:from-blue-700 hover:to-blue-900 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
            Load More News
          </button>
        </div>
      </div>
    </section>
  )
}
