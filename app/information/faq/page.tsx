"use client"

import { useState } from "react"

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const faqCategories = [
    {
      title: "Category 1: Disaster Prevention and Mitigation",
      description: "Actions taken to avoid the occurrence of disasters or to minimize their damaging effects",
      color: "from-blue-950 to-blue-800",
      icon: "fas fa-shield-alt",
      faqs: [
        {
          question: "What is the difference between prevention and mitigation?",
          answer:
            "Prevention aims to avoid a disaster entirely (e.g., building a dike to prevent flooding). Mitigation involves reducing the severity of a disaster's impact when it occurs (e.g., building houses on stilts in flood-prone areas). Both are proactive strategies to lessen risk.",
        },
        {
          question: "What is the MDRRMO doing to reduce flood risks in our community?",
          answer:
            "Our office works with the engineering and planning departments on structural measures like de-silting rivers, building floodwalls, and improving drainage systems. We also enforce regulations on building setbacks from waterways and promote the use of permeable surfaces.",
        },
        {
          question: "Are there laws that prevent building in hazardous areas?",
          answer:
            "Yes. The National Building Code, local zoning ordinances, and the Philippine DRRM Act of 2010 guide land-use planning. The MDRRMO helps identify hazard-prone areas (like landslide zones or fault lines) where construction is restricted or requires special permits.",
        },
        {
          question: "How can I make my home more resistant to earthquakes?",
          answer:
            "Important steps include: securing heavy furniture and appliances to walls, having a professional check the structural integrity of your home, using flexible connections for gas and water lines, and knowing how to shut off your utilities.",
        },
        {
          question: 'What is a "hazard map" and where can I see it?',
          answer:
            "A hazard map shows areas in our municipality that are susceptible to specific hazards like floods, landslides, storm surges, or earthquakes. You can view these maps at the MDRRMO office, the Municipal Hall, or on our official municipal website. We use them for planning and evacuation.",
        },
        {
          question: "Does the municipality have a reforestation or mangrove planting program?",
          answer:
            "Yes, these are key mitigation programs. Trees and mangroves act as natural barriers against landslides, storm surges, and coastal erosion. The MDRRMO often partners with community groups for annual tree-planting activities.",
        },
      ],
    },
    {
      title: "Category 2: Disaster Preparedness",
      description: "Measures taken to prepare for and reduce the effects of disasters",
      color: "from-yellow-500 to-yellow-400",
      icon: "fas fa-briefcase",
      faqs: [
        {
          question: "What is the most important thing my family should do to prepare?",
          answer:
            "Create a Family Disaster Plan. This includes discussing meeting places, communication strategies, evacuation routes, and assigning responsibilities. Practice this plan regularly with all household members.",
        },
        {
          question: 'What exactly should we put in our "Go Bag" or emergency kit?',
          answer:
            "Your kit should sustain you for at least 3 days. Essentials include: water (1 gallon per person per day), non-perishable food, a flashlight, a battery-powered radio, extra batteries, a first-aid kit, personal hygiene items, copies of important documents, and some cash.",
        },
        {
          question: "How will we be notified if a disaster is coming?",
          answer:
            "We use a multi-channel approach: emergency SMS blasts, announcements through barangay tanods with megaphones, sirens, and posts on official social media pages. Ensure your contact details are updated with your Barangay Captain.",
        },
        {
          question: "Where are the designated evacuation centers in our barangay/municipality?",
          answer:
            "Evacuation centers are typically sturdy public buildings like schools, gymnasiums, and multi-purpose halls. Your Barangay DRRM Committee has a specific list and map. Know the route to your nearest center.",
        },
        {
          question: "Do you conduct earthquake or fire drills? How can we participate?",
          answer:
            "Yes, the MDRRMO coordinates regular drills in schools, offices, and communities. Participation is highly encouraged. Watch for announcements from our office or your barangay for the schedule of the next drill.",
        },
        {
          question: "What should we do to prepare our pets for a disaster?",
          answer:
            "Include your pets in your plan. Prepare a pet emergency kit with food, water, a leash, a carrier, and vaccination records. Identify pet-friendly evacuation centers or shelters in advance, as not all may accept animals.",
        },
        {
          question: "How can I volunteer with the MDRRMO?",
          answer:
            "We welcome volunteers! You can register at the MDRRMO office. Training is provided for roles like first aid, search and rescue basics, and managing evacuation centers.",
        },
      ],
    },
    {
      title: "Category 3: Disaster Response",
      description: "Actions taken immediately before, during, and after a disaster to save lives and property",
      color: "from-red-600 to-red-500",
      icon: "fas fa-ambulance",
      faqs: [
        {
          question: "When should we evacuate?",
          answer:
            "Evacuate IMMEDIATELY when an official order is given by the Mayor or the MDRRMO. Do not wait for the situation to get worse. If you feel you are in immediate danger and it is safe to move, do not wait for an order.",
        },
        {
          question: "What is the safest thing to do during a strong earthquake?",
          answer:
            "Drop, Cover, and Hold On. Drop to your hands and knees. Cover your head and neck by getting under a sturdy table or against an interior wall. Hold on until the shaking stops. Do not run outside.",
        },
        {
          question: "We are stranded by a flood. Who should we call?",
          answer:
            "During a major event, call the MDRRMO Hotline at [Insert Local Hotline Number]. If lines are busy, try your Barangay Hall. Keep your phone charged and use SMS for better reliability when networks are congested.",
        },
        {
          question: "Why should we never drive or walk through floodwaters?",
          answer:
            "It is extremely dangerous. As little as 6 inches (15 cm) of moving water can knock you off your feet. A foot of water can float a vehicle, and floodwater can hide hazards like open manholes, sharp debris, or downed power lines. Turn Around, Don't Drown.",
        },
        {
          question: "How does the MDRRMO coordinate its response?",
          answer:
            "We activate the Municipal Disaster Risk Reduction and Management Operations Center (MDRRMOC). This serves as the command post where we coordinate with barangays, police, fire, and health units to direct search and rescue, provide emergency relief, and manage information.",
        },
        {
          question: "What should we do after the main shock of an earthquake?",
          answer:
            "Check yourself and others for injuries. Be prepared for aftershocks. Carefully evacuate the building if it is damaged. Check for and extinguish small fires. Avoid damaged areas. Listen to a battery-powered radio for official instructions.",
        },
      ],
    },
    {
      title: "Category 4: Disaster Recovery",
      description: "The process of restoring a community to its pre-disaster state or better",
      color: "from-green-600 to-green-500",
      icon: "fas fa-recycle",
      faqs: [
        {
          question: "When is it safe to return home after an evacuation?",
          answer:
            "Return only when local authorities have declared it safe to do so. Do not return based on rumors. Hazards like structural instability, gas leaks, or contaminated water may still be present.",
        },
        {
          question: "What should we check for when we return to our home?",
          answer:
            "Before entering, check for structural damage, cracks in the foundation, or leaning walls. Inside, use a flashlight (not a candle) to check for gas leaks (smell for sulfur or rotten eggs), and check for electrical system and water line damage.",
        },
        {
          question: "How can we get help if our house was damaged or destroyed?",
          answer:
            "Report the damage immediately to your Barangay Captain, who will consolidate the list for the MDRRMO. This list is used to request assistance from the municipal government, the DSWD, and other national agencies.",
        },
        {
          question: "Where can we get psychological support after a traumatic event?",
          answer:
            "Disaster stress is normal. The MDRRMO, in coordination with the Municipal Health Office, sets up Psychosocial Support (PSS) services in evacuation centers. Do not hesitate to seek help for yourself or your family members.",
        },
        {
          question: "Is the water safe to drink after a flood or earthquake?",
          answer:
            "Assume it is NOT safe until authorities confirm it is. Water lines may be contaminated. Use bottled water or boil water vigorously for at least one minute. Listen for announcements about the safety of the public water supply.",
        },
        {
          question: "What financial assistance is available for affected families and businesses?",
          answer:
            "The government, through agencies like the DSWD and the Department of Labor and Employment (DOLE), may provide emergency cash-for-work or livelihood assistance programs. The MDRRMO will disseminate information on how to avail of these programs once they are activated.",
        },
        {
          question: 'What is "Build Back Better" and how does it apply to me?',
          answer:
            '"Build Back Better" is a principle that encourages rebuilding in a more resilient way to withstand future disasters. When repairing or rebuilding your home, consider using stronger materials and applying the mitigation measures recommended by engineers from the MDRRMO.',
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-blue-950 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="bg-repeat w-full h-full"
            style={{
              backgroundImage:
                "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+CiAgPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSJub25lIi8+CiAgPHBhdGggZD0iTTAgMEg1MFY1MEgweiIgc3Ryb2tlPSIjZmNkNTMwIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiLz4KPC9zdmc+')",
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
              <p className="text-xl mb-8 text-blue-100">
                Find answers to common questions about disaster risk reduction and management
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-yellow-500 text-blue-950 px-6 py-3 rounded-full font-semibold">
                  <i className="fas fa-question-circle mr-2"></i>Helpful Information
                </div>
                <div className="bg-blue-800 px-6 py-3 rounded-full font-semibold">
                  <i className="fas fa-shield-alt mr-2"></i>Disaster Preparedness
                </div>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="w-48 h-48 md:w-64 md:h-64 bg-yellow-500 rounded-full opacity-20 absolute -top-6 -left-6"></div>
                <div className="w-48 h-48 md:w-64 md:h-64 bg-blue-950 rounded-full opacity-20 absolute -bottom-6 -right-6"></div>
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-yellow-500 flex items-center justify-center animate-pulse">
                  <i className="fas fa-question text-yellow-500 text-6xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-blue-950 mb-4">How can we help you?</h2>
              <p className="text-gray-600 mb-6">Search our FAQ database or browse by category</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
                <i className="fas fa-search absolute left-4 top-5 text-gray-400 text-xl"></i>
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-6 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              >
                <option value="">All Categories</option>
                <option value="prevention">Disaster Prevention and Mitigation</option>
                <option value="preparedness">Disaster Preparedness</option>
                <option value="response">Disaster Response</option>
                <option value="recovery">Disaster Recovery</option>
              </select>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="mb-12">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
              <div className={`bg-gradient-to-r ${category.color} text-white p-6`}>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                    <i className={`${category.icon} text-blue-950 text-xl`}></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{category.title}</h2>
                    <p className={`${category.color.includes("yellow") ? "text-blue-900" : "text-blue-200"}`}>
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {category.faqs.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 100 + faqIndex
                  return (
                    <div key={faqIndex} className="border-b border-gray-200 last:border-b-0">
                      <div
                        className="py-6 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => toggleFAQ(globalIndex)}
                      >
                        <h3 className="text-lg font-semibold text-blue-950 pr-4">{faq.question}</h3>
                        <i
                          className={`fas fa-chevron-down text-blue-950 transition-transform duration-300 ${
                            openFAQ === globalIndex ? "rotate-180" : ""
                          }`}
                        ></i>
                      </div>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          openFAQ === globalIndex ? "max-h-96 pb-6" : "max-h-0"
                        }`}
                      >
                        <div className="pl-0 md:pl-6 border-l-2 border-yellow-500">
                          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </section>

        {/* Contact Section */}
        <section>
          <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-2xl shadow-xl p-8 md:p-12 text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Still have questions?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Our team is here to help you with any additional questions about disaster risk reduction and management.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <div className="flex items-center justify-center bg-yellow-500 text-blue-950 px-8 py-4 rounded-lg font-bold">
                  <i className="fas fa-phone mr-3"></i>
                  Call: (123) 456-7890
                </div>
                <div className="flex items-center justify-center bg-white text-blue-950 px-8 py-4 rounded-lg font-bold">
                  <i className="fas fa-envelope mr-3"></i>
                  Email: mdrrmo@mun.gov.ph
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
