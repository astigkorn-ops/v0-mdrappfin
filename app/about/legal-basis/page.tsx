import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Legal Basis - MDRRMO",
  description: "Foundation and regulatory framework for disaster risk reduction and management",
}

export default function LegalBasisPage() {
  return (
    <div className="font-sans bg-gray-50">
      {/* Header Section */}
      <header className="bg-blue-950 text-white py-20 relative overflow-hidden">
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Legal <span className="text-yellow-500">Basis</span>
              </h1>
              <p className="text-xl mb-8">
                Foundation and regulatory framework for disaster risk reduction and management
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-yellow-500 text-blue-950 px-6 py-3 rounded-full font-semibold">
                  <i className="fas fa-gavel mr-2"></i>Regulatory Framework
                </div>
                <div className="bg-blue-800 px-6 py-3 rounded-full font-semibold">
                  <i className="fas fa-book mr-2"></i>Policy Guidelines
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-yellow-500 rounded-full opacity-20 absolute -top-6 -left-6"></div>
                <div className="w-64 h-64 md:w-80 md:h-80 bg-blue-950 rounded-full opacity-20 absolute -bottom-6 -right-6"></div>
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-yellow-500 floating-animation">
                  <Image
                    src="https://images.unsplash.com/photo-1589561457537-6ff185350a99?w=800&h=800&fit=crop"
                    alt="Legal Basis"
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
      <main className="container mx-auto px-4 py-16">
        {/* Introduction */}
        <section className="mb-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-6">Regulatory Framework</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-12">
            The Municipal Disaster Risk Reduction and Management Office operates under a comprehensive legal framework
            established by national laws, policies, and guidelines that ensure effective disaster preparedness,
            response, and recovery.
          </p>

          <div className="bg-gradient-to-br from-blue-50 to-yellow-50 border-l-4 border-yellow-500 p-8 rounded-2xl mb-12">
            <div className="flex items-start">
              <div className="text-yellow-500 text-3xl mr-4">
                <i className="fas fa-info-circle"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-950 mb-3">Framework Overview</h3>
                <p className="text-gray-700">
                  These legal instruments provide the foundation for establishing, organizing, and operating the MDRRMO
                  in accordance with national standards and local requirements. They ensure accountability,
                  transparency, and effectiveness in disaster risk reduction and management activities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Legal Documents Grid */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">Key Legal Instruments</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* RA 10121 */}
            <div className="bg-white border-l-4 border-blue-950 rounded-2xl shadow-xl p-8 card-hover">
              <div className="bg-gradient-to-r from-blue-950 to-blue-800 text-white px-4 py-2 rounded-full inline-block font-semibold mb-4">
                RA 10121
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-4">
                Philippine Disaster Risk Reduction and Management Act
              </h3>
              <p className="text-gray-700 mb-6">
                An act strengthening the Philippine Disaster Risk Reduction and Management System, providing for the
                National Disaster Risk Reduction and Management framework and institutionalizing the National Disaster
                Risk Reduction and Management Plan, appropriating funds therefore and for other purposes.
              </p>
              <div className="flex items-center text-blue-950 font-semibold">
                <i className="fas fa-external-link-alt mr-2"></i>
                <span>Implementation Rules and Regulations (IRR) included</span>
              </div>
            </div>

            {/* RA 9729 */}
            <div className="bg-white border-l-4 border-blue-950 rounded-2xl shadow-xl p-8 card-hover">
              <div className="bg-gradient-to-r from-blue-950 to-blue-800 text-white px-4 py-2 rounded-full inline-block font-semibold mb-4">
                RA 9729
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-4">Climate Change Act</h3>
              <p className="text-gray-700 mb-6">
                An act mainstreaming climate change into government policy formulations, establishing the framework
                strategy and program on climate change, creating for this purpose the climate change commission and for
                other purposes.
              </p>
              <div className="flex items-center text-blue-950 font-semibold">
                <i className="fas fa-cloud-sun mr-2"></i>
                <span>Climate adaptation and mitigation focus</span>
              </div>
            </div>

            {/* RA 7160 */}
            <div className="bg-white border-l-4 border-blue-950 rounded-2xl shadow-xl p-8 card-hover">
              <div className="bg-gradient-to-r from-blue-950 to-blue-800 text-white px-4 py-2 rounded-full inline-block font-semibold mb-4">
                RA 7160
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-4">Local Government Code of 1991</h3>
              <p className="text-gray-700 mb-6">
                The Local Government Code states in its General Provisions that the Local Government Unit shall adopt
                measures to protect the inhabitants of the Municipality from the harmful effects of man-made or natural
                disasters and calamities and to provide relief services and assistance for victims during and in the
                aftermath of said disasters or calamities and their return to productive livelihood following said
                events.
              </p>
              <div className="flex items-center text-blue-950 font-semibold">
                <i className="fas fa-building mr-2"></i>
                <span>LGU responsibilities and mandates</span>
              </div>
            </div>

            {/* DILG MC 2012-79 */}
            <div className="bg-white border-l-4 border-blue-950 rounded-2xl shadow-xl p-8 card-hover">
              <div className="bg-gradient-to-r from-blue-950 to-blue-800 text-white px-4 py-2 rounded-full inline-block font-semibold mb-4">
                DILG MC 2012-79
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-4">Seal of Disaster Preparedness</h3>
              <p className="text-gray-700 mb-6">
                Department of the Interior and Local Government (DILG) issued Memorandum Circular No. 2012-79 dated
                April 25, 2012, entitled "Seal of Disaster Preparedness".
              </p>
              <div className="flex items-center text-blue-950 font-semibold">
                <i className="fas fa-medal mr-2"></i>
                <span>Recognition and certification program</span>
              </div>
            </div>

            {/* COA Circular 2012-002 */}
            <div className="bg-white border-l-4 border-blue-950 rounded-2xl shadow-xl p-8 card-hover">
              <div className="bg-gradient-to-r from-blue-950 to-blue-800 text-white px-4 py-2 rounded-full inline-block font-semibold mb-4">
                COA Circular 2012-002
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-4">Accounting and Reporting Guidelines</h3>
              <p className="text-gray-700 mb-6">
                Provides the guidelines on accounting and reporting the allocation and utilization of the LDRRM Fund
                (LDRRMF), the NDRRM Fund given to LGUs, and Receipts from Other Sources.
              </p>
              <div className="flex items-center text-blue-950 font-semibold">
                <i className="fas fa-file-invoice-dollar mr-2"></i>
                <span>Financial transparency and accountability</span>
              </div>
            </div>

            {/* SDG 2015-2030 */}
            <div className="bg-white border-l-4 border-blue-950 rounded-2xl shadow-xl p-8 card-hover">
              <div className="bg-gradient-to-r from-blue-950 to-blue-800 text-white px-4 py-2 rounded-full inline-block font-semibold mb-4">
                SDG 2015-2030
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-4">Agenda for Sustainable Development</h3>
              <p className="text-gray-700 mb-6">
                2015-2030 Agenda for Sustainable Development Goal incorporating disaster risk reduction as a key
                component of sustainable development.
              </p>
              <div className="flex items-center text-blue-950 font-semibold">
                <i className="fas fa-globe-asia mr-2"></i>
                <span>Global framework integration</span>
              </div>
            </div>
          </div>

          {/* JMC 2013-1 - Full Width */}
          <div className="bg-white border-l-4 border-blue-950 rounded-2xl shadow-xl p-8 card-hover mt-8">
            <div className="bg-gradient-to-r from-blue-950 to-blue-800 text-white px-4 py-2 rounded-full inline-block font-semibold mb-4">
              JMC 2013-1
            </div>
            <h3 className="text-xl font-bold text-blue-950 mb-4">LDRRM Fund Allocation Guidelines</h3>
            <p className="text-gray-700 mb-6">
              NDRRMC, DBM and DILG Joint Memorandum Circular No. 2013-1 dated March 25, 2013 - provides the guidelines
              on the allocation and utilization of the LDRRMF. It aims to enhance transparency and accountability in the
              use of the LDRRMF. The JMC also defines the projects and activities to be undertaken by LGUs for each of
              the four thematic areas of DRRM.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-blue-950 font-semibold">
                <i className="fas fa-chart-pie mr-2"></i>
                <span>Resource allocation guidelines</span>
              </div>
              <div className="flex items-center text-blue-950 font-semibold">
                <i className="fas fa-project-diagram mr-2"></i>
                <span>Thematic area implementation</span>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Framework */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">Implementation Framework</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-blue-950 flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-shield-alt text-yellow-500 text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-4">Prevention & Mitigation</h3>
                <p className="text-gray-600">
                  Proactive measures to reduce the impact of disasters through planning, infrastructure, and community
                  preparedness.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-first-aid text-blue-950 text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-4">Preparedness & Response</h3>
                <p className="text-gray-600">
                  Emergency readiness and immediate actions during disasters to save lives and protect property.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-blue-950 flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-home text-yellow-500 text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-4">Recovery & Rehabilitation</h3>
                <p className="text-gray-600">
                  Post-disaster activities to restore normalcy and build back better for enhanced resilience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Compliance and Accountability */}
        <section className="mb-20">
          <div className="bg-blue-950 text-white rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-yellow-500 flex items-center justify-center">
                  <i className="fas fa-balance-scale text-blue-950 text-3xl"></i>
                </div>
              </div>
              <div className="md:w-3/4 md:pl-8">
                <h3 className="text-2xl font-bold mb-4">Compliance and Accountability</h3>
                <p className="text-lg mb-6">
                  The MDRRMO ensures full compliance with all legal requirements through transparent reporting, proper
                  fund utilization, and adherence to national standards and guidelines.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-yellow-500 mt-1 mr-3"></i>
                    <span>Regular monitoring and evaluation of programs</span>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-yellow-500 mt-1 mr-3"></i>
                    <span>Transparent financial reporting and auditing</span>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-yellow-500 mt-1 mr-3"></i>
                    <span>Documentation of all activities and expenditures</span>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-yellow-500 mt-1 mr-3"></i>
                    <span>Submission of required reports to national agencies</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
