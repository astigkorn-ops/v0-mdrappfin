"use client"

import React, { useState } from 'react';
import {
  Waves,
  Mountain,
  Bolt,
  Umbrella,
  AudioLines,
  Earth,
  Flame,
  ThermometerSun,
  CalendarCheck2,
  AlertTriangle,
  Home
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  'storm-surge': <Waves className="mr-2" size={20} />,
  'landslide': <Mountain className="mr-2" size={20} />,
  'thunderstorm': <Bolt className="mr-2" size={20} />,
  'typhoon': <Umbrella className="mr-2" size={20} />,
  'flood': <AudioLines className="mr-2" size={20} />,
  'earthquake': <Earth className="mr-2" size={20} />,
  'fire': <Flame className="mr-2" size={20} />,
  'tsunami': <Waves className="mr-2" size={20} />,
  'heat': <ThermometerSun className="mr-2" size={20} />
};

const sectionIconMap = {
  before: <CalendarCheck2 className="mr-2" size={18} />,
  during: <AlertTriangle className="mr-2" size={18} />,
  after: <Home className="mr-2" size={18} />
};

const EmergencyProcedures = () => {
  const [activeTab, setActiveTab] = useState('storm-surge');

  const emergencyData = {
    'storm-surge': {
      title: 'Storm Surge',
      color: 'text-blue-500',
      before: [
        { title: 'Know Your Risk', description: 'Check if your area is prone to storm surges and know your evacuation routes.' },
        { title: 'Prepare Emergency Kit', description: 'Include food, water, medications, flashlight, batteries, and important documents.' },
        { title: 'Reinforce Your Home', description: 'Install storm shutters or board up windows. Secure outdoor items that could become projectiles.' },
        { title: 'Plan Evacuation', description: 'Identify higher ground and plan how to get there. Know where official shelters are located.' }
      ],
      during: [
        { title: 'Evacuate if Ordered', description: 'Leave immediately if authorities issue evacuation orders. Don\'t wait until it\'s too late.' },
        { title: 'Move to Higher Ground', description: 'If trapped by rising water, move to the highest level of your home or building.' },
        { title: 'Avoid Flood Waters', description: 'Never walk, swim, or drive through flood waters. Just 6 inches can knock you down.' },
        { title: 'Stay Informed', description: 'Listen to weather updates and emergency instructions on battery-powered radio.' }
      ],
      after: [
        { title: 'Wait for All Clear', description: 'Don\'t return home until authorities declare it\'s safe to do so.' },
        { title: 'Inspect for Damage', description: 'Check for structural damage before entering buildings. Watch for downed power lines.' },
        { title: 'Avoid Contaminated Water', description: 'Don\'t drink tap water until officials say it\'s safe. Boil water if unsure.' },
        { title: 'Document Damage', description: 'Take photos for insurance claims before cleaning up or making repairs.' }
      ]
    },
    'landslide': {
      title: 'Landslide',
      color: 'text-amber-800',
      before: [
        { title: 'Know Warning Signs', description: 'Learn to recognize landslide warning signs like new cracks in foundations or unusual sounds.' },
        { title: 'Landscape Carefully', description: 'Avoid building on steep slopes or near edges. Plant ground cover to stabilize slopes.' },
        { title: 'Create Evacuation Plan', description: 'Identify multiple evacuation routes away from potential slide paths.' },
        { title: 'Monitor Weather', description: 'Be alert during heavy rains, especially after wildfires or prolonged wet periods.' }
      ],
      during: [
        { title: 'Evacuate Immediately', description: 'If you suspect imminent danger, leave quickly. Don\'t delay to gather belongings.' },
        { title: 'Move Uphill', description: 'If escape isn\'t possible, move to the highest possible point in your home.' },
        { title: 'Avoid River Valleys', description: 'Stay away from low-lying areas, stream channels, and drainage paths.' },
        { title: 'Listen for Unusual Sounds', description: 'Be alert for cracking trees, rumbling, or other unusual noises that may indicate moving debris.' }
      ],
      after: [
        { title: 'Stay Away', description: 'Avoid the slide area as additional slides may follow. Watch for flooding.' },
        { title: 'Check for Injuries', description: 'Help trapped or injured people if you can do so safely without entering the slide area.' },
        { title: 'Report Damage', description: 'Notify authorities about damaged utility lines, roads, or other critical infrastructure.' },
        { title: 'Seek Professional Advice', description: 'Consult geotechnical experts before rebuilding or making major repairs.' }
      ]
    },
    'thunderstorm': {
      title: 'Thunderstorm',
      color: 'text-purple-500',
      before: [
        { title: 'Monitor Forecasts', description: 'Stay updated on weather forecasts, especially during storm season.' },
        { title: 'Prepare Emergency Kit', description: 'Include battery-powered radio, flashlights, first aid supplies, and backup power sources.' },
        { title: 'Secure Outdoor Items', description: 'Bring in or tie down furniture, decorations, and other objects that could blow away.' },
        { title: 'Identify Safe Shelter', description: 'Know where to go in your home (interior room on lowest level, away from windows).' }
      ],
      during: [
        { title: 'Seek Shelter', description: 'Go indoors immediately when thunder is heard. Stay away from windows.' },
        { title: 'Avoid Electronics', description: 'Don\'t use corded phones, computers, or other electrical equipment that puts you in contact with wiring.' },
        { title: 'Postpone Activities', description: 'Delay outdoor activities until 30 minutes after the last thunder is heard.' },
        { title: 'Stay Away from Water', description: 'Avoid plumbing, sinks, baths, and faucets as lightning can travel through pipes.' }
      ],
      after: [
        { title: 'Wait for All Clear', description: 'Remain indoors for 30 minutes after the last thunder is heard.' },
        { title: 'Check for Damage', description: 'Inspect your property for downed trees, power lines, or structural damage.' },
        { title: 'Report Hazards', description: 'Notify authorities about dangerous conditions like fallen power lines or gas leaks.' },
        { title: 'Assist Neighbors', description: 'Check on elderly or vulnerable neighbors who may need assistance.' }
      ]
    },
    'typhoon': {
      title: 'Typhoon',
      color: 'text-orange-500',
      before: [
        { title: 'Secure Your Home', description: 'Install storm shutters or board up windows. Reinforce garage doors and roof.' },
        { title: 'Prepare Supplies', description: 'Stock up on food, water, medications, batteries, and fuel for at least 3 days.' },
        { title: 'Know Evacuation Routes', description: 'Identify multiple evacuation routes in case roads are blocked.' },
        { title: 'Trim Trees', description: 'Remove dead branches and secure outdoor items that could become projectiles.' }
      ],
      during: [
        { title: 'Stay Indoors', description: 'Remain in a secure interior room away from windows during the storm.' },
        { title: 'Monitor Updates', description: 'Listen to weather updates on battery-powered radio or NOAA weather radio.' },
        { title: 'Avoid Flooded Areas', description: 'Never walk or drive through flood waters. Turn around, don\'t drown.' },
        { title: 'Be Ready to Evacuate', description: 'If authorities order evacuation, leave immediately to designated shelters.' }
      ],
      after: [
        { title: 'Wait for All Clear', description: 'Stay sheltered until authorities confirm the storm has passed.' },
        { title: 'Inspect for Damage', description: 'Check for structural damage, gas leaks, and downed power lines before entering buildings.' },
        { title: 'Avoid Contaminated Water', description: 'Boil water until officials declare it safe. Watch for waterborne diseases.' },
        { title: 'Document Damage', description: 'Take photos for insurance claims before cleaning up or making repairs.' }
      ]
    },
    'flood': {
      title: 'Flood',
      color: 'text-teal-600',
      before: [
        { title: 'Know Your Risk', description: 'Check flood maps to see if your area is prone to flooding.' },
        { title: 'Elevate Utilities', description: 'Raise electrical panels, sockets, and appliances above potential flood levels.' },
        { title: 'Prepare Sandbags', description: 'Have sandbags ready to divert water away from your property.' },
        { title: 'Plan Evacuation', description: 'Identify higher ground and multiple routes to get there.' }
      ],
      during: [
        { title: 'Evacuate if Ordered', description: 'Leave immediately when authorities issue evacuation orders.' },
        { title: 'Move to Higher Ground', description: 'If trapped by rising water, move to the highest level of your home.' },
        { title: 'Avoid Flood Waters', description: 'Never walk, swim, or drive through flood waters - just 6 inches can knock you down.' },
        { title: 'Turn Off Utilities', description: 'Shut off electricity, gas, and water if instructed or if flooding occurs.' }
      ],
      after: [
        { title: 'Wait for All Clear', description: 'Return home only when authorities declare it safe.' },
        { title: 'Inspect for Damage', description: 'Check for structural damage before entering buildings.' },
        { title: 'Avoid Contaminated Water', description: 'Don\'t drink tap water until officials say it\'s safe.' },
        { title: 'Document Damage', description: 'Take photos for insurance claims before cleaning up.' }
      ]
    },
    'earthquake': {
      title: 'Earthquake',
      color: 'text-red-900',
      before: [
        { title: 'Secure Your Space', description: 'Fasten shelves, heavy furniture, and appliances to walls. Store breakables in low cabinets.' },
        { title: 'Create Emergency Plan', description: 'Identify safe spots in each room and practice drop, cover, and hold on drills.' },
        { title: 'Prepare Supplies', description: 'Stock up on food, water, first aid kit, flashlight, and sturdy shoes near your bed.' },
        { title: 'Learn to Shut Off', description: 'Know how to turn off gas, water, and electricity in case of leaks or damage.' }
      ],
      during: [
        { title: 'Drop, Cover, Hold On', description: 'Drop to hands and knees, cover head and neck, hold on to sturdy furniture.' },
        { title: 'Stay Indoors', description: 'Remain inside until shaking stops. Stay away from windows and exterior walls.' },
        { title: 'If Outside', description: 'Move to open area away from buildings, trees, streetlights, and utility wires.' },
        { title: 'If Driving', description: 'Pull over in safe area, stop, and stay inside vehicle until shaking stops.' }
      ],
      after: [
        { title: 'Expect Aftershocks', description: 'Be ready for additional smaller earthquakes following the main shock.' },
        { title: 'Check for Injuries', description: 'Attend to injuries first before helping others. Don\'t move seriously injured people.' },
        { title: 'Inspect for Damage', description: 'Check for gas leaks, electrical damage, and structural issues before entering buildings.' },
        { title: 'Listen for Updates', description: 'Tune to emergency broadcasts for official information and instructions.' }
      ]
    },
    'fire': {
      title: 'Fire',
      color: 'text-red-600',
      before: [
        { title: 'Install Smoke Alarms', description: 'Place alarms on every level and test monthly. Replace batteries yearly.' },
        { title: 'Create Escape Plan', description: 'Identify two exits from every room and practice fire drills regularly.' },
        { title: 'Clear Escape Routes', description: 'Keep hallways and exits clear of clutter. Make sure windows open easily.' },
        { title: 'Fire Extinguishers', description: 'Keep ABC-rated extinguishers in kitchen, garage, and near fireplaces.' }
      ],
      during: [
        { title: 'Get Out Fast', description: 'Leave immediately when alarm sounds. Don\'t stop for belongings.' },
        { title: 'Stay Low', description: 'Crawl under smoke to exit. Hot air rises, cleaner air is near floor.' },
        { title: 'Feel Doors First', description: 'Use back of hand to test doors for heat before opening. Use alternate exit if hot.' },
        { title: 'Stop, Drop, Roll', description: 'If clothes catch fire, stop moving, drop to ground, and roll to smother flames.' }
      ],
      after: [
        { title: 'Call for Help', description: 'Once safely outside, call emergency services. Never re-enter burning building.' },
        { title: 'Account for Everyone', description: 'Meet at designated spot and confirm all family members are accounted for.' },
        { title: 'Wait for All Clear', description: 'Don\'t return until firefighters say it\'s safe to re-enter.' },
        { title: 'Contact Insurance', description: 'Begin claims process and document all damage with photos and videos.' }
      ]
    },
    'tsunami': {
      title: 'Tsunami',
      color: 'text-blue-800',
      before: [
        { title: 'Know the Warning Signs', description: 'Recognize natural warnings like strong earthquake, unusual ocean behavior, or loud ocean roar.' },
        { title: 'Identify Evacuation Routes', description: 'Know multiple ways to reach high ground or inland areas at least 100 feet above sea level.' },
        { title: 'Prepare Emergency Kit', description: 'Include food, water, medications, flashlight, batteries, and important documents.' },
        { title: 'Learn Community Plans', description: 'Know your community\'s warning systems, evacuation routes, and shelter locations.' }
      ],
      during: [
        { title: 'Evacuate Immediately', description: 'Move inland or to high ground as soon as warnings are issued or if you notice natural signs.' },
        { title: 'Go On Foot', description: 'If possible, evacuate on foot to avoid traffic jams. Take your emergency kit if time allows.' },
        { title: 'Move to Higher Floors', description: 'If you can\'t evacuate, go to upper floors of a sturdy concrete building (at least 4th floor).' },
        { title: 'Stay Away from Shore', description: 'Never go to the shore to watch a tsunami. Waves can be deadly and arrive for hours.' }
      ],
      after: [
        { title: 'Wait for Official Clearance', description: 'Stay on high ground until authorities say it\'s safe to return. Multiple waves may follow.' },
        { title: 'Avoid Flooded Areas', description: 'Stay away from damaged areas until declared safe. Watch for debris and downed power lines.' },
        { title: 'Check for Injuries', description: 'Provide first aid to injured people if you can do so safely.' },
        { title: 'Document Damage', description: 'Take photos of damage for insurance claims before cleaning up.' }
      ]
    },
    'heat': {
      title: 'Heat Wave',
      color: 'text-red-500',
      before: [
        { title: 'Stay Informed', description: 'Monitor weather forecasts and heat alerts. Know the signs of heat illness.' },
        { title: 'Prepare Your Home', description: 'Install window coverings, weather stripping, and insulation to keep heat out.' },
        { title: 'Gather Supplies', description: 'Stock up on water, electrolytes, cooling items, and medications.' },
        { title: 'Identify Cool Spaces', description: 'Locate air-conditioned public places like libraries or cooling centers.' }
      ],
      during: [
        { title: 'Stay Hydrated', description: 'Drink water regularly, even if not thirsty. Avoid alcohol and caffeine.' },
        { title: 'Limit Outdoor Activity', description: 'Postpone strenuous activities to cooler parts of the day.' },
        { title: 'Dress Appropriately', description: 'Wear lightweight, light-colored, loose-fitting clothing.' },
        { title: 'Check on Others', description: 'Monitor elderly neighbors, young children, and pets for heat stress.' }
      ],
      after: [
        { title: 'Continue Hydration', description: 'Keep drinking fluids as heat effects can linger after temperatures drop.' },
        { title: 'Assess Health', description: 'Watch for delayed symptoms of heat exhaustion or heat stroke.' },
        { title: 'Evaluate Home', description: 'Check for heat damage to plants, pets, and home systems.' },
        { title: 'Prepare for Next Event', description: 'Improve home cooling strategies based on what worked and didn\'t.' }
      ]
    }
  };

  const tabs = Object.keys(emergencyData);

  return (
    <div className="flex flex-col items-center justify-center bg-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Poppins', sans-serif; }
        .tab-button { transition: all 0.3s ease; border-bottom: 3px solid transparent; }
        .tab-button:hover { transform: translateY(-2px); }
        .tab-button.active { border-bottom-color: currentColor; font-weight: 600; }
        .timeline-item { position: relative; padding-left: 30px; margin-bottom: 20px; }
        .timeline-item:before { content: ''; position: absolute; left: 0; top: 5px; width: 20px; height: 20px; border-radius: 50%; background-color: currentColor; }
        .timeline-item:after { content: ''; position: absolute; left: 9px; top: 25px; width: 2px; height: calc(100% - 20px); background-color: currentColor; }
        .timeline-item:last-child:after { display: none; }
        .emergency-card { transition: transform 0.3s ease, box-shadow 0.3s ease; border-left: 4px solid currentColor; }
        .emergency-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
      `}</style>

      <div className="w-full mx-auto shadow-xl overflow-hidden bg-background">
        {/* Header Section */}
        <div className="h-2 w-full bg-yellow-500" />
        <div className="bg-[#012184] text-white p-6 flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2 text-center drop-shadow-lg">
            Emergency Procedures
          </h2>
          <p className="text-[#fff] text-sm text-center">
            What to do before, during, and after emergencies
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b bg-white justify-center">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab-button px-3 py-2 text-sm md:text-base flex-shrink-0 flex items-center ${activeTab === tab ? 'active ' + emergencyData[tab].color : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {iconMap[tab]}
              {emergencyData[tab].title}
            </button>
          ))}
        </div>
        
        {/* Tab Content */}
        <div className="overflow-y-auto scrollbar-hide">
          <div className="p-6 max-w-7xl items-center justify-center mx-auto">
            <div className="flex flex-wrap -mx-2">
              {/* Before Section */}
              <div className="w-full md:w-1/3 px-2 mb-4">
                <div className={`emergency-card ${emergencyData[activeTab].color} bg-white p-4 rounded-lg shadow-md h-full`}>
                  <h3 className={`text-lg font-bold mb-3 flex items-center ${emergencyData[activeTab].color}`}>
                    {sectionIconMap.before} Before
                  </h3>
                  <div className="timeline">
                    {emergencyData[activeTab].before.map((item, index) => (
                      <div key={index} className={`timeline-item ${emergencyData[activeTab].color}`}>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* During Section */}
              <div className="w-full md:w-1/3 px-2 mb-4">
                <div className={`emergency-card ${emergencyData[activeTab].color} bg-white p-4 rounded-lg shadow-md h-full`}>
                  <h3 className={`text-lg font-bold mb-3 flex items-center ${emergencyData[activeTab].color}`}>
                    {sectionIconMap.during} During
                  </h3>
                  <div className="timeline">
                    {emergencyData[activeTab].during.map((item, index) => (
                      <div key={index} className={`timeline-item ${emergencyData[activeTab].color}`}>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* After Section */}
              <div className="w-full md:w-1/3 px-2 mb-4">
                <div className={`emergency-card ${emergencyData[activeTab].color} bg-white p-4 rounded-lg shadow-md h-full`}>
                  <h3 className={`text-lg font-bold mb-3 flex items-center ${emergencyData[activeTab].color}`}>
                    {sectionIconMap.after} After
                  </h3>
                  <div className="timeline">
                    {emergencyData[activeTab].after.map((item, index) => (
                      <div key={index} className={`timeline-item ${emergencyData[activeTab].color}`}>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyProcedures;
