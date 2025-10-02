import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "MDRRMO Personnel - MDRRMO",
  description: "MDRRMO Organizational Chart and Personnel Structure",
}

export default function MDRRMOPersonnelPage() {
  return (
    <div className="font-sans bg-gray-50">
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
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                MDRRMO <span className="text-yellow-500">Organizational Chart</span>
              </h1>
              <p className="text-xl mb-6">Municipal Disaster Risk Reduction and Management Office</p>
              <div className="flex items-center space-x-4">
                <div className="bg-yellow-500 text-blue-950 px-4 py-2 rounded-full font-semibold">
                  <i className="fas fa-map-marker-alt mr-2"></i>Pio Duran, Albay
                </div>
                <div className="bg-blue-800 px-4 py-2 rounded-full font-semibold">
                  <i className="fas fa-building mr-2"></i>Official Structure
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-yellow-500 rounded-full opacity-20 absolute -top-6 -left-6"></div>
                <div className="w-64 h-64 md:w-80 md:h-80 bg-blue-950 rounded-full opacity-20 absolute -bottom-6 -right-6"></div>
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-yellow-500 floating-animation">
                  <Image
                    src="https://images.unsplash.com/photo-1587367274642-4ff13a9291cc?w=800&h=800&fit=crop"
                    alt="MDRRMO"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Introduction */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-6">Personnel Structure</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            The Municipal Disaster Risk Reduction and Management Office (MDRRMO) of Pio Duran, Albay is structured to
            ensure effective coordination and response during disaster situations.
          </p>
          <div className="bg-blue-50 border-l-4 border-yellow-500 p-6 rounded-lg max-w-4xl mx-auto">
            <p className="text-gray-700">
              This organizational chart illustrates the hierarchical structure of the MDRRMO, showing the flow of
              authority and responsibility from leadership down to operational units.
            </p>
          </div>
        </section>

        {/* Organizational Chart */}
        <section className="mb-20">
          <div className="flex flex-col items-center w-full">
            {/* Level 1: Leadership */}
            <div className="flex flex-col items-center w-full my-5">
              <div className="bg-gradient-to-br from-blue-950 to-blue-800 text-white rounded-xl p-6 text-center min-w-[300px] shadow-xl card-hover">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-950 to-yellow-500 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <Image
                    src="/images/design-mode/logome_qttbxo%281%29%281%29%281%29%281%29%281%29%281%29%281%29%281%29%281%29.webp"
                    alt="Mayor"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-semibold mb-1">HON. EVANGELINE C. ARANDIA</div>
                <h3 className="text-xl font-bold mb-2">Municipal Mayor</h3>
              </div>
              <div className="w-0.5 h-10 bg-blue-950 my-2"></div>
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-400 text-blue-950 rounded-xl p-6 text-center min-w-[300px] shadow-xl card-hover">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-950 to-yellow-500 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <Image
                    src="/images/design-mode/logome_qttbxo%281%29%281%29%281%29%281%29%281%29%281%29%281%29%281%29%281%29.webp"
                    alt="MDRRMO Head"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-semibold mb-1">NOEL F. ORDONA</div>
                <h3 className="text-xl font-bold mb-2">MDRRMO</h3>
              </div>
            </div>

            {/* Level 3: Core Staff */}
            <div className="flex flex-wrap justify-center items-center w-full my-5 gap-4">
              <div className="bg-white border-t-4 border-blue-950 rounded-xl p-6 text-center min-w-[220px] shadow-xl card-hover">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-950 to-yellow-500 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <Image
                    src="/images/design-mode/logome_qttbxo%281%29%281%29%281%29%281%29%281%29%281%29%281%29%281%29%281%29.webp"
                    alt="Core Staff"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-semibold mb-1">JUAN DELA CRUZ</div>
                <h3 className="text-lg font-bold mb-2">Administration and Training</h3>
              </div>
              <div className="bg-white border-t-4 border-blue-950 rounded-xl p-6 text-center min-w-[220px] shadow-xl card-hover">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-950 to-yellow-500 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <Image
                    src="/images/design-mode/logome_qttbxo%281%29%281%29%281%29%281%29%281%29%281%29%281%29%281%29%281%29.webp"
                    alt="Core Staff"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-semibold mb-1">JUAN DELA CRUZ</div>
                <h3 className="text-lg font-bold mb-2">Research and Planning</h3>
              </div>
              <div className="bg-white border-t-4 border-blue-950 rounded-xl p-6 text-center min-w-[220px] shadow-xl card-hover">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-950 to-yellow-500 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <Image
                    src="/images/design-mode/logome_qttbxo%281%29%281%29%281%29%281%29%281%29%281%29%281%29%281%29%281%29.webp"
                    alt="Core Staff"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-semibold mb-1">JUAN DELA CRUZ</div>
                <h3 className="text-lg font-bold mb-2">Operations and Warning</h3>
              </div>
            </div>

            {/* Emergency Response Team Heading */}
            <div className="text-center my-12">
              <h3 className="text-2xl font-bold text-blue-950 mb-4">Emergency Response Team</h3>
              <div className="w-32 h-1 bg-yellow-500 mx-auto"></div>
            </div>

            {/* Level 4: Emergency Response Team */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
              {[
                { name: "JUAN DELA CRUZ", role: "RESCUE OPERATOR" },
                { name: "JUAN DELA CRUZ", role: "EMERGENCY MEDICAL TECHNICIAN" },
                { name: "JUAN DELA CRUZ", role: "EMERGENCY MEDICAL TECHNICIAN" },
                { name: "JUAN DELA CRUZ", role: "EMERGENCY MEDICAL TECHNICIAN" },
                { name: "JUAN DELA CRUZ", role: "EMERGENCY MEDICAL TECHNICIAN" },
                { name: "JUAN DELA CRUZ", role: "EMERGENCY MEDICAL TECHNICIAN" },
                { name: "JUAN DELA CRUZ", role: "EMERGENCY MEDICAL TECHNICIAN" },
                { name: "JUAN DELA CRUZ", role: "EMERGENCY MEDICAL TECHNICIAN" },
              ].map((member, index) => (
                <div
                  key={index}
                  className="bg-white border-l-4 border-blue-950 rounded-xl p-6 text-center shadow-xl card-hover"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-950 to-yellow-500 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                    <Image
                      src="/images/design-mode/logome_qttbxo%281%29%281%29%281%29%281%29%281%29%281%29%281%29%281%29%281%29.webp"
                      alt="Team Member"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="font-semibold mb-1">{member.name}</div>
                  <div className="text-sm">{member.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
